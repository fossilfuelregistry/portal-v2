import React from 'react'
import DynamicZone from "../../components/CMSContent/DynamicZone"

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

export { getArticleStaticProps as getStaticProps } from '../../lib/staticProps'

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
