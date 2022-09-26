import React, { FC } from 'react'
import { Box, Flex, Heading, Link, Button } from '@chakra-ui/react'
import { DownloadIcon } from 'components/Icons'
import CsvDownloader from 'react-csv-downloader'
import { colors } from '../assets/theme'

type InfoSectionProps = {
  title: string
  children: React.ReactNode
  csvData?: any
  filename?: string
  isProject?: boolean
  // @ts-ignore
  sourceInfo?: any
}

const InfoSection: FC<InfoSectionProps> = ({
  title,
  children,
  csvData = [],
  filename = 'file.csv',
  isProject = false,
  sourceInfo,
}) => (
  <Box
    bg={colors.primary.grey2}
    margin="0 auto"
    marginBottom="80px"
    padding={{ base: '16px', md: '32px' }}
  >
    <Heading
      as="h3"
      color={colors.primary.richBlack}
      fontFamily="Roboto"
      fontWeight="700"
      fontSize="20px"
      margin="0"
      paddingBottom="32px"
    >
      {title}
    </Heading>
    {children}
    <Flex
      alignItems="center"
      justifyContent="space-between"
      mt="40px"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Box color={colors.primary.richBlack} fontSize="16px" fontWeight="400">
        Source:{' '}
        {isProject ? (
          <>
            <>
              {sourceInfo && (
                <>
                  <strong>{sourceInfo.name}: </strong>
                  <Link
                    href={sourceInfo.url}
                    target="_blank"
                    color={colors.primary.brandingBlue}
                    fontSize="16px"
                    fontWeight="400"
                  >
                    Website
                  </Link>
                  <Box px="8px" display="inline-block">
                    :
                  </Box>
                  <Link
                    href={sourceInfo.documentUrl}
                    target="_blank"
                    color={colors.primary.brandingBlue}
                    fontSize="16px"
                    fontWeight="400"
                  >
                    Raw Data
                  </Link>
                  <Box px="8px" display="inline-block">
                    :
                  </Box>
                </>
              )}
            </>
            <Link
              href="/data-documentation"
              target="_blank"
              color={colors.primary.brandingBlue}
              fontSize="16px"
              fontWeight="400"
            >
              Data Sets
            </Link>
          </>
        ) : (
          <Link
            href="https://drive.google.com/drive/folders/1gjiEXR0Ar19FZodhbrkG1EG7qIgu_Uxl"
            target="_blank"
            color={colors.primary.brandingBlue}
            fontSize="16px"
            fontWeight="400"
          >
            Country Production and Reserves Dataset
          </Link>
        )}
      </Box>
      <CsvDownloader datas={csvData} filename={filename}>
        <Button
          bg={colors.primary.brandingBlue}
          color={colors.common.white}
          borderRadius="4px"
          padding="12px 58px"
          leftIcon={<DownloadIcon />}
          mt={{ base: '20px', md: 0 }}
          _hover={{ opacity: '0.5' }}
        >
          Download
        </Button>
      </CsvDownloader>
    </Flex>
  </Box>
)

export default InfoSection
