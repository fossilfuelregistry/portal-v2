import React, { FC, useContext, useMemo, useState } from 'react'
import { Box, SimpleGrid, Alert, AlertIcon } from '@chakra-ui/react'
import PieChart, { PIE_CHART_COLORS } from 'components/charts/PieChart'
import InfoSection from 'components/InfoSection'
import WarmingPotentialSelect, {
  WarmingPotential,
} from 'components/filters/WarmingPotentialSelect'
import RangeChart from 'components/charts/RangeChart'
import { StaticData } from 'lib/types'
import useText from 'lib/useText'
import { DataContext } from 'components/DataContext'
import useProjectData from 'lib/useProjectData'
import useProjectSources from 'lib/useProjectSources'
import { usePrefixConversion } from 'lib/calculations/prefix-conversion'
import { colors } from '../../assets/theme'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import useProjectAnnualEmissionsCSVData from '../../hooks/useProjectAnnualEmissionsCSVData'

const DEBUG = false

type AnnualEmissionsProps = {
  theProject: any
  countryName: string
}

const AnnualEmissions: FC<AnnualEmissionsProps> = ({
  theProject,
  countryName,
}) => {
  const { id: projectId, iso3166: country } = theProject
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { conversions, constants, prefixConversions } = staticData

  const { productionSources } = useProjectSources({ projectId, country })
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const conversion = usePrefixConversion(prefixConversions)
  DEBUG && console.log('productionSources', productionSources)

  const { projectCO2 } = useProjectData({
    projectId,
    gwp,
    country,
    conversionConstants: conversions,
    constants,
    allSources: productionSources,
    // @ts-ignore
    stableProduction: {},
    prefixes: prefixConversions,
  })

  const enrichWithDescription = (
    data: { fossilFuelType: string; combustionType: string }[]
  ) =>
    data.map((d) => ({
      ...d,
      description: translate(`${d.fossilFuelType}_${d.combustionType}`),
    }))

  const projInfo = useMemo(() => {
    if (!theProject?.id) return null
    return projectCO2(theProject)
  }, [theProject?.id, projectCO2, gwp])

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
            combustionType: 'combustion',
            // @ts-ignore
            fillColor: PIE_CHART_COLORS[fuel].scope3,
            // @ts-ignore
            quantity: fuelData?.scope3.total.wa.toFixed(8),
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
            combustionType: 'precombustion',
            // @ts-ignore
            fillColor: PIE_CHART_COLORS[fuel].scope1,
            // @ts-ignore
            quantity: fuelData?.scope1.total.wa.toFixed(8),
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
              p5S1 + prev[0].value[0],
              waS1 + prev[0].value[1],
              p95S1 + prev[0].value[2],
            ],
            label: 'Pre-combustion',
          },
          {
            value: [
              p5S3 + prev[1].value[0],
              waS3 + prev[1].value[1],
              p95S3 + prev[1].value[2],
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

  const { translatedCsvData } = useProjectAnnualEmissionsCSVData({
    rangeData,
    countryName,
    projectName: theProject.projectIdentifier,
    projectId,
    gwp,
  })

  const projectDetails = useMemo(() => {
    const getValue = (fossilFuelType: string, volume: number, unit: string) => {
      if (fossilFuelType === 'gas')
        // @ts-ignore
        return conversion(unit, 'e9m3') * volume
      if (fossilFuelType === 'oil')
        // @ts-ignore
        return conversion(unit, 'e6bbl') * volume
      if (fossilFuelType === 'coal') {
        // @ts-ignore
        return conversion(unit, 'e6ton') * volume
      }
      throw new Error('Invalid fossil fuel')
    }
    const fuelMap = {
      oil: 'mln bbls',
      gas: 'bln m3',
      coal: 'bln ton',
    }

    // @ts-ignore
    return projInfo?.fuels
      .map((f) => {
        const curr = projInfo[f]

        // @ts-ignore
        return `${capitalizeFirstLetter(f)} ${getValue(
          f,
          // @ts-ignore
          curr.volume,
          // @ts-ignore
          curr.volumeUnit
        ).toFixed(1)} ${fuelMap[f]} ${
          // @ts-ignore
          curr.lastYear ? `(${curr.lastYear})` : `(data year ${curr.dataYear})`
        }`
      })
      .join(': ')
  }, [projInfo])

  const sourceInfo = useMemo(() => {
    // @ts-ignore
    const f = projInfo?.fuels[0]
    // @ts-ignore
    const s = projInfo && f && projInfo[f]?.sources[0]
    if (!s) return null

    return {
      // @ts-ignore
      name: s.name,
      // @ts-ignore
      url: s.url,
      // @ts-ignore
      documentUrl: s.documentUrl,
    }
  }, [projInfo])

  // @ts-ignore
  return (
    <InfoSection
      isProject
      sourceInfo={sourceInfo}
      title={`${countryName}: ${theProject.projectIdentifier}: ${projectDetails}`}
      filename={`${theProject.projectIdentifier}_year_emissions.csv`}
      csvData={translatedCsvData}
      noCsvHeader
    >
      {(theProject.projectType === 'DENSE' ||
        theProject.projectType === 'SPARSE') && (
        <Alert status="info" mb="24px">
          <AlertIcon />
          Only {theProject.projectType.toLowerCase()} data are available for
          this project.
        </Alert>
      )}
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <WarmingPotentialSelect
          value={gwp}
          onChange={(option) => setGwp(option?.value as string)}
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
          title={`${theProject?.projectIdentifier} Total CO2e Emissions (latest year)`}
          header="Total Mt CO₂e"
          total={volumesData.total as string}
        />
        <Box ml="40px">
          <RangeChart
            height={364}
            data={rangeData}
            title={`${theProject?.projectIdentifier} Range of Emissions Uncertainty`}
            label="MT"
          />
        </Box>
      </SimpleGrid>
    </InfoSection>
  )
}

export default AnnualEmissions
