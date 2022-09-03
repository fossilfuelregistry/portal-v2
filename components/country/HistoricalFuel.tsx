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
  const [emissionsData, setEmissionsData] = useState<any[]>([])
  const [sourceId, setSourceId] = useState<number>(0)
  // @ts-ignore
  const { getCurrentCO2E, production, reserves } = useCountryData({
    texts,
    region: '',
    country,
    gwp: 'GWP100',
    conversionConstants: conversions,
    productionSourceId: sourceId,
    reservesSourceId: sourceId,
    // @ts-ignore
    allSources: sources,
    constants,
    conversionPrefixes: prefixConversions,
  })

  const conversion = usePrefixConversion(prefixConversions)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const calculateData = async () => {
      const data = await getCurrentCO2E()
      setEmissionsData(data as any[])
      console.log('HistoricalFuel-pro', production)
      conversion('e6m3', 'e9m3')
      console.log('HistoricalFuel-e9m3', conversion('e3bblsday', 'e6bbl'))
    }

    calculateData()
  }, [country, sourceId])

  const data = useMemo(() => {
    const years: number[] = []
    const sources: any[] = []
    const dataset: any[] = []
    let currentYearSet: any = {}
    let max: number = 0

    emissionsData?.length &&
      emissionsData[0].production.forEach((point: any) => {
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
  }, [emissionsData])

  console.log('HistoricalFuel-sourceId', sourceId)
  console.log('HistoricalFuel type', sourceType)
  console.log('HistoricalFuel-data', emissionsData)
  console.log('HistoricalFuel-ready', data)

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
      <LineChart title={measure} width={1176} height={400} />
    </InfoSection>
  )
}

export default HistoricalFuel
