import React from 'react'
import type {GetStaticProps, NextPage} from 'next'
import {getPageStaticProps} from 'lib/staticProps'
import {ConversionFactorInStore, FooterProps, Page} from 'lib/types'
import {DataContextProvider} from "components/DataContext";
import {DatabaseRecord} from "lib/calculations/calculation-constants/types";
import {Country} from "components/Map/types";
import {PrefixRecord} from "lib/calculations/prefix-conversion";
import Footer from 'components/navigation/Footer'
import CookieConsent from "components/navigation/CookieConsent";
import PageHead from '../components/CMSContent/PageHead'
import DynamicZone from '../components/CMSContent/DynamicZone'
import Navbar from '../components/navigation/Navbar'

interface Props {
	page: Page
	menu: Array<any>
	footer: FooterProps
	texts: Record<string, string>
	constants: DatabaseRecord[],
	countries: Country[],
	conversions: ConversionFactorInStore[],
	locale: string,
	prefixConversions: PrefixRecord[]
}

const Home: NextPage<Props> = (props) => {
	const {page, menu, footer} = props
	return (
		<DataContextProvider data={props}>
			<div id="page_main">
				<Navbar menu={menu}/>
				<PageHead page={page}/>
				<DynamicZone content={page.Content}/>
				<Footer footer={footer}/>
			</div>
			<CookieConsent/>
		</DataContextProvider>
	)
}

export default Home

export const getStaticProps: GetStaticProps = (context) =>
	getPageStaticProps(context, '/')
