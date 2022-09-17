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
  Text,
} from '@chakra-ui/react'
import { StaticData } from 'lib/types'
import { DataContext } from 'components/DataContext'
import useCountryProjects from 'lib/useCountryProjects'
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import formatCsvNumber from '../../utils/formatCsvNumbers'
import { colors } from '../../assets/theme'

type LargestProjectsProps = {
  country: string
}

const useNumberFormatter = () => {
  const format = (number: number, decimals = 0) =>
    new Intl.NumberFormat('us', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number)
  return format
}

const LargestProjects: FC<LargestProjectsProps> = ({ country }) => {
  const staticData: StaticData = useContext(DataContext)
  const format = useNumberFormatter()
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

  console.log('top20', top20)

  return (
    <InfoSection
      title={`${countryName} Largest fossil fuel extraction projects in terms of emissions`}
      filename={`${countryName}_largest_projects.csv`}
      csvData={translatedCsvData}
    >
      <TableContainer height="460px" overflowY="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th
                color={colors.primary.richBlack}
                fontSize="16px"
                textTransform="none"
                fontWeight="400"
                lineHeight="24px"
                p="20px 20px"
              >
                №
              </Th>
              <Th
                color={colors.primary.richBlack}
                fontSize="16px"
                textTransform="none"
                fontWeight="400"
                lineHeight="24px"
                p="20px 20px"
              >
                Field name
              </Th>
              <Th
                color={colors.primary.richBlack}
                fontSize="16px"
                textTransform="none"
                fontWeight="400"
                lineHeight="24px"
                p="20px 20px"
              >
                Total emissions
                <br />
                <Text
                  fontSize="16px"
                  color={colors.primary.grey70}
                  lineHeight="24px"
                  fontWeight="400"
                >
                  MT CO2e
                </Text>
              </Th>
              <Th
                color={colors.primary.richBlack}
                fontSize="16px"
                textTransform="none"
                fontWeight="400"
                lineHeight="24px"
                p="20px 20px"
              >
                Fossil Fuel
              </Th>
              <Th
                color={colors.primary.richBlack}
                fontSize="16px"
                textTransform="none"
                fontWeight="400"
                lineHeight="24px"
                p="20px 20px"
              >
                Country
              </Th>
              <Th
                color={colors.primary.richBlack}
                fontSize="16px"
                textTransform="none"
                fontWeight="400"
                lineHeight="24px"
                p="20px 20px"
              >
                Latest year
              </Th>
            </Tr>
          </Thead>
          <Tbody border="1px solid #EBEBEB">
            {top20?.map((p: any, index) => (
              <Tr key={p.id}>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="700"
                  lineHeight="24px"
                  p="20px 20px"
                >
                  {index + 1}
                </Td>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="400"
                  lineHeight="24px"
                  p="20px 20px"
                >
                  {p.projectIdentifier}
                </Td>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="700"
                  lineHeight="24px"
                  p="20px 20px"
                >
                  {format(p.co2 / 1e7, 2)}
                </Td>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="400"
                  lineHeight="24px"
                  p="20px 20px"
                >
                  {p.fuels.map(capitalizeFirstLetter).join(',')}
                </Td>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="400"
                  lineHeight="24px"
                  p="20px 20px"
                >
                  {countryName}
                </Td>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="700"
                  lineHeight="24px"
                  p="20px 20px"
                >
                  {p.lastYear ? p.lastYear : `${p.dataYear} (data year)`}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </InfoSection>
  )
}

export default LargestProjects
