import React from 'react'
import Head from 'next/head'
import {Page} from "lib/types";

interface Props {
	page: Page
}

const PageHead = ({page}: Props) => (
		<Head>
			<title>{page?.Title ?? 'Global Fossil Fuel Registry'}</title>
			<meta name="description" content="TBSL"/>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
	)

export default PageHead
