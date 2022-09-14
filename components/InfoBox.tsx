import React, { FC } from 'react'
import {
  SimpleGrid,
  Box,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Flex,
} from '@chakra-ui/react'
import { colors } from '../assets/theme'

type InfoBoxProps = {
  title: string
  icon?: React.ReactNode
  subtitle?: string
  source?: string
  label?: string
  value: number | undefined
  year?: string
}

const InfoBox: FC<InfoBoxProps> = ({
  title,
  icon,
  subtitle,
  source = '',
  label,
  value,
  year,
}) => (
  <Box w="100%" bgColor={colors.primary.grey2} padding="24px 20px 28px">
    <Flex justifyContent="space-between" alignItems="center" mb="30px">
      <Box>
        <Box
          color={colors.primary.richBlack}
          fontSize="18px"
          lineHeight="23px"
          fontWeight="700"
        >
          {title}
        </Box>
        {!!subtitle && (
          <Box
            color={colors.primary.grey25}
            fontSize="14px"
            lineHeight="14px"
            fontWeight="400"
          >
            {subtitle}
          </Box>
        )}
      </Box>
      {!!icon && <Box>{icon}</Box>}
    </Flex>

    {!!label && (
      <Box
        display="inline-block"
        border="1px solid #1172ba"
        borderRadius="4px"
        p="4px 8px"
        mb="12px"
        color={colors.primary.brandingBlue}
        fontSize="14px"
        lineHeight="18px"
        fontWeight="400"
      >
        {label}
      </Box>
    )}

    <Heading
      as="h3"
      color={colors.primary.richBlack}
      fontSize="40px"
      lineHeight="48px"
      fontWeight="700"
      mb="2px"
    >
      {value !== undefined ? value?.toFixed(2) : <Spinner />}
    </Heading>
    <Box
      color={colors.primary.richBlack}
      fontSize="14px"
      lineHeight="18px"
      fontWeight="400"
    >
      {year}
      {!!source && ` (${source})`}
    </Box>
  </Box>
)

export default InfoBox
