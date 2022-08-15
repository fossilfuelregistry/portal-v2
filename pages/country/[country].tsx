/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Navbar from 'components/navigation/Navbar'
// @ts-ignore
import { getPageStaticProps, getProducingCountries } from 'lib/staticProps'
import { ConversionFactorInStore } from 'lib/types-legacy'
import { PrefixRecord } from 'lib/calculations/prefix-conversion'
import { useApolloClient } from '@apollo/client'
import { DatabaseRecord } from 'lib/calculations/calculation-constants/types'
import useCountryData from 'lib/useCountryData'
import useCountrySources from 'lib/useCountrySources'

export type Props = {
  sources: any
  CO2Costs: any
  constants: DatabaseRecord[]
  countries: any

  texts: Record<string, string>
  conversions: ConversionFactorInStore[]
  co2Costs: {
    source: null
    year: number | undefined
    currency: 'USD'
    cost: number
  }[]

  locale: string
  prefixConversions: PrefixRecord[]
}

const DEBUG = true

const CountryPage: React.FC<Props> = (props) => {
  const { page, menu, texts, conversions, constants, prefixConversions } = props
  const apolloClient = useApolloClient()
  const router = useRouter()

  const [gwp, setGwp] = useState('GWP100')
  const country = router.query.country as string

  /**
   * Loads sources
   */
  const { productionSources, projectionSources, reservesSources } =
    useCountrySources({ country })

  /**
   * Downloads and populates arrays with volume, co2e etc
   */
  const { isLoading, production, projection, reserves, getCurrentCO2E } =
    useCountryData({
      texts,
      // @ts-ignore
      projectionSources,
      gwp,
      reservesSourceId: 2,
      projectionSourceId: 2,
      productionSourceId: 2,
      region: '',
      country,
      conversionConstants: conversions,
      // @ts-ignore
      allSources: productionSources,
      constants,
      conversionPrefixes: prefixConversions,
    })

  /**
   * Loads the country's current co2e
   */
  getCurrentCO2E()

  console.log({ production })

  return (
    <div id="page_main">
      <Navbar menu={menu} texts={texts} />
      {country}
    </div>
  )
}

/*
export const getStaticProps: GetStaticProps = async (context) => {
    // ...
  } */
export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await getProducingCountries()
  countries.push({ iso3166: '-' })
  return {
    // @ts-ignore
    paths: countries.flatMap((c) => [
      { params: { country: c.iso3166 } },
      { params: { country: c.iso3166 }, locale: 'fr' },
      { params: { country: c.iso3166 }, locale: 'es' },
    ]),
    fallback: false,
  }
}

// @ts-ignore
export const getStaticProps = (context) => getPageStaticProps(context, `/`)

export default CountryPage
