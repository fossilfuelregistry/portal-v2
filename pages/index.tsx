import React from 'react'
import type {NextPage} from 'next'
import PageHead from '../components/CMSContent/PageHead'
import {getPageStaticProps} from '../lib/staticProps'
import DynamicZone from "../components/CMSContent/DynamicZone"
import Navbar from "../components/navigation/Navbar"

const Home: NextPage = (props) => {
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

export const getStaticProps = context => getPageStaticProps(context, '/')
