import { useMemo } from 'react'
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import formatCsvNumber from 'utils/formatCsvNumbers'
import { usePrefixConversion } from 'lib/calculations/prefix-conversion'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

const useHistoryProductionCSVData = ({
  production,
  countryName,
  reserves,
  fuel,
  sourceId,
  country,
  sourceType,
  sources,
  prefixConversions,
}: {
  production: any
  countryName: string | undefined
  reserves: any
  fuel: string
  sourceId: number
  country: string
  sourceType: string
  sources: any[]
  prefixConversions: any
}) => {
  const { generateCsvTranslation } = useCsvDataTranslator()
  const conversion = usePrefixConversion(prefixConversions)

  const translatedCsvData = useMemo(() => {
    const data = sourceType === 'production' ? production : reserves
    const getValue = (fossilFuelType: string, volume: number, unit: string) => {
      if (fossilFuelType === 'gas')
        // @ts-ignore
        return conversion(unit, 'e9m3') * volume
      if (fossilFuelType === 'oil')
        // @ts-ignore
        return conversion(unit, 'e6bbl') * volume
      if (fossilFuelType === 'coal') {
        // @ts-ignore
        return conversion(unit, 'e6ton') * volume
      }
      throw new Error('Invalid fossil fuel')
    }
    const fuelMap = {
      oil: 'mln bbls',
      gas: 'bln m3',
      coal: 'bln ton',
    }

    const datas = data
      .filter((d: any) => d.fossilFuelType === fuel)
      .map((d: any) => ({
        cell1: capitalizeFirstLetter(d.fossilFuelType),
        cell2: d.year,
        cell3: getValue(d.fossilFuelType, d.volume, d.unit)
          ? getValue(d.fossilFuelType, d.volume, d.unit)?.toFixed(3)
          : '-',
        // @ts-ignore
        cell4: fuelMap[d.fossilFuelType],
        cell5: sources.find((s: any) => s.sourceId === d.sourceId)?.name,
      }))
      .sort((a: any, b: any) => a.cell5.localeCompare(b.cell5))

    const csvData = [
      {
        cell1: `${countryName} - Historical ${capitalizeFirstLetter(
          sourceType
        )}`,
      },
      {
        cell1: 'Fossil fuel type',
        cell2: 'Year',
        cell3: 'Volume',
        cell4: 'Unit',
        cell5: 'Source',
      },
      ...datas,
    ].map(generateCsvTranslation)

    return csvData
  }, [production, reserves, fuel, sourceId, country])

  return { translatedCsvData }
}

export default useHistoryProductionCSVData
