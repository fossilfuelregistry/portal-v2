import React, { FC, useContext, useMemo } from 'react'
import InfoSection from 'components/InfoSection'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { StaticData } from 'lib/types'
import { DataContext } from 'components/DataContext'
import useCountryProjects from 'lib/useCountryProjects'
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import formatCsvNumber from '../../utils/formatCsvNumbers'

type LargestProjectsProps = {
  country: string
}

const LargestProjects: FC<LargestProjectsProps> = ({ country }) => {
  const staticData: StaticData = useContext(DataContext)
  const { countryName } = staticData
  const { projects } = useCountryProjects({
    country,
  })
  const { generateCsvTranslation } = useCsvDataTranslator()
  const top20 = projects.slice(0, 20)

  const translatedCsvData = useMemo(() => {
    const csvData = top20.map((p: any) => ({
      'Field name': p.projectIdentifier,
      'Total emissions': p.co2.toFixed(2),
      'Fossil Fuel': p.fuels.map(capitalizeFirstLetter).join(','),
      Country: countryName,
      'Latest year': formatCsvNumber(p.lastYear),
    }))
    return csvData.map(generateCsvTranslation)
  }, [top20])

  return (
    <InfoSection
      title={`${countryName} Largest fossil fuel extraction projects in terms of emissions`}
      filename={`${countryName}_largest_projects.csv`}
      csvData={translatedCsvData}
    >
      <TableContainer height="360px" overflowY="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>№</Th>
              <Th>Field name</Th>
              <Th>Total emissions Million barrels</Th>
              <Th>Fossil Fuel</Th>
              <Th>Country</Th>
              <Th>Latest year</Th>
            </Tr>
          </Thead>
          <Tbody>
            {top20?.map((p: any, index) => (
              <Tr key={p.id}>
                <Td>{index + 1}</Td>
                <Td>{p.projectIdentifier}</Td>
                <Td>{p.co2.toFixed(2)}</Td>
                <Td>{p.fuels.map(capitalizeFirstLetter).join(',')}</Td>
                <Td>{countryName}</Td>
                <Td>{p.lastYear}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </InfoSection>
  )
}

export default LargestProjects
