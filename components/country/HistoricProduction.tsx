import React, { FC, useEffect, useState, useMemo } from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import InfoSection from 'components/InfoSection'
import GroupBarChart from 'components/charts/GroupBarChart'
import { ConversionFactorInStore } from 'lib/types-legacy'
import { DatabaseRecord } from 'lib/calculations/calculation-constants/types'
import { PrefixRecord } from 'lib/calculations/prefix-conversion'
import useCountrySources from 'lib/useCountrySources'
import useCountryData from 'lib/useCountryData'
import ProductionSourceSelect from 'components/filters/ProductionSourceSelect'
import { WarmingPotential } from 'components/filters/WarmingPotentialSelect'

type HistoricProductionProps = {
  country: string
  texts: Record<string, string>
  conversions: ConversionFactorInStore[]
  constants: DatabaseRecord[]
  prefixConversions: PrefixRecord[]
}

const startYear = 2010

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    // eslint-disable-next-line no-param-reassign
    ;(groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)

const HistoricProduction: FC<HistoricProductionProps> = ({
  country,
  texts,
  conversions,
  constants,
  prefixConversions,
}) => {
  const { productionSources } = useCountrySources({
    country,
  })
  const [productionSourceId, setProductionSourceId] = useState<number>(0)
  const { production } = useCountryData({
    texts,
    productionSourceId,
    gwp: 'GWP100',
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

  const historicData = useMemo(() => {
    const calculateTotal = (data: any[]) =>
      data
        ? data.reduce((prev, current) => prev + current.co2e.total.total.wa, 0)
        : 0

    const filteredData = production.filter(
      (p) =>
        p.year >= startYear &&
        p.year % 2 === 0 &&
        p.sourceId === productionSourceId
    )
    const groupedByYear = groupBy(filteredData, (d) => d.year)
    const groupedByFuel = Object.values(groupedByYear).map((d) => {
      return groupBy(d, (i) => i.fossilFuelType)
    })
    const result = groupedByFuel.map((d) => ({
      Oil: calculateTotal(d.oil),
      Gas: calculateTotal(d.gas),
      Coal: calculateTotal(d.coal),
      date: d.oil[0].year,
    }))

    return result
  }, [production])

  return (
    <InfoSection title="Historic production">
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <ProductionSourceSelect
          sources={productionSources}
          value={productionSourceId}
          onChange={(option) => setProductionSourceId(option?.value as any)}
        />
      </SimpleGrid>
      {!!historicData.length && (
        <Box mb="40px" position="relative">
          <GroupBarChart data={historicData} width={1176} height={400} />
        </Box>
      )}
    </InfoSection>
  )
}

export default HistoricProduction
