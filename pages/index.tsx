import React from 'react'
import type {GetStaticProps, NextPage} from 'next'
import {getPageStaticProps} from 'lib/staticProps'
import {Page} from "lib/types";
import Footer from "components/navigation/Footer";
import PageHead from '../components/CMSContent/PageHead'
import DynamicZone from '../components/CMSContent/DynamicZone'
import Navbar from '../components/navigation/Navbar'

interface Props {
	page: Page,
	menu: Array<any>,
	footer: Array<any>,
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

export const getStaticProps: GetStaticProps = context => getPageStaticProps(context, '/')
