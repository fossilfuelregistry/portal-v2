import React, { FC, useContext, useMemo, useState } from 'react'
import InfoSection from 'components/InfoSection'
import LineChart from 'components/charts/LineChart'
import { StaticData } from 'lib/types'
import { usePrefixConversion } from 'lib/calculations/prefix-conversion'
import useCountryData from 'lib/useCountryData'
import SourceSelect from 'components/filters/SourceSelect'
import { SimpleGrid } from '@chakra-ui/react'
import { DataContext } from 'components/DataContext'

const DEBUG = false

type HistoricalFuelProps = {
  country: string
  sources: any
  fuel: string
  title: string
  measure: string
  sourceType: 'production' | 'reserves'
}

const HistoricalFuel: FC<HistoricalFuelProps> = ({
  country,
  sources,
  sourceType,
  fuel,
  title,
  measure,
}) => {
  const staticData: StaticData = useContext(DataContext)
  const { countryName, conversions, constants, prefixConversions, texts } =
    staticData

  const [sourceId, setSourceId] = useState<number>(0)
  // @ts-ignore
  const { production, reserves } = useCountryData({
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
      if (point.fossilFuelType === 'gas')
        y = (conversion(point?.unit, 'e9m3') ?? 1) * point.volume
      if (point.fossilFuelType === 'oil')
        y = (conversion(point.unit, 'e6bbl') ?? 1) * point.volume

      if (point.fossilFuelType === 'coal') {
        y = (conversion(point.unit, 'e6ton') ?? 1) * point.volume
      }

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

  DEBUG && console.log('sourceData', sourceData)

  return (
    <InfoSection title={`${countryName} ${title}`}>
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
