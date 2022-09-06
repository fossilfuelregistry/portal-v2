import React, { FC, useMemo, useState } from 'react'
import InfoSection from 'components/InfoSection'
import ForecastChart from 'components/charts/ForecastChart'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { ConversionFactorInStore } from 'lib/types-legacy'
import { DatabaseRecord } from 'lib/calculations/calculation-constants/types'
import { PrefixRecord } from 'lib/calculations/prefix-conversion'
import WarmingPotentialSelect, {
  WarmingPotential,
} from 'components/filters/WarmingPotentialSelect'
import useCountryData from 'lib/useCountryData'
import useCountrySources from 'lib/useCountrySources'
import groupBy from 'utils/groupBy'
import { colors } from '../../assets/theme'

type ForecastSectionProps = {
  country: string
  texts: Record<string, string>
  conversions: ConversionFactorInStore[]
  constants: DatabaseRecord[]
  prefixConversions: PrefixRecord[]
}

const startYear = 2010

const ForecastSection: FC<ForecastSectionProps> = ({
  country,
  texts,
  conversions,
  constants,
  prefixConversions,
}) => {
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

    return {
      productionData,
      projectionData,
      projProdData: [],
    }
  }, [country, gwp, production, projection])

  return (
    <InfoSection title="Historical and projected emissions under various scenarios">
      <Box as="p" fontSize="16" mb="24px" color={colors.primary.richBlack}>
        This chart shows how the currently estimated level of reserves and
        contingent resources, expressed in terms of their embedded greenhouse
        gas emissions, compared to projected future production under various
        scenarios. Where projected production exceeds the amount of currently
        estimated reserves and contingent resources, it indicates that fossil
        fuel production may expand beyond current reserves under those
        scenarios. We call these forecasted reserves. Where projected future
        production is entirely met by existing reserves and contingent
        resources, it indicates the country may wind down production before all
        existing reserves are depleted. We call these excess reserves.
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
