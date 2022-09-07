import React, { FC, useContext, useEffect, useState } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import PieChart from 'components/charts/PieChart'
import InfoSection from 'components/InfoSection'
import WarmingPotentialSelect, {
  WarmingPotential,
} from 'components/filters/WarmingPotentialSelect'
import RangeChart from 'components/charts/RangeChart'
import SourceSelect from 'components/filters/SourceSelect'
import useCountrySources from 'lib/useCountrySources'
import useCountryData from 'lib/useCountryData'
import { StaticData } from 'lib/types'
import useText from 'lib/useText'
import { DataContext } from 'components/DataContext'
import { colors } from '../../assets/theme'
import useVolumes from '../../hooks/useVolumes'
import useRangeOfCertainty from '../../hooks/useRangeOfCertainty'

type AnnualEmissionsProps = {
  country: string
}

const AnnualEmissions: FC<AnnualEmissionsProps> = ({ country }) => {
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { conversions, constants, prefixConversions, texts } = staticData

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
    <InfoSection title={translate('annual_emissions')}>
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <WarmingPotentialSelect
          value={gwp}
          onChange={(option) => setGwp(option?.value as string)}
        />
        <SourceSelect
          label="Production estimates source"
          sources={productionSources}
          value={productionSourceId}
          onChange={(option) => setProductionSourceId(option?.value as any)}
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
