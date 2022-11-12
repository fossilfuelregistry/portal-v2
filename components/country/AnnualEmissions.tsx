import React, { FC, useContext, useEffect, useState } from 'react'
import { Box, SimpleGrid, useMediaQuery } from '@chakra-ui/react'
import PieChart from 'components/charts/PieChart'
import InfoSection from 'components/InfoSection'
import WarmingPotentialSelect, {
  WarmingPotential,
} from 'components/filters/WarmingPotentialSelect'
import RangeChart from 'components/charts/RangeChart'
import SourceSelect from 'components/filters/SourceSelect'
import useCountrySources from 'lib/useCountrySources'
import useCountryData from 'lib/useCountryData'
import { EmissionsData, StaticData } from 'lib/types'
import useText from 'lib/useText'
import { DataContext } from 'components/DataContext'
import { isNumber } from 'fp-ts/lib/number'
import { colors } from '../../assets/theme'
import useVolumes from '../../hooks/useVolumes'
import useRangeOfCertainty from '../../hooks/useRangeOfCertainty'
import useCountryAnnualEmissionsCSVData from '../../hooks/useCountryAnnualEmissionsCSVData'

const DEBUG = false

type AnnualEmissionsProps = {
  country: string
}

const AnnualEmissions: FC<AnnualEmissionsProps> = ({ country }) => {
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { countryName, conversions, constants, prefixConversions } = staticData

  const { productionSources, preferredProductionSourceId } = useCountrySources({
    country,
  })
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const [productionSourceId, setProductionSourceId] = useState<number>(0)
  const [emissionsData, setEmissionsData] = useState<EmissionsData>([])
  const { volumesData } = useVolumes(emissionsData, productionSourceId)
  const { rangeData } = useRangeOfCertainty(emissionsData, productionSourceId)
  const { getCurrentCO2E } = useCountryData({
    gwp,
    productionSourceId,
    country,
    conversionConstants: conversions,
    constants,
    conversionPrefixes: prefixConversions,
  })
  const { translatedCsvData } = useCountryAnnualEmissionsCSVData({
    emissionsData: emissionsData?.find(
      (d) => d?.sourceId === preferredProductionSourceId
    ),
    rangeData,
    countryName,
    country,
    prefixConversions,
  })
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)')
  DEBUG &&
    console.log('emissionsData_volumesData', { emissionsData }, { volumesData })
  DEBUG && console.log('emissionsData', emissionsData)
  DEBUG && console.log('volumesData', volumesData)

  const enrichWithDescription = (
    data: { fossilFuelType: string; combustionType: string }[]
  ) =>
    data.map((d) => ({
      ...d,
      description: translate(`${d.fossilFuelType}_${d.combustionType}`),
    }))

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
    <InfoSection
      title={`${countryName} ${translate('annual_emissions')}`}
      filename={`${country}_year_emissions.csv`}
      csvData={translatedCsvData}
      noCsvHeader
    >
      <SimpleGrid mb="40px" columns={{ base: 1, md: 3 }} gridGap="20px">
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
        columns={{ base: 1, md: 2 }}
        gridGap="20px"
        position="relative"
        _after={{
          content: { base: 'none', md: `""` },
          width: '1px',
          height: '100%',
          background: colors.primary.grey25,
          position: 'absolute',
          top: 0,
          left: '50%',
        }}
      >
        <PieChart
          // @ts-ignore
          data={enrichWithDescription(volumesData.data)}
          parentWidth={isLargerThan1024 ? 320 : 240}
          parentHeight={isLargerThan1024 ? 320 : 240}
          title="Total volumes"
          header="Total Mt CO₂e"
          total={
            isNumber(volumesData.total)
              ? volumesData.total.toFixed(2)
              : volumesData.total
          }
        />
        <Box ml={{ base: 0, md: '40px' }}>
          <RangeChart
            height={364}
            data={rangeData}
            title="Range of certainty"
          />
        </Box>
      </SimpleGrid>
    </InfoSection>
  )
}

export default AnnualEmissions
