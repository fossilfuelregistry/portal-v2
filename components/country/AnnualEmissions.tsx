import React, { useState, useEffect } from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import PieChart from 'components/charts/PieChart'
import InfoSection from 'components/InfoSection'
import WarmingPotentialSelect, {
  WarmingPotential,
} from 'components/filters/WarmingPotentialSelect'
import Select from 'components/Select'
import RangeChart from 'components/charts/RangeChart'
import ProductionSourceSelect from 'components/filters/ProductionSourceSelect'
import useCountrySources from 'lib/useCountrySources'
import useCountryData from 'lib/useCountryData'
import { colors } from '../../assets/theme'
import useVolumes from '../../hooks/useVolumes'
import useRangeOfCertainty from '../../hooks/useRangeOfCertainty'

const timeOptions = [
  {
    label: 'Latest year: 2020',
    value: 'Latest year: 2020',
  },
]

const AnnualEmissions = ({
  country,
  texts,
  conversions,
  constants,
  prefixConversions,
}: any) => {
  const { productionSources } = useCountrySources({
    country,
  })
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const [productionSourceId, setProductionSourceId] = useState<number>(0)
  const [emissionsData, setEmissionsData] = useState<any[]>([])
  const { volumesData } = useVolumes(emissionsData, productionSourceId)
  const { rangeData } = useRangeOfCertainty(emissionsData, productionSourceId)
  const { getCurrentCO2E } = useCountryData({
    texts,
    gwp,
    productionSourceId,
    region: '',
    country,
    conversionConstants: conversions,
    // @ts-ignore
    allSources: productionSources,
    constants,
    conversionPrefixes: prefixConversions,
  })

  useEffect(() => {
    if (productionSources.length && !productionSourceId) {
      setProductionSourceId(productionSources[0].sourceId)
    }
  }, [productionSources])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const calculateData = async () => {
      const data = await getCurrentCO2E()
      setEmissionsData(data as any[])
    }

    calculateData()
  }, [gwp, productionSourceId, country])

  return (
    <InfoSection title="Annual Emissions from Fossil Fuel Production">
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <WarmingPotentialSelect
          value={gwp}
          onChange={(option) => setGwp(option?.value as string)}
        />
        <ProductionSourceSelect
          sources={productionSources}
          value={productionSourceId}
          onChange={(option) => setProductionSourceId(option?.value as any)}
        />
        <Select
          label="Time"
          value={timeOptions[0].value}
          options={timeOptions}
          onChange={() => {}}
        />
      </SimpleGrid>
      <SimpleGrid
        mb="40px"
        columns={2}
        gridGap="20px"
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
        <PieChart
          data={volumesData.data}
          parentWidth={320}
          parentHeight={320}
          title="Total volumes"
          header="Total Mt CO₂e"
          total={volumesData.total}
        />
        <Box ml="40px">
          <RangeChart
            height={364}
            width={538}
            data={rangeData}
            title="Range of certainty"
          />
        </Box>
      </SimpleGrid>
    </InfoSection>
  )
}

export default AnnualEmissions
