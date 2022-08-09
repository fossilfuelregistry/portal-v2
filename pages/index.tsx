import React from 'react'
import type {NextPage, GetStaticProps} from 'next'
import PageHead from '../components/CMSContent/PageHead'
import {getPageStaticProps} from 'lib/staticProps'
import DynamicZone from '../components/CMSContent/DynamicZone'
import Navbar from '../components/navigation/Navbar'
import {Page} from "lib/types";

interface Props {
	page: Page,
	menu: Array<any>,
	texts: Array<any>
}

const Home: NextPage<Props> = (props) => {
	const {page, menu, texts} = props
	return (
		<div id="page_main">
			<Navbar menu={menu} texts={texts}/>
			<PageHead page={page}/>
			<DynamicZone content={page.Content}/>
		</div>
	)
}

export default Home

export const getStaticProps: GetStaticProps = context => getPageStaticProps(context, '/')
