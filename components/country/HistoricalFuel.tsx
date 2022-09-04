import React, { FC, useEffect, useState, useMemo } from 'react'
import InfoSection from 'components/InfoSection'
import LineChart from 'components/charts/LineChart'
import { ConversionFactorInStore } from 'lib/types-legacy'
import { DatabaseRecord } from 'lib/calculations/calculation-constants/types'
import {
  PrefixRecord,
  usePrefixConversion,
} from 'lib/calculations/prefix-conversion'
import useCountryData from 'lib/useCountryData'
import SourceSelect from 'components/filters/SourceSelect'
import { SimpleGrid } from '@chakra-ui/react'

type HistoricalFuelProps = {
  country: string
  texts: Record<string, string>
  conversions: ConversionFactorInStore[]
  constants: DatabaseRecord[]
  prefixConversions: PrefixRecord[]
  sources: any
  fuel: string
  title: string
  measure: string
  sourceType: 'production' | 'reserves'
}

const HistoricalFuel: FC<HistoricalFuelProps> = ({
  country,
  texts,
  conversions,
  constants,
  prefixConversions,
  sources,
  sourceType,
  fuel,
  title,
  measure,
}) => {
  const [sourceId, setSourceId] = useState<number>(0)
  // @ts-ignore
  const { production, reserves } = useCountryData({
    texts,
    region: '',
    country,
    conversionConstants: conversions,
    productionSourceId: 2,
    reservesSourceId: 2,
    // @ts-ignore
    allSources: sources,
    constants,
    conversionPrefixes: prefixConversions,
  })

  const conversion = usePrefixConversion(prefixConversions)

  const sourceData = useMemo(() => {
    const data = sourceType === 'production' ? production : reserves
    const filteredByFuel = data.filter((d) => d.fossilFuelType === fuel)
    const filteredBySource = sourceId
      ? filteredByFuel.filter((d) => d.sourceId === sourceId)
      : filteredByFuel

    const years: number[] = []
    const sources: any[] = []
    const dataset: any[] = []
    let currentYearSet: any = {}
    let max: number = 0

    filteredBySource.forEach((point: any) => {
      if (point.fossilFuelType !== fuel) return

      if (!sources.includes(point.sourceId)) {
        sources.push(point.sourceId)
      }

      if (!years.includes(point.year)) {
        years.push(point.year)
        currentYearSet = { year: point.year }
        dataset.push(currentYearSet)
      }

      let y
      if (point.fossilFuelType === 'gas') y = conversion(point.unit, 'e9m3')
      if (point.fossilFuelType === 'oil') y = conversion(point.unit, 'e6bbl')
      if (point.fossilFuelType === 'coal') y = conversion(point.unit, 'e6ton')

      currentYearSet[point.sourceId] = y

      // @ts-ignore
      max = Math.max(max, y)
    })

    return {
      years,
      sources,
      dataset,
      currentYearSet,
      max,
    }
  }, [production, reserves, fuel, sourceId, country])

  return (
    <InfoSection title={title}>
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <SourceSelect
          showAll
          label="Source"
          sources={sources}
          value={sourceId}
          onChange={(option) => setSourceId(option?.value as any)}
        />
      </SimpleGrid>
      <LineChart
        title={measure}
        data={sourceData}
        allSources={sources}
        width={1176}
        height={400}
      />
    </InfoSection>
  )
}

export default HistoricalFuel
