import { useMemo } from 'react'
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import formatCsvNumber from '../utils/formatCsvNumbers'

const useHistoricProductionCSVData = ({
  historicData,
  countryName,
  country,
  source,
}: {
  historicData: any
  countryName: string | undefined
  country: string
  source: string
}) => {
  const { generateCsvTranslation } = useCsvDataTranslator()

  const translatedCsvData = useMemo(() => {
    const getData = (fuel: string) =>
      historicData.map((d: any) => ({
        cell1: fuel,
        cell2: formatCsvNumber(d[fuel]),
        cell4: 'mln tons CO2e',
        cell3: d.date,
        cell5: source,
      }))

    const csvData = [
      {
        cell1: `${countryName} - Historical Prod. & Emissions - GWP100 Methane Factor - Weighted Average `,
      },
      {
        cell1: 'EMISSIONS',
      },
      {
        cell1: 'Substance',
        cell2: 'Volume',
        cell3: 'Unit',
        cell4: 'Year',
        cell5: 'Prod Source',
      },
      ...getData('Oil'),
      ...getData('Gas'),
      ...getData('Coal'),
      {
        cell1: `https://fossilfuelregistry.org/country/${country}`,
      },
      {
        cell1: `Global Registry of Fossil Fuels ${new Date().getFullYear()}`,
      },
    ]
    return csvData.map(generateCsvTranslation)
  }, [historicData, country, source])

  return { translatedCsvData }
}

export default useHistoricProductionCSVData
