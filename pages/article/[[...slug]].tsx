import React from 'react'
import {Box, Flex, Heading} from "@chakra-ui/react"
import {ArticleCategory, ConversionFactorInStore, FooterProps} from "lib/types"
import {GetStaticPaths, GetStaticProps, NextPage} from "next"
import {getPageStaticProps} from "lib/staticProps";
import {DatabaseRecord} from "lib/calculations/calculation-constants/types";
import {Country} from "components/Map/types";
import {PrefixRecord} from "lib/calculations/prefix-conversion";
import {DataContextProvider} from "components/DataContext";
import DynamicZone from "components/CMSContent/DynamicZone"
import CMSImage from "components/CMSContent/CMSImage"
import ArticleTag from "components/CMSContent/ArticleTag"
import Navbar from "components/navigation/Navbar"
import Footer from "components/navigation/Footer"

const headers = {
	Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}`
}

interface Props {
	page: any,
	menu: Array<any>,
	footer: FooterProps,
	texts: Record<string, string>
	constants: DatabaseRecord[],
	countries: Country[],
	conversions: ConversionFactorInStore[],
	locale: string,
	prefixConversions: PrefixRecord[]
}

const Article: NextPage<Props> = (props) => {
	const {page, menu, texts, footer} = props

	if (!page) return null
	const article = page

	const categories = article.article_categories?.data

	return (
		<DataContextProvider data={props}>
			<div id="page_main">
				<Navbar menu={menu}/>

				<Box w={{base: '100%'}} position="relative">
					<CMSImage image={article.Image} gradient
							  height={{base: '250px', sm: '350px', md: '450px', lg: '680px'}}/>
					<Box position="absolute" top={0} left={0} h="100%" w="100%">
						<Box maxWidth="1440px" m="0 auto">
							<Flex
								pl={{base: '24px', md: '100px'}}
								pt={{base: '24px', md: '100px'}}
								maxWidth="750px"
								direction="column"
							>
								<Flex direction="row" justifyContent="center">
									{categories.map((cat: ArticleCategory) => (<ArticleTag key={cat.id} category={cat}/>))}
								</Flex>
								<Heading as="h1" textStyle="inverse">{article.Headline}</Heading>
							</Flex>
						</Box>
					</Box>
				</Box>

				<DynamicZone content={article.Content}/>

				<style jsx>{`
                  .cms-page {
                    padding: 40px
                  }
				`}</style>

				<Footer footer={footer}/>
			</div>
		</DataContextProvider>
	)
}

export default Article

export const getStaticProps: GetStaticProps = context => getPageStaticProps(context, '/article')

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/Articles`, {headers})
		if (!api.ok) throw new Error(`Pages fetch failed: ${api.status} ${api.statusText}`)
		const pages = await api.json()
		return {
			paths: pages?.data
				.filter((p: any) => p.attributes?.slug?.length > 0)
				.map((p: any) => ({params: {slug: p.attributes?.slug.split('/')}})) ?? [],
			fallback: 'blocking'
		}
	} catch (error) {
		console.log(error)
		return { paths: [], fallback: 'blocking'}
	}
}
