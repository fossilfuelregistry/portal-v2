import { useMemo } from 'react'
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import formatCsvNumber from 'utils/formatCsvNumbers'

const useProjectAnnualEmissionsCSVData = ({
  rangeData,
  countryName,
  projectName,
  projectId,
  gwp,
}: {
  rangeData: any
  countryName: string | undefined
  projectName: string
  projectId: string
  gwp: string
}) => {
  const { generateCsvTranslation } = useCsvDataTranslator()

  const translatedCsvData = useMemo(() => {
    const csvData = [
      {
        cell1: `${projectName} (${countryName}) - Latest Year Emissions - ${gwp} Methane Factor`,
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
        cell1: `https://fossilfuelregistry.org/project/${projectId}`,
      },
      {
        cell1: `Global Registry of Fossil Fuels ${new Date().getFullYear()}`,
      },
    ]
    return csvData.map(generateCsvTranslation)
  }, [rangeData, gwp])

  return { translatedCsvData }
}

export default useProjectAnnualEmissionsCSVData
