/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react'
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
import PageHead from 'components/CMSContent/PageHead'
import Map from 'components/Map/Map'
import AnnualEmissions from 'components/country/AnnualEmissions'
import HistoricProduction from 'components/country/HistoricProduction'
import EmissionsIntensity from 'components/country/EmissionsIntensity'
import Footer from 'components/navigation/Footer'
import { Country } from 'components/Map/types'
import { FooterProps, Page } from 'lib/types'
import ForecastSection from 'components/country/ForecastSection'
import { Box, Heading } from '@chakra-ui/react'
import ReservesLifeSection from 'components/country/ReservesLifeSection'
import ExcessReservesSection from 'components/country/ExcessReservesSection'
import HistoricalSection from 'components/country/HistoricalSection'
import Container from 'components/Container'
import { colors } from '../../assets/theme'

export type Props = {
  sources: any
  CO2Costs: any
  constants: DatabaseRecord[]
  countries: Country[]
  page: Page
  menu: Array<any>
  footer: FooterProps
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

const DEBUG = false

const CountryPage: React.FC<Props> = (props) => {
  const {
    page,
    menu,
    footer,
    texts,
    conversions,
    constants,
    prefixConversions,
    countries,
  } = props
  DEBUG && console.log('countries', countries)
  const apolloClient = useApolloClient()
  const router = useRouter()

  const [gwp, setGwp] = useState('GWP100')
  const [country, setCountry] = useState<string>(router.query.country as string)

  /**
   * Loads sources
   */
  const { productionSources, projectionSources, reservesSources } =
    useCountrySources({ country })

  DEBUG && console.log('productionSources', productionSources)

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
      country: '',
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

  console.log('with real data', country)

  return (
    <div id="page_main">
      <Navbar menu={menu} texts={texts} />
      <PageHead page={page} />
      <Map
        country={country}
        countries={countries}
        type="country"
        onChangeCountry={setCountry}
      />
      {country !== 'global' && (
        <Container>
          <AnnualEmissions
            country={country}
            constants={constants}
            texts={texts}
            conversions={conversions}
            prefixConversions={prefixConversions}
          />
          <EmissionsIntensity
            country={country}
            constants={constants}
            texts={texts}
            conversions={conversions}
            prefixConversions={prefixConversions}
          />
          <HistoricProduction
            country={country}
            constants={constants}
            texts={texts}
            conversions={conversions}
            prefixConversions={prefixConversions}
          />
          <Box h="1px" background={colors.primary.grey30} mb="80px" />
          <Heading
            as="h3"
            fontSize="32px"
            mb="24px"
            color={colors.primary.richBlue}
          >
            Emissions from Fossil Fuels produced under various scenarios
          </Heading>
          <ForecastSection />
          <ReservesLifeSection />
          <ExcessReservesSection />
          <Box h="1px" background={colors.primary.grey30} mb="80px" />
          <Heading
            as="h3"
            fontSize="32px"
            mb="24px"
            color={colors.primary.richBlue}
          >
            Historical production and reserves data
          </Heading>
          <HistoricalSection
            country={country}
            constants={constants}
            texts={texts}
            conversions={conversions}
            prefixConversions={prefixConversions}
          />
        </Container>
      )}
      <Footer footer={footer} texts={texts} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await getProducingCountries()
  countries.push({ iso3166: '-' })
  console.log('countries')
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
export const getStaticProps = (context) =>
  getPageStaticProps(context, `/country`)

export default CountryPage
