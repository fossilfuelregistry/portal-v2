import React, { FC } from 'react'
import useCountrySources from 'lib/useCountrySources'
import HistoricalFuel from 'components/country/HistoricalFuel'

type HistoricalSectionProps = {
  country: string
}

const HistoricalSection: FC<HistoricalSectionProps> = ({ country }) => {
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
      />
      <HistoricalFuel
        sourceType="reserves"
        fuel="oil"
        title="Historical Oil Reserves"
        measure="Million barrels"
        sources={reservesSources}
        country={country}
      />
      <HistoricalFuel
        sourceType="production"
        fuel="gas"
        title="Historical Gas production"
        measure="Billion cubic metres"
        sources={productionSources}
        country={country}
      />
      <HistoricalFuel
        sourceType="reserves"
        fuel="gas"
        title="Historical Gas Reserves"
        measure="Billion cubic metres"
        sources={reservesSources}
        country={country}
      />
      <HistoricalFuel
        sourceType="production"
        fuel="coal"
        title="Historical Coal production"
        measure="Thousand tonnes"
        sources={productionSources}
        country={country}
      />
      {/*<HistoricalFuel*/}
      {/*	sourceType="reserves"*/}
      {/*	fuel="coal"*/}
      {/*	title="Historical Coal Reserves"*/}
      {/*	measure="Thousand tonnes"*/}
      {/*	sources={reservesSources}*/}
      {/*	country={country}*/}
      {/*/>*/}
    </>
  )
}

export default HistoricalSection
