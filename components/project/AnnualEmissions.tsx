import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import PieChart, { PIE_CHART_COLORS } from 'components/charts/PieChart'
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
import useProjectData from 'lib/useProjectData'
import useProjectSources from 'lib/useProjectSources'
import { colors } from '../../assets/theme'
import useVolumes from '../../hooks/useVolumes'
import useRangeOfCertainty from '../../hooks/useRangeOfCertainty'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'

type AnnualEmissionsProps = {
  country: string
  projectId: number
  theProject: any
}

// Why reservesSources is empty
const AnnualEmissions: FC<AnnualEmissionsProps> = ({
  country,
  projectId,
  theProject,
}) => {
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { conversions, constants, prefixConversions, texts } = staticData

  const { productionSources, preferredProductionSourceId } = useCountrySources({
    country,
  })
  const projectSources = useProjectSources({ projectId, country })
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const [productionSourceId, setProductionSourceId] = useState<number>(preferredProductionSourceId)

  console.log('projectSources', projectSources)

  const gg = useProjectData({
    reservesSourceId: 21,
    projectId,
    gwp,
    country,
    conversionConstants: conversions,
    constants,
    allSources: projectSources.reservesSources,
    // @ts-ignore
    stableProduction: {},
    prefixes: prefixConversions,
  })

  useEffect(() => {
    if (productionSources.length && !productionSourceId) {
      setProductionSourceId(productionSources[0].sourceId)
    }
  }, [productionSources])

  const projInfo = useMemo(() => {
    if (!theProject?.id) return null
    return gg.projectCO2(theProject)
  }, [theProject?.id])

  const volumesData = useMemo(() => {
    if (!projInfo) {
      return {
        data: [],
        total: 0,
      }
    }
    const total = projInfo?.totalCO2
    const calculatePercentage = (value: number) => (value * 100) / total

    const projectData = projInfo?.fuels
      .map((fuel) => {
        const fuelData = projInfo[fuel]
        return [
          {
            label: `${capitalizeFirstLetter(fuel)}, combustion`,
            fossilFuelType: fuel,
            // @ts-ignore
            fillColor: PIE_CHART_COLORS[fuel].scope3,
            // @ts-ignore
            quantity: fuelData?.scope3.co2.wa.toFixed(2),
            percentage: calculatePercentage(
              // @ts-ignore
              fuelData.scope3.total.wa as number
            ),
            // @ts-ignore
            year: fuelData.year,
          },
          {
            label: `${capitalizeFirstLetter(fuel)}, pre-combustion`,
            fossilFuelType: fuel,
            // @ts-ignore
            fillColor: PIE_CHART_COLORS[fuel].scope1,
            // @ts-ignore
            quantity: fuelData?.scope1.co2.wa.toFixed(2),
            percentage: calculatePercentage(
              // @ts-ignore
              fuelData.scope1.total.wa as number
            ),
            // @ts-ignore
            year: fuelData.year,
          },
        ]
      })
      .flat(1)

    return {
      data: projectData,
      total: total?.toFixed(2),
    }
  }, [projInfo])

  const rangeData = useMemo(() => {
    if (!projInfo) {
      return []
    }

    return projInfo?.fuels.reduce((prev: any, curr: any) => {
      // @ts-ignore
      const fuelData = projInfo[curr]

      if (fuelData) {
        // @ts-ignore
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { p5: p5S1, wa: waS1, p95: p95S1 } = fuelData.scope1?.total
        // @ts-ignore
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { p5: p5S3, wa: waS3, p95: p95S3 } = fuelData.scope3?.total
        const totalP5 = p5S1 + p5S3
        const totalWa = waS1 + waS3
        const totalP95 = p95S1 + p95S3

        if (!prev.length) {
          return [
            {
              value: [p5S1, waS1, p95S1],
              label: 'Pre-combustion',
            },
            {
              value: [p5S3, waS3, p95S3],
              label: 'Combustion',
            },
            {
              value: [totalP5, totalWa, totalP95],
              label: 'Total',
            },
          ]
        }

        return [
          {
            value: [
              p5S1 + prev[1].value[0],
              waS1 + prev[1].value[1],
              p95S1 + prev[1].value[2],
            ],
            label: 'Pre-combustion',
          },
          {
            value: [
              p5S3 + prev[0].value[0],
              waS3 + prev[0].value[1],
              p95S3 + prev[0].value[2],
            ],
            label: 'Combustion',
          },
          {
            value: [
              totalP5 + prev[2].value[0],
              totalWa + prev[2].value[1],
              totalP95 + prev[2].value[2],
            ],
            label: 'Total',
          },
        ]
      }

      return prev
    }, [])
  }, [projInfo])

  console.log('rangeData', rangeData)

  console.log('my', projInfo)

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
          total={volumesData.total as string}
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
