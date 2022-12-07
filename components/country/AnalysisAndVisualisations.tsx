import React from 'react'
import InfoSection from 'components/InfoSection'
import {
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import { colors } from 'assets/theme'
import { useVisualisationsQuery } from 'queries/generated-queries'

type Props = {
  country: string
}

const AnalysisAndVisualisations = ({ country }: Props) => {
  const { data } = useVisualisationsQuery({
    variables: {
      entity: country,
      entityType: 'iso3166',
    },
  })

  return (
    <InfoSection title="Analysis and Visualisations" showFooter={false}>
      <TableContainer>
        <Table variant="simple" borderLeft="none" borderRight="none">
          <Tbody borderTop={`1px solid ${colors.primary.grey10}`}>
            {data?.visualisations?.nodes?.map((vis) => (
              <Tr>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="400"
                  lineHeight="24px"
                  p="20px 20px"
                  verticalAlign="top"
                >
                  <Link
                    href={vis?.url as string}
                    target={vis?.newWindow ? '_blank' : '_self'}
                    color={colors.primary.brandingBlue}
                    fontSize="16px"
                    fontWeight="400"
                  >
                    {vis?.name}
                  </Link>
                </Td>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="400"
                  lineHeight="24px"
                  p="20px 20px"
                  verticalAlign="top"
                >
                  <Text maxW="420px" whiteSpace="break-spaces">
                    {vis?.description}
                  </Text>
                </Td>
                <Td
                  color={colors.primary.richBlack}
                  fontSize="16px"
                  textTransform="none"
                  fontWeight="400"
                  fontStyle="italic"
                  lineHeight="24px"
                  p="20px 20px"
                  verticalAlign="top"
                >
                  <Text maxW="420px" whiteSpace="break-spaces">
                    {vis?.sourceDescription}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </InfoSection>
  )
}

export default AnalysisAndVisualisations
