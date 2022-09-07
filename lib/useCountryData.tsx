/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useQuery} from '@apollo/client'
import {GQL_countryProduction, GQL_countryProjection, GQL_countryReserves,} from 'queries/country'
import settings from 'settings'
import * as Sentry from '@sentry/nextjs'
import {MinimalDataset, prepareProductionDataset,} from 'lib/calculate'
import {ConversionFactorInStore} from "lib/types";
import {useConversionHooks} from './conversionHooks'
import {StableProduction,} from './types-legacy'
import {DatabaseRecord} from './calculations/calculation-constants/types'
import {PrefixRecord} from './calculations/prefix-conversion'

const DEBUG = false

type Props = {
  texts: Record<string, string>
  gwp: string
  reservesSourceId: number
  projectionSourceId: number
  productionSourceId: number
  region?: string
  country: string

  conversionConstants: ConversionFactorInStore[]
  constants: DatabaseRecord[]
  conversionPrefixes: PrefixRecord[]
}

const useCountryData = ({
  texts,
  gwp,
  reservesSourceId,
  projectionSourceId,
  productionSourceId,
  region,
  country,
  conversionConstants,
  constants,
  conversionPrefixes,
}: Props) => {
  const [limits, setLimits] = useState({})
  const [grades, setGrades] = useState({})

  const [stableProduction, setStableProduction] = useState<
    Partial<StableProduction> | undefined
  >(undefined)

  const {
    co2FromVolume,
    reservesProduction,
    co2eFromVolume,
    getCountryCurrentCO2,
  } = useConversionHooks({
    conversionConstants,
    gwp,
    country,
    // @ts-ignore
    stableProduction,
    texts,
    constants,
    prefixes: conversionPrefixes,
  })

  const _co2 = (dataset: MinimalDataset[]) => {
    if (!(dataset?.length > 0)) return []
    try {
      // @ts-ignore
      return prepareProductionDataset(dataset).map((p) => ({
        ...p,
        // @ts-ignore
        co2: co2FromVolume(p),
        co2e: co2eFromVolume(p),
      }))
    } catch (e) {
      Sentry.captureException(e)

      // TODO: Add error notification

      return dataset
    }
  }

  const {
    data: productionData,
    loading: loadingProduction,
    error: errorLoadingProduction,
  } = useQuery(GQL_countryProduction, {
    variables: { iso3166: country, iso31662: region ?? '' },
    skip: !productionSourceId,
  })

  DEBUG && console.info('LoadCountryData', { productionData })

  const production = useMemo(() => {
    DEBUG &&
      console.info(
        '_co2( productionData )',
        productionData?.countryDataPoints?.nodes
      )
    return _co2(productionData?.countryDataPoints?.nodes)
  }, [
    productionData?.countryDataPoints?.nodes,
    productionData?.countryDataPoints?.nodes?.length,
    productionSourceId,
    gwp,
  ])

  const {
    data: projectionData,
    loading: loadingProjection,
    error: errorLoadingProjection,
  } = useQuery(GQL_countryProjection, {
    variables: {
      iso3166: country,
      iso31662: region ?? '',
      sourceId: projectionSourceId,
    },
    skip: !country,
  })

  const projection = useMemo(() => {
    try {
      // console.info({ stableProduction })
      // Synthesize stable projection data points if selected
      if (projectionSourceId === settings.stableProductionSourceId) {
        if (!stableProduction?.oil) return []

        const stableProj = []
        for (let year = 2020; year <= settings.year.end; year++) {
          stableProj.push({
            ...stableProduction.oil,
            year,
            sourceId: settings.stableProductionSourceId,
          })
          stableProj.push({
            ...stableProduction.gas,
            year,
            sourceId: settings.stableProductionSourceId,
          })
          stableProj.push({
            ...stableProduction.coal,
            year,
            sourceId: settings.stableProductionSourceId,
          })
        }
        DEBUG && console.info({ stableProj })
        // @ts-ignore
        return stableProj.concat(_co2(projectionData?.countryDataPoints?.nodes))
      }
      return _co2(projectionData?.countryDataPoints?.nodes)
    } catch (e) {
      Sentry.captureException(e)
      // TODO: Error message
      /* notification.error({
        message: 'Error in calculation',
        description: e.message,
      }) */
      return []
    }
  }, [
    projectionData?.countryDataPoints?.nodes,
    projectionSourceId,
    stableProduction,
    gwp,
  ])

  const {
    data: reservesData,
    loading: loadingReserves,
    error: errorLoadingReserves,
  } = useQuery(GQL_countryReserves, {
    variables: {
      iso3166: country,
      iso31662: region ?? '',
      sourceId: productionSourceId,
    },
    skip: !country,
  })

  const reserves = useMemo(
    () => _co2(reservesData?.countryDataPoints?.nodes),
    [reservesData?.countryDataPoints?.nodes, gwp]
  )

  // Find stable production
  useEffect(() => {
    const reverse = [...production].reverse()
    const oil = reverse.find(
      (d) => d.fossilFuelType === 'oil' && d.sourceId === productionSourceId
    )
    const gas = reverse.find(
      (d) => d.fossilFuelType === 'gas' && d.sourceId === productionSourceId
    )
    const coal = reverse.find(
      (d) => d.fossilFuelType === 'coal' && d.sourceId === productionSourceId
    )
    // @ts-ignore
    setStableProduction({ oil, gas, coal })
  }, [production, productionSourceId, gwp])

  // Figure out available years when data loaded.
  useEffect(() => {
    if (!(production?.length > 0)) return

    const reduced = {}
    settings.supportedFuels.forEach(
      // @ts-ignore
      (fuel) => (reduced[fuel] = { firstYear: settings.year.end, lastYear: 0 })
    )

    const newLimits = production.reduce((_limits, datapoint) => {
      if (datapoint.sourceId !== productionSourceId) return _limits
      // @ts-ignore
      const l = _limits[datapoint.fossilFuelType]
      l.firstYear = Math.min(l.firstYear, datapoint.year)
      l.lastYear = Math.max(l.lastYear, datapoint.year)
      return _limits
    }, reduced)

    DEBUG &&
      console.info('useEffect Production', production?.length, {
        production,
        limits,
        newLimits,
      })

    // Check if no data
    settings.supportedFuels.forEach((fuel) => {
      // @ts-ignore
      if (newLimits[fuel].firstYear === settings.year.end)
        // @ts-ignore
        newLimits[fuel].firstYear = 0
    })

    setLimits((l) => ({ ...l, production: newLimits }))
    DEBUG && console.info('useEffect Production', { newLimits })
  }, [production?.length, productionSourceId])

  useEffect(() => {
    DEBUG && console.info('useEffect projection', { projection, limits })
    // @ts-ignore
    if (!projection?.length > 0) return

    // @ts-ignore
    let newLimits
    const reduced = {}
    settings.supportedFuels.forEach(
      // @ts-ignore
      (fuel) => (reduced[fuel] = { firstYear: settings.year.end, lastYear: 0 })
    )

    if (projectionSourceId === settings.stableProductionSourceId) {
      newLimits = {}
      settings.supportedFuels.forEach(
        (fuel) =>
          // @ts-ignore
          (newLimits[fuel] = {
            firstYear: new Date().getFullYear() - 1,
            lastYear: settings.year.end,
          })
      )
    } else {
      // @ts-ignore
      newLimits = projection.reduce((_limits, datapoint) => {
        if (datapoint.sourceId !== projectionSourceId) return _limits
        const l = _limits[datapoint.fossilFuelType]
        l.firstYear = Math.min(l.firstYear, datapoint.year)
        l.lastYear = Math.max(l.lastYear, datapoint.year)
        return _limits
      }, reduced)
    }

    // Check if no data
    settings.supportedFuels.forEach((fuel) => {
      // @ts-ignore
      if (newLimits[fuel].firstYear === settings.year.end)
        // @ts-ignore
        newLimits[fuel].firstYear = 0
    })

    // @ts-ignore
    setLimits((l) => ({ ...l, projection: newLimits }))
  }, [projection, projectionSourceId])

  useEffect(() => {
    DEBUG && console.info('useEffect reserves', { limits, reserves })
    if (!(reserves?.length > 0)) return
    const newLimits = reserves.reduce((_limits, datapoint) => {
      // @ts-ignore
      _limits.firstYear =
        // @ts-ignore
        _limits.firstYear === undefined || datapoint.year < _limits.firstYear
          ? datapoint.year
          : // @ts-ignore
            _limits.firstYear
      // @ts-ignore
      _limits.lastYear =
        // @ts-ignore
        _limits.lastYear === undefined || datapoint.year > _limits.lastYear
          ? datapoint.year
          : // @ts-ignore
            _limits.lastYear
      return _limits
    }, {})

    setLimits((l) => ({ ...l, reserves: newLimits }))
  }, [reserves])

  const getCurrentCO2E = useCallback(
    async () => getCountryCurrentCO2(country),
    [country, getCountryCurrentCO2]
  )

  DEBUG && console.info({ limits, production, projection, reserves })

  // Figure out available grades when reserves loaded.

  useEffect(() => {
    DEBUG &&
      console.info('useEffect Reserve Grades', { reserves, reservesSourceId })
    if (!(reserves?.length > 0)) return
    const _grades = reserves
      .filter((r) => r.sourceId === reservesSourceId)
      .reduce((g, r) => {
        // @ts-ignore
        g[r.grade] = false
        return g
      }, {})
    // console.info( _grades )
    setGrades(_grades)
  }, [reserves?.length, reservesSourceId])

  // Match projected production with reserves.

  const projectedProduction = useMemo(() => {
    if (!productionSourceId) return []
    if (!projectionSourceId) return []
    if (!reservesSourceId) return []
    DEBUG &&
      console.info('useMemo projectedProduction', { projection, reserves })
    try {
      return reservesProduction(
        // @ts-ignore
        projection,
        reserves,
        projectionSourceId,
        reservesSourceId,
        limits,
        grades
      )
    } catch (e) {
      Sentry.captureException(e)
      // TODO: Error message
      /* notification.error({
        message: 'Error in projected production calculation',
        description: e.message,
        duration: 20,
      }) */
      return []
    }
  }, [
    productionSourceId,
    projectionSourceId,
    reservesSourceId,
    projection,
    reserves,
    reservesProduction,
    limits,
    grades,
  ])

  // Don't try to render a chart until all data looks good
  if (
    // @ts-ignore
    (!limits.production?.oil?.lastYear &&
      // @ts-ignore
      !limits.production?.gas?.lastYear &&
      // @ts-ignore
      !limits.production?.coal?.lastYear) ||
    // @ts-ignore

    !production?.length > 0
  ) {
    DEBUG && console.info('What to do?', { limits, production })
  }

  const isLoading = loadingProduction || loadingProjection || loadingReserves

  return {
    isLoading,
    production,
    projection,
    reserves,
    projectedProduction,
    getCurrentCO2E,
  }
}

export default useCountryData
