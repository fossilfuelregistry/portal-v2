import React, { FC } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { colors } from '../../assets/theme'

type HistoryProductionInfoProps = {
  title: string
  icon: React.ReactNode
  subtitle: string
  value: number
  label: string
  hasLine?: boolean
}

const HistoryProductionInfo: FC<HistoryProductionInfoProps> = ({
  title,
  subtitle,
  icon,
  label,
  value,
  hasLine = false,
}) => (
  <Box
    w="100%"
    position="relative"
    bgColor={colors.primary.grey2}
    _after={{
      content: { base: 'none', md: hasLine ? '" "' : 'none' },
      position: 'absolute',
      top: '0',
      right: '-66px',
      width: '1px',
      height: '100%',
      bgColor: '#BFBFBF',
    }}
  >
    <Flex justifyContent="space-between" alignItems="flex-start" mb="16px">
      <Box>
        <Box
          color={colors.primary.richBlack}
          fontSize="18px"
          lineHeight="29x"
          fontWeight="400"
        >
          {title}
        </Box>
        <Box
          color={colors.primary.grey70}
          fontSize="16px"
          lineHeight="24px"
          fontWeight="400"
        >
          {subtitle}
        </Box>
      </Box>
      {!!icon && <Box>{icon}</Box>}
    </Flex>

    <Heading
      as="h3"
      fontFamily="sommet-rounded"
      color={colors.primary.richBlack}
      fontSize="32px"
      lineHeight="42px"
      fontWeight="700"
      mb="12px"
    >
      {value}
    </Heading>
    <Box
      display="inline-block"
      border="1px solid #1172ba"
      borderRadius="4px"
      p="4px 8px"
      color={colors.primary.brandingBlue}
      fontSize="16px"
      lineHeight="24px"
      fontWeight="400"
    >
      {label}
    </Box>
  </Box>
)

export default HistoryProductionInfo
