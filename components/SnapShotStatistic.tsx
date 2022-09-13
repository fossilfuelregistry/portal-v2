import React, { FC } from 'react'
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import { OilIcon } from 'components/Icons'
import { colors } from '../assets/theme'

type SnapShotStatisticProps = {
  value: number
  prevValue?: number
  valueInfo: string
  prevValueInfo?: string
  icon: React.ReactNode
  oilValue: string
  oilText: string
  gasValue: string
  gasText: string
  coalValue: string
  coalText: string
}

const SnapShotStatistic: FC<SnapShotStatisticProps> = ({
  value,
  prevValue,
  valueInfo,
  prevValueInfo,
  icon,
  oilValue,
  oilText,
  gasValue,
  gasText,
  coalValue,
  coalText,
}) => (
  <Flex
    justifyContent="space-between"
    bgColor={colors.primary.grey2}
    p="36px 32px"
    rowGap="186px"
    mb="80px"
    outline="1px solid red"
  >
    <Box
      position="relative"
      _after={{
        content: '" "',
        bgColor: '#BFBFBF',
        width: '1px',
        height: '100%',
        position: 'absolute',
        top: '0',
        right: '-92px',
      }}
    >
      <Heading
        as="h3"
        color={colors.primary.richBlack}
        fontFamily="sommet-rounded"
        fontSize="44px"
        lineHeight="53px"
        fontWeight="700"
        mb="10px"
      >
        73,161
      </Heading>
      <Box
        color={colors.primary.richBlack}
        fontSize="18px"
        lineHeight="29px"
        fontWeight="400"
      >
        Number of fields in database
      </Box>
    </Box>
    <SimpleGrid columns={3} gridGap="32px">
      <Box position="relative">
        <Box position="absolute" top="0" left="5px">
          <OilIcon fill={colors.primary.grey70} opacity="1" />
        </Box>
        <Heading
          as="h3"
          color={colors.primary.richBlack}
          fontSize="44px"
          lineHeight="53px"
          fontWeight="700"
        >
          85%
        </Heading>
        <Box
          color={colors.primary.richBlack}
          fontSize="18px"
          lineHeight="29px"
          fontWeight="400"
        >
          Number of fields in database
        </Box>
      </Box>
    </SimpleGrid>
  </Flex>
)

export default SnapShotStatistic
