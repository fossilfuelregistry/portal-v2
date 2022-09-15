import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
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
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import formatCsvNumber from 'utils/formatCsvNumbers'
import { isNumber } from 'fp-ts/lib/number'
import { colors } from '../../assets/theme'
import useVolumes from '../../hooks/useVolumes'
import useRangeOfCertainty from '../../hooks/useRangeOfCertainty'

const DEBUG = false

type AnnualEmissionsProps = {
  country: string
}

const AnnualEmissions: FC<AnnualEmissionsProps> = ({ country }) => {
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { countryName, conversions, constants, prefixConversions } = staticData

  const { productionSources } = useCountrySources({
    country,
  })
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const [productionSourceId, setProductionSourceId] = useState<number>(0)
  const [emissionsData, setEmissionsData] = useState<any[]>([])
  const { volumesData } = useVolumes(emissionsData, productionSourceId)
  const { rangeData } = useRangeOfCertainty(emissionsData, productionSourceId)
  const { generateCsvTranslation } = useCsvDataTranslator()
  const { getCurrentCO2E } = useCountryData({
    gwp,
    productionSourceId,
    country,
    conversionConstants: conversions,
    constants,
    conversionPrefixes: prefixConversions,
  })
  DEBUG && console.log('emissionsData_volumesData', {emissionsData}, {volumesData})
  DEBUG && console.log('emissionsData', emissionsData)
  DEBUG && console.log('volumesData', volumesData)

  const enrichWithDescription = ( data: { fossilFuelType: string; combustionType: string }[] ) =>
    data.map((d) => ({ ...d, description: translate(`${d.fossilFuelType}_${d.combustionType}`) }))

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

  const translatedCsvData = useMemo(() => {
    const csvData = [
      {
        scope1_low: formatCsvNumber(rangeData[0]?.value[0]),
        scope1_mid: formatCsvNumber(rangeData[0]?.value[1]),
        scope1_high: formatCsvNumber(rangeData[0]?.value[2]),
        scope3_low: formatCsvNumber(rangeData[1]?.value[0]),
        scope3_mid: formatCsvNumber(rangeData[1]?.value[1]),
        scope3_high: formatCsvNumber(rangeData[1]?.value[2]),
      },
    ]
    return csvData.map(generateCsvTranslation)
  }, [rangeData])

  return (
    <InfoSection
      title={`${countryName} ${translate('annual_emissions')}`}
      filename={`${country}_year_emissions.csv`}
      csvData={translatedCsvData}
    >
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
        // @ts-ignore
          data={enrichWithDescription(volumesData.data)}
          parentWidth={320}
          parentHeight={320}
          title="Total volumes"
          header="Total Mt CO₂e"
          total={isNumber(volumesData.total)? volumesData.total.toFixed(2) : volumesData.total}
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
