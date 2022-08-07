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

const backendCache = new NodeCache()

const headers = {
	Authorization: `Bearer ${ process.env.NEXT_PUBLIC_CMS_TOKEN }`
}

function getFullFuelType( datapoint ) {
	let fullFuelType = datapoint.fossilFuelType
	if( datapoint.fossilFuelType && datapoint.fossilFuelType?.length > 0 )
		fullFuelType =
			datapoint.fossilFuelType +
			( datapoint.subtype && datapoint.subtype?.length > 0
				? `${ settings.fuelTypeSeparator }${ datapoint.subtype?.toLowerCase() }`
				: '' )
	// console.info( 'fullFuelType', fullFuelType )
	return fullFuelType
}

export async function getStandaloneApolloClient() {
	const { ApolloClient, InMemoryCache, createHttpLink } = await import(
		'@apollo/client'
		)
	const client = new ApolloClient( {
		ssrMode: true,
		link: createHttpLink( {
			uri: `${ process.env.NEXT_PUBLIC_BACKEND_URL }/graphql`,
		} ),
		cache: new InMemoryCache(),
	} )
	return client
}

async function getI18nTexts( locale ) {
	if( backendCache.get( locale ) ) return backendCache.get( locale )

	const formData = new URLSearchParams()
	formData.append( 'api_token', process.env.POEDITOR_API_TOKEN )
	formData.append( 'id', process.env.POEDITOR_PROJECT_ID )
	formData.append( 'language', locale )

	const res = await fetch( `https://api.poeditor.com/v2/terms/list`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: formData,
	} )
	const data = await res.json()
	const fullTerms = data?.result?.terms ?? []
	const terms = {}
	fullTerms.forEach( ( term ) => ( terms[ term.term ] = term.translation.content ) )

	backendCache.set( locale, terms, 300 )
	return terms
}

async function getConversions() {
	if( backendCache.get( 'conversions' ) ) return backendCache.get( 'conversions' )

	const client = await getStandaloneApolloClient()
	const q = await client.query( { query: GQL_conversions } )
	const constants = q?.data?.conversionConstants?.nodes ?? []
	const conversions = constants.map( ( c ) => {
		const _c = { ...c }
		_c.fullFuelType = getFullFuelType( c )
		delete _c.__typename
		return _c
	} )
	backendCache.set( 'conversions', conversions, 300 )
	return conversions
}

async function getCalculationConstants() {
	if( backendCache.get( 'calculationConstants' ) )
		return backendCache.get( 'calculationConstants' )
	const client = await getStandaloneApolloClient()
	const q = await client.query( { query: GQL_calculationConstants } )
	const constants = q?.data?.calculationConstants?.nodes ?? []
	const conversions = constants
	backendCache.set( 'calculationConstants', conversions, 300 )
	return conversions
}

async function getPrefixConversions() {
	if( backendCache.get( 'prefixConversions' ) ) return backendCache.get( 'prefixConversions' )
	const client = await getStandaloneApolloClient()
	const q = await client.query( { query: GQL_prefixConversions } )
	const constants = q?.data?.prefixConversions?.nodes ?? []
	const conversions = constants
	backendCache.set( 'prefixConversions', conversions, 300 )
	return conversions
}

export async function getProducingCountries() {
	if( backendCache.get( 'countries' ) ) return backendCache.get( 'countries' )

	const client = await getStandaloneApolloClient()
	const q = await client.query( { query: GQL_productionCountries } )
	const _countries = q?.data?.getProducingIso3166?.nodes ?? []
	const countries = _countries.map( ( c ) => {
		const _c = { ...c }
		delete _c.__typename
		return _c
	} )
	backendCache.set( 'countries', countries, 300 )
	return countries
}

async function getSources() {
	if( backendCache.get( 'sources' ) ) return backendCache.get( 'sources' )

	const client = await getStandaloneApolloClient()
	const q = await client.query( { query: GQL_sources } )
	const _sources = q?.data?.sources?.nodes ?? []
	const sources = _sources.map( ( c ) => {
		const _c = { ...c }
		delete _c.__typename
		return _c
	} )
	backendCache.set( 'sources', sources, 300 )
	return sources
}

async function getCO2Costs() {
	if( backendCache.get( 'co2Costs' ) ) return backendCache.get( 'co2Costs' )

	const client = await getStandaloneApolloClient()
	const q = await client.query( { query: SQL_co2costs } )
	const _co2Costs = q?.data?.co2Costs?.nodes ?? []
	const co2Costs = _co2Costs.map( ( c ) => {
		const _c = { ...c }
		delete _c.__typename
		return _c
	} )
	backendCache.set( 'co2Costs', co2Costs, 300 )
	return co2Costs
}

export const getCommonStaticProps = async( context ) => {
	try {
		const texts = await getI18nTexts( context.locale )
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
	}
	catch( e ) {
		console.log( 'staticProps', e.message )
		captureException( e )
		return {}
	}
}

export async function getArticleStaticProps( context ) {
	const { slug } = context.params

	let api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/articles`, { headers } )
	if( !api.ok ) throw new Error( `Article fetch failed: ${ api.status } ${ api.statusText }` )
	const pages = await api.json()

	const p = pages.data?.find( pg => pg.attributes?.slug === slug.join( '/' ) )
	if( !p ) return { notFound: true }

	api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/articles/${ p.id }?populate=*`, { headers } )

	if( !api.ok ) {
		if( api.status === 404 ) return { notFound: true }
		throw new Error( `Article fetch failed: ${ api.status } ${ api.statusText }` )
	}

	const response = await api.json()
	const page = response.data
	if( !page ) return { notFound: true }

	const common = await getCommonStaticProps( context )
	common.props.page = page
	return {
		...common,
		revalidate: 60
	}
}

export async function getPageStaticProps( context, staticSlug ) {
	const slug = staticSlug ?? context.params?.slug

	let api
	let pages = backendCache.get( 'pages' )
	if( !pages ) {
		api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/pages`, { headers } )
		if( !api.ok ) throw new Error( `Page fetch failed: ${ api.status } ${ api.statusText }` )
		pages = await api.json()
		backendCache.set( 'pages', pages, 300 )
	}

	const p = pages.data?.find( pg => pg.attributes?.slug === slug )
	if( !p ) return { notFound: true }

	api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/pages/${ p.id }?populate[Content][populate]=*`, { headers } )

	if( !api.ok ) {
		if( api.status === 404 ) return { notFound: true }
		throw new Error( `Page fetch failed: ${ api.status } ${ api.statusText }` )
	}

	const response = await api.json()
	const page = response.data
	if( !page ) return { notFound: true }

	let menu = backendCache.get( 'menu' )
	if( !menu ) {
		api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/menu?populate[Items][populate]=*`, { headers } )

		if( !api.ok ) {
			throw new Error( `Menu fetch failed: ${ api.status } ${ api.statusText }` )
		}
		const items = await api.json()
		menu = items?.data?.attributes?.Items
		backendCache.set( 'menu', menu, 300 )
	}

	let footer = backendCache.get( 'footer' )
	if( !footer ) {
		api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/footer?populate[Items][populate]=*`, { headers } )

		if( !api.ok ) {
			throw new Error( `Footer fetch failed: ${ api.status } ${ api.statusText }` )
		}
		const items = await api.json()
		footer = items?.data?.attributes?.Items
		backendCache.set( 'footer', footer, 300 )
	}

	const common = await getCommonStaticProps( context )
	common.props.page = page.attributes
	common.props.menu = menu
	common.props.footer = footer

	return {
		...common,
		revalidate: 60
	}
}

