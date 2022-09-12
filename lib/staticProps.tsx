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
import {captureException} from '@sentry/nextjs'
import {ICMSPage, Datapoint} from "lib/types";
import {GetStaticPropsContext} from "next";
import {PHASE_PRODUCTION_BUILD} from 'next/constants';

const backendCache = new NodeCache()

const revalidate = 60
const cacheTTL = 300

export const headers = {
	Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`
}

function getFullFuelType(datapoint: Datapoint) {
	let fullFuelType: string = datapoint.fossilFuelType
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
	const {ApolloClient, InMemoryCache, createHttpLink} = await import(
		'@apollo/client'
		)
	return new ApolloClient({
		ssrMode: true,
		link: createHttpLink({
			uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
		}),
		cache: new InMemoryCache(),
	})
}

async function getI18nTexts(locale: string) {
	if (backendCache.get(locale)) return backendCache.get(locale)

	const formData = new URLSearchParams()
	formData.append('api_token', process.env.POEDITOR_API_TOKEN ?? '')
	formData.append('id', process.env.POEDITOR_PROJECT_ID ?? '')
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
	const terms: Record<string, string> = {}
	fullTerms.forEach((term: { term: string, translation: { content: string } }) => {
		terms[term.term] = term.translation.content
	})

	backendCache.set(locale, terms, 300)
	return terms
}

async function getConversions() {
	if (backendCache.get('conversions')) return backendCache.get('conversions')

	const client = await getStandaloneApolloClient()
	const q = await client.query({query: GQL_conversions})
	const constants = q?.data?.conversionConstants?.nodes ?? []
	const conversions = constants.map((c: any) => {
		const cc = {...c}
		cc.fullFuelType = getFullFuelType(c)
		delete cc.__typename
		return cc
	})
	backendCache.set('conversions', conversions, 300)
	return conversions
}

async function getCalculationConstants() {
	if (backendCache.get('calculationConstants'))
		return backendCache.get('calculationConstants')
	const client = await getStandaloneApolloClient()
	const q = await client.query({query: GQL_calculationConstants})
	const conversions = q?.data?.calculationConstants?.nodes ?? []
	backendCache.set('calculationConstants', conversions, 300)
	return conversions
}

async function getPrefixConversions() {
	if (backendCache.get('prefixConversions')) return backendCache.get('prefixConversions')
	const client = await getStandaloneApolloClient()
	const q = await client.query({query: GQL_prefixConversions})
	const conversions = q?.data?.prefixConversions?.nodes ?? []
	backendCache.set('prefixConversions', conversions, 300)
	return conversions
}

export async function getProducingCountries() {
	if (backendCache.get('countries')) return backendCache.get('countries')

	const client = await getStandaloneApolloClient()
	const q = await client.query({query: GQL_productionCountries})
	const countr = q?.data?.getProducingIso3166?.nodes ?? []
	const countries = countr.map((c: any) => {
		const cc = {...c}
		delete cc.__typename
		return cc
	})
	backendCache.set('countries', countries, 300)
	return countries
}

async function getSources() {
	if (backendCache.get('sources')) return backendCache.get('sources')

	const client = await getStandaloneApolloClient()
	const q = await client.query({query: GQL_sources})
	const srcs = q?.data?.sources?.nodes ?? []
	const sources = srcs.map((c: any) => {
		const cc = {...c}
		delete cc.__typename
		return cc
	})
	backendCache.set('sources', sources, 300)
	return sources
}

async function getCO2Costs() {
	if (backendCache.get('co2Costs')) return backendCache.get('co2Costs')

	const client = await getStandaloneApolloClient()
	const q = await client.query({query: SQL_co2costs})
	const co2Cost = q?.data?.co2Costs?.nodes ?? []
	const co2Costs = co2Cost.map((c: any) => {
		const cc = {...c}
		delete cc.__typename
		return cc
	})
	backendCache.set('co2Costs', co2Costs, 300)
	return co2Costs
}

type GetCommonStaticProps = (context: GetStaticPropsContext) => Promise<any>

export const getCommonStaticProps: GetCommonStaticProps = async (context: GetStaticPropsContext) => {
	try {
		const texts = await getI18nTexts(context.locale ?? '')
		const conversions = await getConversions()
		const sources = await getSources()
		const countries = await getProducingCountries()
		const {locale} = context
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
	} catch (e: any) {
		console.log('staticProps', e.message)
		captureException(e)
		return {}
	}
}

type GetPageStaticProps = (context: GetStaticPropsContext, staticSlug?: string) => Promise<any>

export const getPageStaticProps: GetPageStaticProps = async (context, staticSlug) => {
	let slug = context.params?.slug
	const {locale} = context

	let api
	let endpoint = 'pages'
	if (staticSlug === '/') slug = '/'
	if (staticSlug === '/country') slug = '/'
	if (staticSlug === '/article') {
		endpoint = 'articles'
		slug = context.params?.slug?.[0]
	}

	let pages: ICMSPage[] | undefined = backendCache.get(`pages-${locale}`)

	console.log('getPageStaticProps', process.env.NEXT_PHASE, '===', PHASE_PRODUCTION_BUILD)

	if (!pages || process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
		console.log('getPageStaticProps', 'FETCH', context?.params?.slug, staticSlug )
		api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/${endpoint}?locale=${context.locale}`, {headers})
		if (!api.ok) throw new Error(`Page fetch failed: ${api.status} ${api.statusText}`)
		pages = (await api.json()).data
		backendCache.set(`pages-${locale}`, pages, cacheTTL)
	} else {
		console.log('getPageStaticProps', 'CACHED' )
	}

	const p = pages?.find(pg => pg.attributes?.slug === slug)
	if (!p) return {notFound: true, revalidate}

	api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/${endpoint}/${p.id}?locale=${context.locale}&populate=deep`, {headers})

	if (!api.ok) {
		if (api.status === 404) return {notFound: true}
		throw new Error(`Page fetch failed: ${api.status} ${api.statusText}`)
	}

	const response = await api.json()
	const page = response.data

	if (!page) return{notFound: true, revalidate}

	let menu = backendCache.get('menu')
	if (!menu) {
		api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/menu?populate=deep`, {headers})

		if (!api.ok) {
			throw new Error(`Menu fetch failed: ${api.status} ${api.statusText}`)
		}
		const items = await api.json()
		menu = items?.data?.attributes?.Items
		backendCache.set('menu', menu, cacheTTL)
	}

	let footer = backendCache.get('footer')
	if (!footer) {
		api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/footer?populate=deep`, {headers})

		if (!api.ok) {
			throw new Error(`Footer fetch failed: ${api.status} ${api.statusText}`)
		}
		const items = await api.json()
		footer = items?.data?.attributes
		backendCache.set('footer', footer, cacheTTL)
	}

	const common = await getCommonStaticProps(context)
	common.props.page = page.attributes
	common.props.menu = menu
	common.props.footer = footer

	return {
		...common,
		revalidate
	}
}
