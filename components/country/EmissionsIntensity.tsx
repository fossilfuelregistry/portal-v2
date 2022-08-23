import React, { useState } from 'react'
import { SimpleGrid, Box, Flex } from '@chakra-ui/react'
import InfoSection from 'components/InfoSection'
import BarStackChart from '../charts/BarStackChart'
import WarmingPotentialSelect, {
  WarmingPotential,
} from '../filters/WarmingPotentialSelect'
import { colors } from '../../assets/theme'
import { InfoIcon, LineIcon } from 'components/Icons'

const EmissionsIntensity = () => {
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)

  return (
    <InfoSection title="Emissions Intensity of Fossil Fuel Production">
      <Box mb="40px" maxW="377px">
        <WarmingPotentialSelect
          value={gwp}
          onChange={(option) => setGwp(option?.value as string)}
        />
      </Box>
      <SimpleGrid
        mb="40px"
        columns={2}
        gridGap="80px"
        position="relative"
        _after={{
          content: `""`,
          width: '1px',
          height: '100%',
          background: colors.primary.grey25,
          position: 'absolute',
          top: 0,
          left: '50%',
        }}
      >
        <BarStackChart
          title="Fossil Fuels, total emissions"
          width={550}
          height={300}
        />
        <BarStackChart title="Methane" width={550} height={300} />
      </SimpleGrid>
      <Flex alignItems="flex-start" flexWrap="wrap" mt="40px">
        <Flex
          alignItems="center"
          mt="16px"
          mr="24px"
          fontSize="14px"
          color={colors.primary.richBlack}
        >
          <Box
            w="12px"
            h="12px"
            backgroundColor="#87BFFF"
            borderRadius="100%"
            mr="8px"
          />
          Pre-combustion
          <InfoIcon ml="8px" />
        </Flex>
        <Flex
          alignItems="center"
          mt="16px"
          mr="24px"
          fontSize="14px"
          color={colors.primary.richBlack}
        >
          <Box
            w="12px"
            h="12px"
            backgroundColor="#4C6EE6"
            borderRadius="100%"
            mr="8px"
          />
          Combustion
          <InfoIcon ml="8px" />
        </Flex>
      </Flex>
    </InfoSection>
  )
}

export default EmissionsIntensity
