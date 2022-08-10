import React from 'react'
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {getPageStaticProps, headers} from 'lib/staticProps'
import {FooterProps, Page} from "lib/types";
import Footer from "components/navigation/Footer";
import PageHead from '../components/CMSContent/PageHead'
import DynamicZone from '../components/CMSContent/DynamicZone'
import Navbar from '../components/navigation/Navbar'

interface Props {
	page: Page,
	menu: Array<any>,
	footer: FooterProps,
	texts: Array<any>
}

const Home: NextPage<Props> = (props) => {
	const {page, menu, texts, footer} = props
	return (
		<div id="page_main">
			<Navbar menu={menu} texts={texts}/>
			<PageHead page={page}/>
			<DynamicZone content={page.Content}/>
			<Footer footer={footer} texts={texts}/>
		</div>
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
		fallback: false
	}
}
