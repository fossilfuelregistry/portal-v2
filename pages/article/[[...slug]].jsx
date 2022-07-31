import React from 'react'
import DynamicZone from "../../components/CMSContent/DynamicZone"
import { getCommonStaticProps } from "../../lib/getCommonStaticProps"

const headers = {
	Authorization: `Bearer ${ process.env.NEXT_PUBLIC_CMS_TOKEN }`
}

export default function Page( props ) {
	const { page } = props
	if( !page ) return null

	return (
		<div className="cms-page">

			<h1>{ page.attributes?.Headline }</h1>

			<DynamicZone content={ page.attributes?.Content }/>

			<style jsx>{ `
              .cms-page {
                padding: 40px
              }
			` }</style>
		</div>
	)
}

export async function getStaticProps( context ) {
	const { slug } = context.params

	let api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/articles`, { headers } )
	if( !api.ok ) throw new Error( `Pages fetch failed: ${ api.status } ${ api.statusText }` )
	const pages = await api.json()

	const p = pages.data?.find( pg => pg.attributes?.slug === slug.join( '/' ) )
	if( !p ) return { notFound: true }

	api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/articles/${ p.id }?populate=*`, { headers } )

	if( !api.ok ) {
		if( api.status === 404 ) return { notFound: true }
		throw new Error( `Articles fetch failed: ${ api.status } ${ api.statusText }` )
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

export async function getStaticPaths() {
	try {
		const api = await fetch( `${ process.env.NEXT_PUBLIC_CMS_URL }/api/Articles`, { headers } )
		if( !api.ok ) throw new Error( `Pages fetch failed: ${ api.status } ${ api.statusText }` )
		const pages = await api.json()
		const result = {
			paths: pages?.data
			.filter( p => p.attributes?.slug?.length > 0 )
			.map( p => ( { params: { slug: p.attributes?.slug.split( '/' ) } } ) ) ?? [],
			fallback: true
		}
		// console.log( pages )
		// console.log( JSON.stringify(result) )
		return result
	}
	catch( error ) {
		console.log( error )
		return { paths: [], fallback: false }
	}
}
