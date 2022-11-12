import { useCallback, useEffect, useMemo, useState } from 'react'
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import formatCsvNumber from 'utils/formatCsvNumbers'
import { FossilFuelType } from 'lib/types'
import {
  PrefixRecord,
  usePrefixConversion,
} from 'lib/calculations/prefix-conversion'
import {
  getToUnit,
  getUnit,
  getVolume,
} from 'components/country/CountrySnapshot'

const useCountryAnnualEmissionsCSVData = ({
  emissionsData,
  rangeData,
  countryName,
  country,
  prefixConversions,
}: {
  emissionsData: any
  rangeData: any
  countryName: string | undefined
  country: string
  prefixConversions: PrefixRecord[]
}) => {
  const { generateCsvTranslation } = useCsvDataTranslator()
  const prefix = usePrefixConversion(prefixConversions)
  const [oilProduction, setOilProduction] = useState<number | undefined>()
  const [gasProduction, setGasProduction] = useState<number | undefined>()
  const [coalProduction, setCoalProduction] = useState<number | undefined>()

  const calculate = useCallback(
    (fossilFuelType: FossilFuelType): number | undefined => {
      const unit = getUnit(fossilFuelType)(emissionsData)
      if (!emissionsData || !unit) return
      const volume = getVolume(fossilFuelType)(emissionsData)
      const p = prefix(unit, getToUnit(fossilFuelType))
      if (!p || !volume) return
      // eslint-disable-next-line consistent-return
      return p * volume
    },
    [emissionsData, prefix, country]
  )

  useEffect(() => {
    setOilProduction(calculate('oil'))
    setGasProduction(calculate('gas'))
    setCoalProduction(calculate('coal'))
  }, [calculate, emissionsData, country])

  const translatedCsvData = useMemo(() => {
    const csvData = [
      {
        cell1: `${countryName} - Latest Year Prod. & Emissions - GWP100 Methane Factor`,
      },
      {
        cell1: 'PRODUCTION',
      },
      {
        cell1: 'Scope',
        cell2: 'Volume',
        cell3: 'Substance',
        cell4: 'Unit',
        cell5: 'Year',
        cell6: 'Source',
      },
      {
        cell1: 'Production',
        cell2: formatCsvNumber(oilProduction),
        cell3: 'Oil',
        cell4: 'mln barrels',
        cell5: '2020',
        cell6: 'EIA',
      },
      {
        cell1: 'Production',
        cell2: formatCsvNumber(gasProduction),
        cell3: 'Gas',
        cell4: 'bln m3',
        cell5: '2020',
        cell6: 'EIA',
      },
      {
        cell1: 'Production',
        cell2: formatCsvNumber(coalProduction),
        cell3: 'Coal',
        cell4: 'bln ton',
        cell5: '2020',
        cell6: 'EIA',
      },
      {
        cell1: 'EMISSIONS',
      },
      {
        cell1: 'Scope',
        cell2: 'Interval',
        cell3: 'Volume',
        cell4: 'Substance',
        cell5: 'Unit',
        cell6: 'Year',
      },
      {
        cell1: 'Pre-Combustion',
        cell2: 'P5',
        cell3: formatCsvNumber(rangeData[0]?.value[0]),
        cell4: 'CO2e',
        cell5: 'mln tons',
        cell6: '2020',
      },
      {
        cell1: 'Pre-Combustion',
        cell2: 'WA',
        cell3: formatCsvNumber(rangeData[0]?.value[1]),
        cell4: 'CO2e',
        cell5: 'mln tons',
        cell6: '2020',
      },
      {
        cell1: 'Pre-Combustion',
        cell2: 'P95',
        cell3: formatCsvNumber(rangeData[0]?.value[2]),
        cell4: 'CO2e',
        cell5: 'mln tons',
        cell6: '2020',
      },
      {
        cell1: 'Combustion',
        cell2: 'P5',
        cell3: formatCsvNumber(rangeData[1]?.value[0]),
        cell4: 'CO2e',
        cell5: 'mln tons',
        cell6: '2020',
      },
      {
        cell1: 'Combustion',
        cell2: 'WA',
        cell3: formatCsvNumber(rangeData[1]?.value[1]),
        cell4: 'CO2e',
        cell5: 'mln tons',
        cell6: '2020',
      },
      {
        cell1: 'Combustion',
        cell2: 'P95',
        cell3: formatCsvNumber(rangeData[1]?.value[2]),
        cell4: 'CO2e',
        cell5: 'mln tons',
        cell6: '2020',
      },
      {
        cell1: `https://fossilfuelregistry.org/country/${country}`,
      },
      {
        cell1: `Global Registry of Fossil Fuels ${new Date().getFullYear()}`,
      },
    ]
    return csvData.map(generateCsvTranslation)
  }, [rangeData, oilProduction, gasProduction, coalProduction])

  return { translatedCsvData }
}

export default useCountryAnnualEmissionsCSVData
