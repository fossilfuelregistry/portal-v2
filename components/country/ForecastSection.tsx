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
import { DataContext } from 'components/DataContext'
import { colors } from '../../assets/theme'

type ForecastSectionProps = {
  country: string
}

const startYear = 2010

const ForecastSection: FC<ForecastSectionProps> = ({ country }) => {
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { conversions, constants, prefixConversions, texts } = staticData
  const [gwp, setGwp] = useState<string>(WarmingPotential.GWP100)
  const { reservesSources, projectionSources } = useCountrySources({
    country,
  })
  const { production, projectedProduction, projection } = useCountryData({
    texts,
    productionSourceId: 2,
    reservesSourceId: 2,
    projectionSourceId: 2,
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
    console.log('forecast-projectedProduction', projectedProduction)

    const filteredProductionData = production.filter((p) => p.year >= startYear)
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
    const groupedProjectionByYear = groupBy(projection, (d) => d.year)
    const groupedProjectionByFuel = Object.values(groupedProjectionByYear).map(
      (d) => groupBy(d, (i) => i.fossilFuelType)
    )

    const projectionData = groupedProjectionByFuel.map((d) => ({
      co2:
        calculateTotal(d.oil) + calculateTotal(d.gas) + calculateTotal(d.coal),
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

  return (
    <InfoSection title={translate('explanation_emissions_headline')}>
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
