import React from 'react'
import Head from 'next/head'

const PageHead = ( { page } ) => {
	return (
		<Head>
			<title>{ page?.Title ?? 'Global Fossil Fuel Registry' }</title>
			<meta name="description" content="TBSL"/>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
	)
}

export default PageHead
