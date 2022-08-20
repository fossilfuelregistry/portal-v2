import React, { useState, useEffect, useMemo } from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import PieChart, { PIE_CHART_COLORS } from 'components/charts/PieChart'
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

  const volumes = useMemo(() => {
    const source = emissionsData.find((d) => d.sourceId === productionSourceId)

    if (source) {
      const total = source.production.reduce(
        (prev: any, curr: any) =>
          prev + (curr.co2e.scope1.co2.wa + curr.co2e.scope3.co2.wa),
        0
      )

      const calculatePercentage = (value: number) => (value * 100) / total

      const productionData = source.production
        .map((p: any) => {
          return [
            {
              label: `${p.fossilFuelType}, combustion`,
              fossilFuelType: p.fossilFuelType,
              // @ts-ignore
              fillColor: PIE_CHART_COLORS[p.fossilFuelType].scope1,
              quantity: p.co2e.scope1.co2.wa.toFixed(2),
              percentage: calculatePercentage(p.co2e.scope1.co2.wa as number),
              year: p.year,
            },
            {
              label: `${p.fossilFuelType}, pre-combustion`,
              fossilFuelType: p.fossilFuelType,
              // @ts-ignore
              fillColor: PIE_CHART_COLORS[p.fossilFuelType].scope3,
              quantity: p.co2e.scope3.co2.wa.toFixed(2),
              percentage: calculatePercentage(p.co2e.scope3.co2.wa as number),
              year: p.year,
            },
          ]
        })
        .flat(1)

      return {
        data: productionData,
        total: total.toFixed(2),
      }
    }

    return {
      data: [],
      total: 0,
    }
  }, [emissionsData])

  console.log('emissionsData', emissionsData)
  console.log('volumesData', volumes)
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
          data={volumes.data}
          parentWidth={320}
          parentHeight={320}
          title="Total volumes"
          header="Total Mt CO₂e"
          total={volumes.total}
        />
        <Box ml="40px">
          <RangeChart height={400} width={500} title="Range of certainty" />
        </Box>
      </SimpleGrid>
    </InfoSection>
  )
}

export default AnnualEmissions
