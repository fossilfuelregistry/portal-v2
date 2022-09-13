/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useMemo } from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Navbar from 'components/navigation/Navbar'
// @ts-ignore
import { getPageStaticProps, getProducingCountries } from 'lib/staticProps'
import { ConversionFactorInStore, FooterProps, Page } from 'lib/types'
import { PrefixRecord } from 'lib/calculations/prefix-conversion'
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
import ForecastSection from 'components/country/ForecastSection'
import { Box, Heading } from '@chakra-ui/react'
import ReservesLifeSection from 'components/country/ReservesLifeSection'
import ExcessReservesSection from 'components/country/ExcessReservesSection'
import HistoricalSection from 'components/country/HistoricalSection'
import Container from 'components/Container'
import useText from 'lib/useText'
import { DataContextProvider } from 'components/DataContext'
import Info from 'components/Info'
import CountrySnapshot from 'components/country/CountrySnapshot'
import SnapShotStatistic from 'components/SnapShotStatistic'
import LargestProjects from 'components/country/LargestProjects'
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
  const router = useRouter()
  const { translate } = useText()

  const [gwp, setGwp] = useState('GWP100')
  const [country, setCountry] = useState<string>(router.query.country as string)

  DEBUG && console.log('countries', countries)

  const countryName = useMemo(
    () => countries.find((c) => c.iso3166 === country)?.en || '',
    [country]
  )

  /**
   * Loads sources
   */
  const {
    productionSources,
    projectionSources,
    reservesSources,
    preferredProductionSourceId,
    preferredReservesSourceId,
    preferredProjectionSourceId,
  } = useCountrySources({ country })

  DEBUG &&
    console.log('ALL SOURCES FOR COUNTRIES', {
      productionSources,
      projectionSources,
      reservesSources,
    })

  /**
   * Downloads and populates arrays with volume, co2e etc
   */
  const { isLoading, production, projection, reserves, getCurrentCO2E } =
    useCountryData({
      gwp,
      reservesSourceId: preferredReservesSourceId,
      projectionSourceId: preferredProjectionSourceId,
      productionSourceId: preferredProductionSourceId,
      country,
      conversionConstants: conversions,
      constants,
      conversionPrefixes: prefixConversions,
    })

  /**
   * Loads the country's current co2e
   */
  getCurrentCO2E()

  DEBUG && console.log('with real data', country)

  return (
    <DataContextProvider
      data={{
        countryName,
        countries,
        constants,
        texts,
        conversions,
        prefixConversions,
      }}
    >
      <div id="page_main">
        <Navbar menu={menu} />
        <PageHead page={page} />
        <Map country={country} type="country" onChangeCountry={setCountry} />
        <Info />
        {country !== 'global' && (
          <Container>
            <CountrySnapshot country={country} />
            <AnnualEmissions country={country} />
            <EmissionsIntensity country={country} />
            <HistoricProduction country={country} />
            <Box h="1px" background={colors.primary.grey30} mb="80px" />
            <Heading
              as="h3"
              fontSize="32px"
              mb="24px"
              color={colors.primary.richBlue}
            >
              {texts.future_emissions}
            </Heading>
            <ForecastSection country={country} />
            <ReservesLifeSection />
            <ExcessReservesSection />
            <LargestProjects country={country} />
            <Box h="1px" background={colors.primary.grey30} mb="80px" />
            <Heading
              as="h3"
              fontSize="32px"
              mb="24px"
              color={colors.primary.richBlue}
            >
              Historical production and reserves data
            </Heading>
            <HistoricalSection country={country} />
          </Container>
        )}
        <Footer footer={footer} />
      </div>
    </DataContextProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await getProducingCountries()
  countries.push({ iso3166: '-' })
  const countriesPaths = countries.flatMap((c: any) => [
    { params: { country: c.iso3166 } },
    { params: { country: c.iso3166 }, locale: 'fr' },
    { params: { country: c.iso3166 }, locale: 'es' },
  ])

  return {
    // @ts-ignore
    paths: [...countriesPaths, { params: { country: 'global' } }],
    fallback: false,
  }
}

// @ts-ignore
export const getStaticProps = (context) =>
  getPageStaticProps(context, `/country`)

export default CountryPage
