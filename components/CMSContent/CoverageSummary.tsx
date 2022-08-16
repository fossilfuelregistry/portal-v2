import React, { FC } from 'react'
import { Box, Heading, Text, Grid, Flex } from '@chakra-ui/react'
import Container from 'components/Container'
import { CoalIcon, GasIcon, OilIcon } from 'components/Icons'
import { colors } from '../../assets/theme'

type Block = {
  Headline: string
  Intro: string
}

type CoverageSummaryProps = {
  block: Block
}

const CoverageSummary: FC<CoverageSummaryProps> = ({ block }) => {
  const { Headline, Intro } = block
  console.log(block)

  return (
    <Box bg={colors.primary.richBlue} py={{ base: '40px', md: '78px' }}>
      <Container>
        <Heading
          as="h2"
          fontSize={{ base: '28px', md: '44px' }}
          color={colors.common.white}
          fontWeight="700"
          mb="26px"
        >
          {Headline}
        </Heading>
        <Text
          maxW={{ base: '100%', md: '600px' }}
          fontSize="18px"
          fontWeight="400"
          color={colors.common.white}
          mb="40px"
        >
          {Intro}
        </Text>
        <Flex
          flexDirection={{ base: 'column', xl: 'row' }}
          justifyContent="space-between"
        >
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={{ base: '43px', md: '0', xl: '70px' }}
            position="relative"
            _after={{
              content: { base: 'none', xl: `""` },
              width: '1px',
              height: '100%',
              background: colors.common.white,
              opacity: '0.5',
              position: 'absolute',
              top: 0,
              right: '-126px',
            }}
            pb={{ base: '50px', xl: '30px' }}
          >
            <Box color={colors.common.white}>
              <Heading
                as="h3"
                fontSize={{ base: '28px', md: '44px' }}
                fontWeight="700"
                mb="6px"
              >
                89
              </Heading>
              <Text fontSize={{ base: '16px', md: '18px' }} opacity="0.8">
                Countries
              </Text>
            </Box>
            <Box color={colors.common.white} width="100%">
              <Heading
                as="h3"
                fontSize={{ base: '28px', md: '44px' }}
                fontWeight="700"
                mb="6px"
              >
                73161
              </Heading>
              <Text
                maxW={{ base: '100%', xl: '133px' }}
                fontSize={{ base: '16px', md: '18px' }}
                opacity="0.8"
              >
                Extraction fields and projects
              </Text>
            </Box>
          </Grid>
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={{ base: '48px', md: '50px', xl: '80px' }}
          >
            <Box
              color={colors.common.white}
              px="20px"
              ml={{ base: '35px', xl: '0' }}
            >
              <Heading
                as="h3"
                fontSize={{ base: '28px', md: '44px' }}
                fontWeight="700"
                mb="6px"
                position="relative"
              >
                <OilIcon
                  width="40px"
                  height="40px"
                  position="absolute"
                  top="4px"
                  left="-60px"
                />
                70%
              </Heading>
              <Text
                maxW={{ base: '100%', md: '110px' }}
                width="100%"
                fontSize={{ base: '16px', md: '18px' }}
                opacity="0.8"
              >
                Oil projects by production
              </Text>
            </Box>
            <Box
              color={colors.common.white}
              px="20px"
              ml={{ base: '35px', md: '0' }}
            >
              <Heading
                as="h3"
                fontSize={{ base: '28px', md: '44px' }}
                fontWeight="700"
                mb="6px"
                position="relative"
              >
                <GasIcon position="absolute" top="8px" left="-55px" />
                91%
              </Heading>
              <Text
                maxW={{ base: '100%', md: '110px' }}
                fontSize={{ base: '16px', md: '18px' }}
                opacity="0.8"
              >
                Gas projects by production
              </Text>
            </Box>
            <Box
              color={colors.common.white}
              px="20px"
              ml={{ base: '35px', md: '0' }}
            >
              <Heading
                as="h3"
                fontSize={{ base: '28px', md: '44px' }}
                fontWeight="700"
                mb="6px"
                position="relative"
              >
                <CoalIcon position="absolute" top="11px" left="-55px" />
                50%
              </Heading>
              <Text
                maxW={{ base: '100%', md: '110px' }}
                fontSize={{ base: '16px', md: '18px' }}
                opacity="0.8"
              >
                Coal projects by production
              </Text>
            </Box>
          </Grid>
        </Flex>
      </Container>
    </Box>
  )
}

export default CoverageSummary
