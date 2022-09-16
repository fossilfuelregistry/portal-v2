/* eslint-disable no-continue */
/* eslint-disable no-plusplus */

import { getFullFuelType, getPreferredGrades, sumOfCO2 } from 'lib/calculate'
import { useApolloClient } from '@apollo/client'
import { GQL_countryCurrentProduction } from 'queries/country'
import settings from 'settings'

import { GQL_countryCurrentProductionRecord } from 'queries/country-types'

import useCalculate from 'lib/calculations/use-calculate'
import { useCalculationConstants } from 'lib/calculations/calculation-constants/use-calculation-constants'

import * as O from 'fp-ts/Option'
import {
  generateZeroCO2EEmissions,
  toMillionCO2ETon,
  toVintageCO2ERepresentation,
} from 'lib/calculations/utils'
import { pipe } from 'fp-ts/lib/function'
import {
  LastReservesType,
  Limits,
  ProjectDataPointRecord,
  ProjectDataRecord,
  ProjectionData,
  ReservesData,
  Source,
  StableProduction,
} from './types-legacy'
import { DatabaseRecord } from './calculations/calculation-constants/types'
import { PrefixRecord } from './calculations/prefix-conversion'
import { CO2EEmissions } from './calculations/types'
import { ConversionFactorInStore, FossilFuelType } from './types'

const DEBUG = false

type Props = {
  conversionConstants: ConversionFactorInStore[]
  allSources?: Source[]
  gwp: 'GWP100' | 'GWP20' | string
  country: string
  stableProduction: StableProduction
  constants: DatabaseRecord[]
  prefixes: PrefixRecord[]
}

export const useConversionHooks = (props: Props) => {
  const { allSources, gwp, country, stableProduction, constants, prefixes } =
    props
  const apolloClient = useApolloClient()

  const calculate = useCalculate(prefixes)

  const getCalculationConstants = useCalculationConstants(constants)

  const calculationConstants = getCalculationConstants({
    country,
    modifier: gwp ?? 'GWP100',
  })

  type CO2FromVolume = {
    volume: number | null
    fossilFuelType: FossilFuelType | null
    subtype: string | null
    country?: string
    projectId?: number
    unit: string | null
  }
  const co2eFromVolume = (props: CO2FromVolume): CO2EEmissions => {
    if (!props) return generateZeroCO2EEmissions()
    const {
      volume,
      fossilFuelType,
      subtype,
      country: countryOverride,
      projectId,
      unit,
    } = props

    const fullFuelType = getFullFuelType({ fossilFuelType, subtype })
    if (!fullFuelType) {
      console.error('No fuel type found', { fossilFuelType, subtype })
      throw new Error('No fuel type found')
    }

    // eslint-disable-next-line no-nested-ternary
    const constantsToUse = projectId
      ? getCalculationConstants({
          projectId,
          modifier: gwp ?? 'GWP100',
          country: countryOverride ?? country,
        })
      : countryOverride
      ? getCalculationConstants({
          country: countryOverride,
          modifier: gwp ?? 'GWP100',
        })
      : calculationConstants

    if (!volume || !gwp || !fossilFuelType || !unit)
      return generateZeroCO2EEmissions()

    const result = calculate({ unit, fossilFuelType, volume }, constantsToUse)

    return pipe(
      result,
      O.fromNullable,
      O.getOrElseW(() => generateZeroCO2EEmissions()),
      toMillionCO2ETon
    )
  }

  const co2FromVolume = (props: CO2FromVolume) =>
    pipe(co2eFromVolume(props), toVintageCO2ERepresentation)

  const reservesProduction = (
    projection: ProjectionData[] | undefined,
    reserves: ReservesData[],
    projectionSourceId: number | undefined,
    reservesSourceId: number,
    limits: Limits | undefined,
    grades: { xp: boolean }
  ) => {
    DEBUG &&
      console.info('reservesProduction', {
        projection,
        reserves,
        projectionSourceId,
        reservesSourceId,
        limits,
        grades,
      })
    if (!projectionSourceId) return []
    if (!(projection && projection?.length > 1)) return []
    if (!limits?.production) return []
    if (!limits?.projection) return []

    // Find most recent preferred reserve

    const useGrades = getPreferredGrades(reserves, reservesSourceId)

    const _lastReserves: { [s: string]: Object } = {}
    settings.supportedFuels.forEach(
      // eslint-disable-next-line no-return-assign
      (fuel) =>
        (_lastReserves[fuel] = {
          p: { year: 0, value: 0 },
          c: { year: 0, value: 0 },
        })
    )
    const lastReserves = _lastReserves as LastReservesType

    for (let i = reserves.length - 1; i >= 0; i--) {
      // Scan in reverse to find latest.
      const r = reserves[i]
      if (r.sourceId !== reservesSourceId) continue
      if (r.grade !== useGrades.pGrade && r.grade !== useGrades.cGrade) continue
      const grade = r.grade[1] // Disregard first character.
      // @ts-ignore
      if (r.year < lastReserves[r.fossilFuelType][grade].year) continue
      // @ts-ignore
      DEBUG && console.info('reservesProduction with reserves', { reserve: r })
      // @ts-ignore
      lastReserves[r.fossilFuelType][grade].year = r.year
      // @ts-ignore
      lastReserves[r.fossilFuelType][grade].value = sumOfCO2(
        // @ts-ignore
        co2FromVolume(r),
        1
      )
    }

    // @ts-ignore
    const prod = []
    // Fill out gap between production and projection (if any)
    const gapStart = Math.min(
      limits.production.oil.lastYear,
      limits.production.gas.lastYear,
      limits.production.coal.lastYear
    )
    const gapEnd = Math.max(
      limits.projection.oil.firstYear,
      limits.projection.gas.firstYear,
      limits.projection.coal.firstYear,
      gapStart
    )

    DEBUG &&
      console.info('reservesProductionWithStartAndEnd', {
        reservesSourceId,
        useGrades,
        lastReserves,
        limits,
        gapStart,
        gapEnd,
      })

    if (gapStart > 0) {
      for (let y = gapStart; y < gapEnd; y++) {
        if (limits.production.oil.lastYear <= y)
          prod.push({
            ...stableProduction.oil,
            year: y,
            fossilFuelType: 'oil',
            sourceId: projectionSourceId,
          })
        if (limits.production.gas.lastYear <= y)
          prod.push({
            ...stableProduction.gas,
            year: y,
            fossilFuelType: 'gas',
            sourceId: projectionSourceId,
          })
        if (limits.production.coal.lastYear <= y)
          prod.push({
            ...stableProduction.coal,
            year: y,
            fossilFuelType: 'coal',
            sourceId: projectionSourceId,
          })
      }
    }

    prod.forEach((datapoint, index) => {
      if (!datapoint.unit) {
        // @ts-ignore
        console.info({ prod, index, datapoint })
        throw new Error(
          `Malformed production data, no unit: ${JSON.stringify(datapoint)}`
        )
      }
      // @ts-ignore
      // eslint-disable-next-line no-return-assign, no-param-reassign
      return (datapoint.co2 = co2FromVolume(datapoint))
    })

    projection.forEach((datapoint, index) => {
      if (datapoint.sourceId !== projectionSourceId) return
      if (datapoint.year < gapEnd) return
      if (!datapoint.unit) {
        console.info({ projection, index, datapoint })
        throw new Error(
          `Malformed projection data, no unit: ${JSON.stringify(datapoint)}`
        )
      }

      const _dp = { ...datapoint }
      // @ts-ignore
      _dp.co2 = co2FromVolume(datapoint)

      const pointProduction = sumOfCO2(_dp.co2, 1)
      // @ts-ignore
      _dp.plannedProd = 0
      // @ts-ignore
      _dp.continProd = 0

      const fuelReserve = lastReserves[datapoint.fossilFuelType]

      // Subtract production from planned reserves first, then from contingent.

      // @ts-ignore
      if (fuelReserve.p.value > pointProduction) {
        // @ts-ignore
        _dp.plannedProd = pointProduction
        // @ts-ignore
        fuelReserve.p.value -= _dp.plannedProd
      } else if (fuelReserve.p.value > 0) {
        // @ts-ignore
        _dp.continProd = pointProduction - fuelReserve.p.value
        // @ts-ignore
        _dp.plannedProd = fuelReserve.p.value
        // @ts-ignore
        fuelReserve.p.value = 0
        // @ts-ignore
        if (_dp.continProd > fuelReserve.c.value)
          // @ts-ignore
          _dp.continProd = fuelReserve.c.value
        // @ts-ignore
        fuelReserve.c.value -= _dp.continProd
      } else if (fuelReserve.c.value > 0) {
        // @ts-ignore
        _dp.plannedProd = 0
        // @ts-ignore
        _dp.continProd = Math.min(fuelReserve.c.value, pointProduction)
        // @ts-ignore
        fuelReserve.c.value -= _dp.continProd
      }
      prod.push(_dp)
    })

    DEBUG &&
      console.info('ReservesProductionFinalStep', {
        gapStart,
        gapEnd,
        prod,
        lastReserves,
      })

    return prod
  }

  const calculateCountryProductionCO2 = (
    prod: GQL_countryCurrentProductionRecord[]
  ) => {
    // Find available sources
    const sourceIds = prod.reduce((s, p) => {
      if (!s.includes(p.sourceId)) s.push(p.sourceId)
      return s
    }, [] as number[])

    // Calculate total production and CO2 for all available sources.
    const sourceProd = sourceIds.map((sid) => {
      const p = prod.filter((p) => p.sourceId === sid)

      // Sum up all fuel subtypes
      const fuelProd = settings.supportedFuels
        .map((fuel) => {
          const fp = p
            .filter((p) => p.fossilFuelType === fuel)
            .reduce(
              (sumP, p1) => {
                if (sumP.unit && sumP.unit !== p1.unit)
                  throw new Error(
                    'Multiple data points for same fuel and year cannot have different units.'
                  )
                // eslint-disable-next-line no-param-reassign
                sumP.unit = p1.unit
                // eslint-disable-next-line no-param-reassign
                sumP.year = p1.year
                // eslint-disable-next-line no-param-reassign
                sumP.volume += p1.volume || 0
                return sumP
              },
              { volume: 0, unit: '', year: 0 }
            )
          return {
            ...fp,
            fossilFuelType: fuel,
            sourceId: sid,
          }
        })
        .filter((fp) => fp.volume > 0) // Remove fuels that current sourceId doesn't have

      const fuelProduction = fuelProd.map((p) => ({
        ...p,
        // @ts-ignore
        co2: co2FromVolume(p),
        // TODO: Fix when there is a need of ch4
        co2e: pipe(
          calculate({ ...p }, calculationConstants),
          O.fromNullable,
          O.map(toMillionCO2ETon),
          O.getOrElseW(() => null)
        ),
      }))
      const totalCO2E = fuelProduction.reduce(
        // eslint-disable-next-line no-unsafe-optional-chaining
        (acc, p) => acc + p.co2?.scope1?.[1] + p.co2?.scope3?.[1],
        0
      )

      DEBUG && console.info('fuelProduction', sid, fuelProduction)

      return {
        sourceId: sid,
        production: fuelProduction,
        totalCO2E,
      }
    })
    return sourceProd
  }

  // eslint-disable-next-line consistent-return
  const getCountryCurrentCO2 = async (iso3166: string | undefined | null) => {
    if (!iso3166) return null

    try {
      const q = await apolloClient.query({
        query: GQL_countryCurrentProduction,
        variables: { iso3166 },
      })
      const prod = (q.data?.getCountryCurrentProduction?.nodes ??
        []) as GQL_countryCurrentProductionRecord[]
      const sourceProd = calculateCountryProductionCO2(prod)
      DEBUG && console.info('Country Production', { sourceProd, prod })
      return sourceProd
    } catch (e) {
      console.error('Failed to fetch country production', e)
    }
  }

  const projectCO2 = (project: ProjectDataRecord) => {
    const DEBUG = true
    DEBUG && console.info({ project })
    const points = project?.projectDataPoints?.nodes ?? []
    const productionPerFuel = { totalCO2: 0, fuels: [] }

    if (!points.length) {
      console.info('Warning no data point!', project)
      return productionPerFuel
    }

    settings.supportedFuels.forEach((fuel) => {
      const fuelData = points.filter(
        (p) => p.fossilFuelType === fuel && p.dataType === 'PRODUCTION'
      )
      const lastYearProd = fuelData.reduce(
        (last:ProjectDataPointRecord, point) => {
          if (point.year && last.year && point.year > last.year) return point
          return last.year === 0 ? point : last // for projects with year: null data.
        },
        // @ts-ignore
        { year: 0 }
      )
      DEBUG && console.log({ points, fuel, fuelData, lastYearProd })
      if (lastYearProd.year === 0) return
      const co2 = co2eFromVolume({
        ...lastYearProd,
        projectId: project.id,
      })

      let targetUnit

      switch (fuel) {
        case 'oil':
          targetUnit = 'e6bbl'
          break
        case 'gas':
          targetUnit = 'e6m3'
          break
        case 'coal':
          targetUnit = 'e6ton'
          break
        default:
      }
      // @ts-ignore
      co2.lastYear = lastYearProd.year
      // @ts-ignore
      co2.dataYear = lastYearProd.dataYear

      // @ts-ignore
      co2.volume = lastYearProd.volume
      // @ts-ignore
      co2.volumeUnit = lastYearProd.unit

      const sources = fuelData.reduce((s, p) => 
         !s.includes(p.sourceId)? [...s, p.sourceId] : s
      , [] as number[])

      console.log({sources},{fuelData},{allSources});
      

      // @ts-ignore
      co2.sources = sources?.map((id) =>
        allSources?.find((s) => s.sourceId === id)
      )
      // @ts-ignore
      productionPerFuel[fuel] = co2
      // @ts-ignore
      productionPerFuel.fuels.push(fuel)
      // eslint-disable-next-line no-unsafe-optional-chaining
      productionPerFuel.totalCO2 += co2.scope1?.total.wa
      // eslint-disable-next-line no-unsafe-optional-chaining
      productionPerFuel.totalCO2 += co2.scope3?.total.wa
    })
    DEBUG && console.info('CO2', productionPerFuel)
    return productionPerFuel
  }

  return {
    co2FromVolume,
    co2eFromVolume,
    reservesProduction,
    calculate,
    calculationConstants,
    calculateCountryProductionCO2,
    getCountryCurrentCO2,
    projectCO2,
  }
}

export default useConversionHooks
