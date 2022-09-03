import React, { FC } from 'react'
import InfoSection from 'components/InfoSection'
import LineChart from 'components/charts/LineChart'
import { ConversionFactorInStore } from 'lib/types-legacy'
import { DatabaseRecord } from 'lib/calculations/calculation-constants/types'
import { PrefixRecord } from 'lib/calculations/prefix-conversion'
import useCountrySources from 'lib/useCountrySources'
import HistoricalFuel from 'components/country/HistoricalFuel'

type HistoricalSectionProps = {
  country: string
  texts: Record<string, string>
  conversions: ConversionFactorInStore[]
  constants: DatabaseRecord[]
  prefixConversions: PrefixRecord[]
}

const HistoricalSection: FC<HistoricalSectionProps> = ({
  country,
  texts,
  conversions,
  constants,
  prefixConversions,
}) => {
  const { productionSources, reservesSources } = useCountrySources({
    country,
  })

  return (
    <>
      <HistoricalFuel
        sourceType="production"
        fuel="oil"
        title="Historical Oil production"
        measure="Million barrels"
        sources={productionSources}
        country={country}
        texts={texts}
        conversions={conversions}
        constants={constants}
        prefixConversions={prefixConversions}
      />
      <HistoricalFuel
        sourceType="reserves"
        fuel="oil"
        title="Historical Oil Reserves"
        measure="Million barrels"
        sources={reservesSources}
        country={country}
        texts={texts}
        conversions={conversions}
        constants={constants}
        prefixConversions={prefixConversions}
      />
    </>
  )
}

export default HistoricalSection
