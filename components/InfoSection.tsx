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
}

const InfoSection: FC<InfoSectionProps> = ({
  title,
  children,
  csvData = [],
  filename = 'file.csv',
}) => (
  <Box
    bg={colors.primary.grey2}
    margin="0 auto"
    marginBottom="80px"
    padding="32px"
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
    <Flex alignItems="center" justifyContent="space-between" mt="40px">
      <Box color={colors.primary.richBlack} fontSize="16px" fontWeight="400">
        Source:{' '}
        <Link
          href="https://drive.google.com/drive/folders/1gjiEXR0Ar19FZodhbrkG1EG7qIgu_Uxl"
          target="_blank"
          color={colors.primary.brandingBlue}
          fontSize="16px"
          fontWeight="400"
        >
          Country Production and Reserves Dataset
        </Link>
      </Box>
      {/*<CsvDownloader datas={csvData} filename={filename}>*/}
      {/*  <Button*/}
      {/*    bg={colors.primary.brandingBlue}*/}
      {/*    color={colors.common.white}*/}
      {/*    borderRadius="4px"*/}
      {/*    padding="12px 58px"*/}
      {/*    leftIcon={<DownloadIcon />}*/}
      {/*    _hover={{ opacity: '0.5' }}*/}
      {/*  >*/}
      {/*    Download*/}
      {/*  </Button>*/}
      {/*</CsvDownloader>*/}
    </Flex>
  </Box>
)

export default InfoSection
