import React, { FC } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { CoalIcon, GasIcon, OilIcon } from 'components/Icons'
import { colors } from '../assets/theme'

type SnapShotStatisticProps = {
  title: string
  value: number
  prevValue?: number
  valueInfo: string
  prevValueInfo?: string
  oilValue: number
  oilText: string
  gasValue: number
  gasText: string
  coalValue: number
  coalText: string
}

const SnapShotStatistic: FC<SnapShotStatisticProps> = ({
  title,
  value,
  prevValue,
  valueInfo,
  prevValueInfo,
  oilValue,
  oilText,
  gasValue,
  gasText,
  coalValue,
  coalText,
}) => (
  <Box>
    <Heading
      as="h2"
      fontSize="32px"
      fontWeight="700"
      lineHeight="42px"
      mb="28px"
      color={colors.primary.richBlue}
    >
      {title}
    </Heading>
    <Flex
      justifyContent="space-between"
      flexDirection={{ base: 'column', lg: 'row' }}
      bgColor={colors.primary.grey2}
      p="36px 32px"
      mb="80px"
      rowGap={{ base: '60px', lg: '184px' }}
    >
      <Box
        position="relative"
        maxW="232px"
        _after={{
          content: { md: 'none', xl: '" "' },
          bgColor: '#BFBFBF',
          width: '1px',
          height: '100%',
          position: 'absolute',
          top: '0',
          right: '-94px',
        }}
      >
        <Heading
          as="h3"
          color={colors.primary.richBlack}
          fontFamily="sommet-rounded"
          fontSize="44px"
          lineHeight="53px"
          fontWeight="700"
          mb="8px"
        >
          {value}
          {!!prevValue && (
            <Box
              display="inline-block"
              color={colors.primary.grey25}
              fontSize="44px"
              lineHeight="53px"
              fontWeight="700"
            >
              /{prevValue}
            </Box>
          )}
        </Heading>
        <Box
          color={colors.primary.richBlack}
          fontSize="18px"
          lineHeight="29px"
          fontWeight="400"
          opacity="0.8"
        >
          {valueInfo}
          {!!prevValueInfo && (
            <Box
              display="inline-block"
              color={colors.primary.grey70}
              fontSize="18px"
              lineHeight="29px"
              fontWeight="400"
              opacity="0.8"
            >
              /{prevValueInfo}
            </Box>
          )}
        </Box>
      </Box>
      <Flex
        maxW="760px"
        width="100%"
        justifyContent="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
        rowGap="32px"
      >
        <Box
          borderBottom={{ base: '1px solid #BFBFBF', md: 'none' }}
          maxW={{ base: '100%', md: '232px' }}
          width="100%"
          position="relative"
        >
          <Box position="absolute" top="3px" left="0px">
            <OilIcon fill={colors.primary.grey70} opacity="1" />
          </Box>
          <Heading
            as="h3"
            color={colors.primary.richBlack}
            fontSize={{ base: '36px', md: '44px' }}
            lineHeight={{ base: '36px', md: '53px' }}
            fontWeight="700"
            pl="54px"
            pb="8px"
          >
            {oilValue}%
          </Heading>
          <Box
            color={colors.primary.richBlack}
            fontSize="18px"
            lineHeight="29px"
            fontWeight="400"
            pl="54px"
            opacity="0.8"
          >
            {oilText}
          </Box>
        </Box>
        <Box
          borderBottom={{ base: '1px solid #BFBFBF', md: 'none' }}
          maxW={{ base: '100%', md: '232px' }}
          width="100%"
          position="relative"
        >
          <Box position="absolute" top="6px" left="6px">
            <GasIcon fill={colors.primary.grey70} opacity="1" />
          </Box>
          <Heading
            as="h3"
            color={colors.primary.richBlack}
            fontSize="44px"
            lineHeight="53px"
            fontWeight="700"
            pl="54px"
            pb="8px"
          >
            {gasValue}%
          </Heading>
          <Box
            color={colors.primary.richBlack}
            fontSize="18px"
            lineHeight="29px"
            fontWeight="400"
            pl="54px"
            opacity="0.8"
          >
            {gasText}
          </Box>
        </Box>
        <Box
          borderBottom={{ base: '1px solid #BFBFBF', md: 'none' }}
          maxW={{ base: '100%', md: '232px' }}
          width="100%"
          position="relative"
        >
          <Box position="absolute" top="10px" left="6px">
            <CoalIcon stroke={colors.primary.grey70} opacity="1" />
          </Box>
          <Heading
            as="h3"
            color={colors.primary.richBlack}
            fontSize="44px"
            lineHeight="53px"
            fontWeight="700"
            pl="56px"
            pb="8px"
          >
            {coalValue}%
          </Heading>
          <Box
            color={colors.primary.richBlack}
            fontSize="18px"
            lineHeight="29px"
            fontWeight="400"
            pl="56px"
            opacity="0.8"
          >
            {coalText}
          </Box>
        </Box>
      </Flex>
    </Flex>
  </Box>
)

export default SnapShotStatistic
