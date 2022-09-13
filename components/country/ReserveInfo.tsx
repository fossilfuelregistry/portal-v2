import React, { FC } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { colors } from '../../assets/theme'

type ReserveInfoProps = {
  title: string
  icon: React.ReactNode
  value: number
  subtitle: string
  co2eValue: number
  hasLine?: boolean
}

const ReserveInfo: FC<ReserveInfoProps> = ({
  title,
  subtitle,
  icon,
  value,
  co2eValue,
  hasLine = false,
}) => (
  <Box
    w="100%"
    position="relative"
    p="10px 0"
    bgColor={colors.primary.grey2}
    _after={{
      content: { base: 'none', md: hasLine ? '" "' : 'none' },
      position: 'absolute',
      top: '0',
      right: '-60px',
      width: '1px',
      height: '100%',
      bgColor: '#BFBFBF',
    }}
  >
    <Flex justifyContent="space-between" alignItems="center" mb="16px">
      <Box>
        <Box
          color={colors.primary.richBlack}
          fontSize="18px"
          lineHeight="29x"
          fontWeight="400"
        >
          {title}
        </Box>
      </Box>
      {!!icon && <Box>{icon}</Box>}
    </Flex>

    <Flex justifyContent="space-between">
      <Box>
        <Heading
          as="h3"
          fontFamily="sommet-rounded"
          color={colors.primary.richBlack}
          fontSize="28px"
          lineHeight="36px"
          fontWeight="700"
          mb="4px"
        >
          {value}
        </Heading>
        <Box
          color={colors.primary.grey70}
          fontSize="16px"
          lineHeight="24px"
          fontWeight="400"
        >
          {subtitle}
        </Box>
      </Box>
      <Box>
        <Heading
          as="h3"
          fontFamily="sommet-rounded"
          color={colors.primary.richBlack}
          fontSize="28px"
          lineHeight="36px"
          fontWeight="700"
          mb="4px"
        >
          {co2eValue}
        </Heading>
        <Box
          color={colors.primary.grey70}
          fontSize="16px"
          lineHeight="24px"
          fontWeight="400"
        >
          Million tonnes CO₂e
        </Box>
      </Box>
    </Flex>
  </Box>
)

export default ReserveInfo
