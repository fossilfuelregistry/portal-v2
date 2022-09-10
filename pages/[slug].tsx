import React from 'react'
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {DatabaseRecord} from "lib/calculations/calculation-constants/types";
import {Country} from "components/Map/types";
import {PrefixRecord} from "lib/calculations/prefix-conversion";
import {getPageStaticProps, headers} from 'lib/staticProps'
import {ConversionFactorInStore, FooterProps, Page} from "lib/types";
import {DataContextProvider} from "components/DataContext";
import Footer from "components/navigation/Footer";
import PageHead from '../components/CMSContent/PageHead'
import DynamicZone from '../components/CMSContent/DynamicZone'
import Navbar from '../components/navigation/Navbar'

interface Props {
	page: Page,
	menu: Array<any>,
	footer: FooterProps,
	texts: Record<string, string>,
	sources: any,
	constants: DatabaseRecord[],
	countries: Country[],
	conversions: ConversionFactorInStore[],
	locale: string,
	prefixConversions: PrefixRecord[]
}

const Home: NextPage<Props> = (props) => {
	const {page, menu, texts, footer} = props
	return (
		<DataContextProvider data={props}>
			<div id="page_main">
				<Navbar menu={menu}/>
				<PageHead page={page}/>
				<DynamicZone content={page.Content}/>
				<Footer footer={footer}/>
			</div>
		</DataContextProvider>
	)
}

export default Home

export const getStaticProps: GetStaticProps = context => getPageStaticProps(context)

export const getStaticPaths: GetStaticPaths = async () => {
	const api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages`, {headers})
	if (!api.ok) throw new Error(`Page fetch failed: ${api.status} ${api.statusText}`)
	const pages = (await api.json()).data
	const paths = pages
		.filter((p: any) => p.attributes.slug !== '/')
		.map((p: any) => ({params: {slug: p.attributes.slug}}))
	return {
		paths,
		fallback: 'blocking'
	}
}
