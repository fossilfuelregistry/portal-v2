import React, { FC, useContext, useMemo, useState } from 'react'
import InfoSection from 'components/InfoSection'
import ForecastChart from 'components/charts/ForecastChart'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { StaticData } from 'lib/types'
import WarmingPotentialSelect, {
  WarmingPotential,
} from 'components/filters/WarmingPotentialSelect'
import useCountryData from 'lib/useCountryData'
import useCountrySources from 'lib/useCountrySources'
import groupBy from 'utils/groupBy'
import useText from 'lib/useText'
import useCsvDataTranslator from 'lib/useCsvDataTranslator'
import formatCsvNumber from 'utils/formatCsvNumbers'
import { DataContext } from 'components/DataContext'
import { colors } from '../../assets/theme'

type ForecastSectionProps = {
  country: string
}

const startYear = 2010
const DEBUG = false

const ForecastSection: FC<ForecastSectionProps> = ({ country }) => {
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { generateCsvTranslation } = useCsvDataTranslator()
  const { conversions, constants, prefixConversions } = staticData
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const {
    preferredProductionSourceId,
    preferredProjectionSourceId,
    preferredReservesSourceId,
  } = useCountrySources({
    country,
  })
  const { production, projectedProduction, projection } = useCountryData({
    productionSourceId: preferredProductionSourceId,
    reservesSourceId: preferredReservesSourceId,
    projectionSourceId: preferredProjectionSourceId,
    gwp,
    country,
    conversionConstants: conversions,
    constants,
    conversionPrefixes: prefixConversions,
  })

  const forecastData = useMemo(() => {
    const calculateTotal = (data: any[]) =>
      data
        ? data.reduce((prev, current) => prev + current.co2e.total.total.wa, 0)
        : 0

    const filteredProductionData = production.filter(
      (p) => p.year >= startYear && p.sourceId === preferredProductionSourceId
    )
    const groupedProductionByYear = groupBy(
      filteredProductionData,
      (d) => d.year
    )
    const groupedProductionByFuel = Object.values(groupedProductionByYear).map(
      (d) => groupBy(d, (i) => i.fossilFuelType)
    )
    const productionData = groupedProductionByFuel.map((d) => ({
      oil: calculateTotal(d.oil),
      gas: calculateTotal(d.gas),
      coal: calculateTotal(d.coal),
      year: d.oil[0]?.year || d.gas[0]?.year || d.coal[0].year,
    }))

    // @ts-ignore
    const filteredProjectionData = projection.filter(
      (p: any) =>
        p.year >= startYear && p.sourceId === preferredProjectionSourceId
    )
    const groupedProjectionByYear = groupBy(
      filteredProjectionData,
      (d: any) => d.year
    )
    const groupedProjectionByFuel = Object.values(groupedProjectionByYear).map(
      // @ts-ignore
      (d) => groupBy(d, (i) => i.fossilFuelType)
    )

    const projectionData = groupedProjectionByFuel.map((d) => ({
      co2:
        calculateTotal(d.oil) + calculateTotal(d.gas) + calculateTotal(d.coal),
      // @ts-ignore
      year: d.oil[0]?.year || d.gas[0]?.year || d.coal[0].year,
    }))

    const getFuel = (fuel: string, data: any[]) =>
      data.find((d) => d.fossilFuelType === fuel)
    const groupedProjProdByYear = groupBy(projectedProduction, (d) => d.year)

    const projProdData = Object.values(groupedProjProdByYear).map((d) => {
      const oil = getFuel('oil', d)
      const gas = getFuel('gas', d)
      const coal = getFuel('coal', d)

      return {
        oil_p: oil ? oil.co2e.scope1.co2.wa : 0,
        oil_c: oil ? oil.co2e.scope3.co2.wa : 0,
        gas_p: gas ? gas.co2e.scope1.co2.wa : 0,
        gas_c: gas ? gas.co2e.scope3.co2.wa : 0,
        coal_p: coal ? coal.co2e.scope1.co2.wa : 0,
        coal_c: coal ? coal.co2e.scope3.co2.wa : 0,
        year: d[0].year,
      }
    })

    return {
      productionData,
      projectionData,
      projProdData,
    }
  }, [country, gwp, production, projection])

  const translatedCsvData = useMemo(() => {
    const { productionData, projectionData, projProdData } = forecastData
    const csvData = productionData.map((p) => ({
      year: p.year,
      oil: formatCsvNumber(p.oil),
      gas: formatCsvNumber(p.gas),
      coal: formatCsvNumber(p.coal),
    }))

    projectionData.forEach((d) => {
      const y = csvData.find((dp) => dp.year === d.year)
      // @ts-ignore
      if (y) y.co2 = formatCsvNumber(d.co2)
      // @ts-ignore
      else csvData.push({ year: d.year, co2: formatCsvNumber(d.co2) })
    })
    projProdData.forEach((d) => {
      const y = csvData.find((dp) => dp.year === d.year)
      if (y) {
        // @ts-ignore
        y.oil_p = formatCsvNumber(d.oil_p)
        // @ts-ignore
        y.oil_c = formatCsvNumber(d.oil_c)
        // @ts-ignore
        y.gas_p = formatCsvNumber(d.gas_p)
        // @ts-ignore
        y.gas_c = formatCsvNumber(d.gas_c)
        // @ts-ignore
        y.coal_p = formatCsvNumber(d.coal_p)
        // @ts-ignore
        y.coal_c = formatCsvNumber(d.coal_c)
      } else
        csvData.push({
          // @ts-ignore
          year: formatCsvNumber(d.year),
          oil_p: formatCsvNumber(d.oil_p),
          oil_c: formatCsvNumber(d.oil_c),
          gas_p: formatCsvNumber(d.gas_p),
          gas_c: formatCsvNumber(d.gas_c),
          coal_p: formatCsvNumber(d.coal_p),
          coal_c: formatCsvNumber(d.coal_c),
        })
    })

    return csvData.map(generateCsvTranslation)
  }, [forecastData])

  DEBUG && console.log('translatedCsvData', translatedCsvData)

  return (
    <InfoSection
      title={translate('explanation_emissions_headline')}
      csvData={translatedCsvData}
      filename={`${country}_emissions_forecast.csv`}
    >
      <Box as="p" fontSize="16" mb="24px" color={colors.primary.richBlack}>
        {translate('explanation_emissions')}
      </Box>
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <WarmingPotentialSelect
          value={gwp}
          onChange={(option) => setGwp(option?.value as string)}
        />
      </SimpleGrid>
      <ForecastChart width={1176} height={500} data={forecastData} />
    </InfoSection>
  )
}

export default ForecastSection
