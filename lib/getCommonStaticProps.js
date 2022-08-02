import {
  GQL_conversions,
  GQL_productionCountries,
  GQL_calculationConstants,
  GQL_prefixConversions,
  GQL_sources,
  SQL_co2costs,
} from 'queries/general'
import NodeCache from 'node-cache'
import settings from 'settings'
import { captureException } from '@sentry/nextjs'

const myCache = new NodeCache()

function getFullFuelType(datapoint) {
  let fullFuelType = datapoint.fossilFuelType
  if (datapoint.fossilFuelType && datapoint.fossilFuelType?.length > 0)
    fullFuelType =
      datapoint.fossilFuelType +
      (datapoint.subtype && datapoint.subtype?.length > 0
        ? `${settings.fuelTypeSeparator}${datapoint.subtype?.toLowerCase()}`
        : '')
  // console.info( 'fullFuelType', fullFuelType )
  return fullFuelType
}

export async function getStandaloneApolloClient() {
  const { ApolloClient, InMemoryCache, createHttpLink } = await import(
    '@apollo/client'
  )
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    }),
    cache: new InMemoryCache(),
  })
  return client
}

async function getI18nTexts(locale) {
  if (myCache.get(locale)) return myCache.get(locale)

  const formData = new URLSearchParams()
  formData.append('api_token', process.env.POEDITOR_API_TOKEN)
  formData.append('id', process.env.POEDITOR_PROJECT_ID)
  formData.append('language', locale)

  const res = await fetch(`https://api.poeditor.com/v2/terms/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
  const data = await res.json()
  const fullTerms = data?.result?.terms ?? []
  const terms = {}
  fullTerms.forEach((term) => (terms[term.term] = term.translation.content))

  myCache.set(locale, terms, 300)
  return terms
}

async function getConversions() {
  if (myCache.get('conversions')) return myCache.get('conversions')

  const client = await getStandaloneApolloClient()
  const q = await client.query({ query: GQL_conversions })
  const constants = q?.data?.conversionConstants?.nodes ?? []
  const conversions = constants.map((c) => {
    const _c = { ...c }
    _c.fullFuelType = getFullFuelType(c)
    delete _c.__typename
    return _c
  })
  myCache.set('conversions', conversions, 300)
  return conversions
}

async function getCalculationConstants() {
  if (myCache.get('calculationConstants'))
    return myCache.get('calculationConstants')
  const client = await getStandaloneApolloClient()
  const q = await client.query({ query: GQL_calculationConstants })
  const constants = q?.data?.calculationConstants?.nodes ?? []
  const conversions = constants
  myCache.set('calculationConstants', conversions, 300)
  return conversions
}

async function getPrefixConversions() {
  if (myCache.get('prefixConversions')) return myCache.get('prefixConversions')
  const client = await getStandaloneApolloClient()
  const q = await client.query({ query: GQL_prefixConversions })
  const constants = q?.data?.prefixConversions?.nodes ?? []
  const conversions = constants
  myCache.set('prefixConversions', conversions, 300)
  return conversions
}

export async function getProducingCountries() {
  if (myCache.get('countries')) return myCache.get('countries')

  const client = await getStandaloneApolloClient()
  const q = await client.query({ query: GQL_productionCountries })
  const _countries = q?.data?.getProducingIso3166?.nodes ?? []
  const countries = _countries.map((c) => {
    const _c = { ...c }
    delete _c.__typename
    return _c
  })
  myCache.set('countries', countries, 300)
  return countries
}

async function getSources() {
  if (myCache.get('sources')) return myCache.get('sources')

  const client = await getStandaloneApolloClient()
  const q = await client.query({ query: GQL_sources })
  const _sources = q?.data?.sources?.nodes ?? []
  const sources = _sources.map((c) => {
    const _c = { ...c }
    delete _c.__typename
    return _c
  })
  myCache.set('sources', sources, 300)
  return sources
}

async function getCO2Costs() {
  if (myCache.get('co2Costs')) return myCache.get('co2Costs')

  const client = await getStandaloneApolloClient()
  const q = await client.query({ query: SQL_co2costs })
  const _co2Costs = q?.data?.co2Costs?.nodes ?? []
  const co2Costs = _co2Costs.map((c) => {
    const _c = { ...c }
    delete _c.__typename
    return _c
  })
  myCache.set('co2Costs', co2Costs, 300)
  return co2Costs
}

export const getCommonStaticProps = async (context) => {
  try {
    const texts = await getI18nTexts(context.locale)
    const conversions = await getConversions()
    const sources = await getSources()
    const countries = await getProducingCountries()
    const { locale } = context
    const CO2Costs = await getCO2Costs()
    const constants = await getCalculationConstants()
    const prefixConversions = await getPrefixConversions()

    return {
      props: {
        texts,
        conversions,
        sources,
        locale,
        CO2Costs,
        constants,
        prefixConversions,
        countries,
      },
    }
  } catch (e) {
    console.log('getCommonStaticProps', e.message)
    captureException(e)
    return {}
  }
}
