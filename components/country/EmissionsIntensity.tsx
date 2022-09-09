import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import InfoSection from 'components/InfoSection'
import Info from 'components/Info'
import { StaticData } from 'lib/types'
import useCountryData from 'lib/useCountryData'
import useCountrySources from 'lib/useCountrySources'
import { DataContext } from 'components/DataContext'
import BarStackChart from '../charts/BarStackChart'
import WarmingPotentialSelect, {
  WarmingPotential,
} from '../filters/WarmingPotentialSelect'
import { colors } from '../../assets/theme'

type EmissionsIntensityProps = {
  country: string
}

const EmissionsIntensity: FC<EmissionsIntensityProps> = ({ country }) => {
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const [countryData, setCountryData] = useState<any[]>([])
  const staticData: StaticData = useContext(DataContext)
  const { countryName, conversions, constants, prefixConversions, texts } =
    staticData
  const { productionSources } = useCountrySources({ country })

  const { getCurrentCO2E } = useCountryData({
    gwp,
    region: '',
    country,
    conversionConstants: conversions,
    // @ts-ignore
    allSources: productionSources,
    constants,
    conversionPrefixes: prefixConversions,
  })

  useEffect(() => {
    const calculateData = async () => {
      const data = await getCurrentCO2E()
      setCountryData(data as any[])
    }

    calculateData()
  }, [gwp, country])

  const getFuelData = (sourceId: number, fossilFuelType: string) => {
    const source: any = countryData.find((d) => d.sourceId === sourceId)
    return source?.production?.find(
      (p: any) => p.fossilFuelType === fossilFuelType
    )
  }

  const generateFuelData = (data: any, fuel: string, type: 'co2' | 'ch4') => ({
    Combustion: data?.co2e.scope3[type].wa,
    'Pre-combustion': data?.co2e.scope1[type].wa,
    fuel,
  })

  const totalEmissionsData = useMemo(() => {
    const oilData = getFuelData(2, 'oil')
    const gasData = getFuelData(2, 'gas')
    const coalData = getFuelData(1, 'gas')

    return [
      generateFuelData(oilData, 'Oil', 'co2'),
      generateFuelData(gasData, 'Gas', 'co2'),
      generateFuelData(coalData, 'Coal', 'co2'),
    ]
  }, [countryData])

  console.log('totalEmissionsData', totalEmissionsData)

  const methaneData = useMemo(() => {
    const oilData = getFuelData(2, 'oil')
    const gasData = getFuelData(2, 'gas')
    const coalData = getFuelData(1, 'gas')

    return [
      generateFuelData(oilData, 'Oil', 'ch4'),
      generateFuelData(gasData, 'Gas', 'ch4'),
      generateFuelData(coalData, 'Coal', 'ch4'),
    ]
  }, [countryData])

  return (
    <InfoSection
      title={`${countryName} Emissions Intensity of Fossil Fuel Production`}
    >
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
          data={totalEmissionsData}
        />
        <BarStackChart
          title="Methane"
          width={550}
          height={300}
          data={methaneData}
        />
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
          <Info />
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
          <Info />
        </Flex>
      </Flex>
    </InfoSection>
  )
}

export default EmissionsIntensity
