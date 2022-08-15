import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'
import { useCallback } from 'react'
import { FossilFuelType } from 'lib/types'
import { GetConstants } from './calculation-constants/use-calculation-constants'
import calculateOil from './oil'
import { PrefixRecord, usePrefixConversion } from './prefix-conversion'
import calculateCoal from './coal'
import calculateGas from './gas'

type Datapoint = {
  volume: number
  unit: string
  fossilFuelType: FossilFuelType
}

const useCalculate = (prefixes: PrefixRecord[]) => {
  const prefixConversion = usePrefixConversion(prefixes)

  /**
   * Return values in unit e3kg co2e
   */
  const calculate = useCallback(
    (datapoint: Datapoint, calculationConstants: GetConstants) => {
      const constants = pipe(
        calculationConstants,
        O.getOrElseW(() => null)
      )
      if (!constants) return null
      if (datapoint.fossilFuelType === 'oil') {
        const prefixFactor = prefixConversion(datapoint.unit, 'e3bbl')
        if (!prefixFactor) return null
        return calculateOil({
          prefixFactor,
          constants: constants.oil,
          production: datapoint.volume,
        })
      }
      if (datapoint.fossilFuelType === 'coal') {
        const prefixFactor = prefixConversion(datapoint.unit, 'e3ton')
        if (!prefixFactor) return null
        return calculateCoal({
          prefixFactor,
          constants: constants.coal,
          production: datapoint.volume,
        })
      }
      if (datapoint.fossilFuelType === 'gas') {
        const prefixFactor = prefixConversion(datapoint.unit, 'e9m3')
        if (!prefixFactor) return null
        return calculateGas({
          prefixFactor,
          constants: constants.gas,
          production: datapoint.volume,
        })
      }
      return null
    },
    [prefixConversion]
  )

  return calculate
}

export default useCalculate
