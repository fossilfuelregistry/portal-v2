import React, {useEffect, useState} from 'react'
import {Box, chakra, Flex, Heading, SimpleGrid} from "@chakra-ui/react"
import {headers} from "lib/staticProps";
import {useRouter} from "next/router";
import {Article, ArticleCategory} from "lib/types";
import Link from "next/link";
import ResponsiveImage from "components/ResponsiveImage";
import Markdown from "components/CMSContent/Markdown";
import ArticleTag from "components/CMSContent/ArticleTag";
import CMSBlock from "./CMSBlock"

interface Block {
	Headline: string,
	Intro: string,
	IncludeCategories: any,
	MaxCount: number
}

interface Props {
	block: Block
}

export default function ArticleSelector({block}: Props) {
	const {Intro, Headline, IncludeCategories, MaxCount} = block
	const [articles, set_articles] = useState<Article[]>([])
	const router = useRouter()

	useEffect(() => {
			const asyncEffect = async () => {
				const api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/articles?locale=${router.locale}&sort[0]=createdAt&populate=deep`, {headers})
				if (!api.ok) throw new Error(`Article fetch failed: ${api.status} ${api.statusText}`)
				const art = (await api.json()).data ?? []
				const cats = (IncludeCategories.data)?.map((c: any) => c.attributes?.Category) ?? []

				const counter = 0
				const filteredArticles: Array<Article> = []

				art.forEach((a: any) => {
					if (cats.length > 0) {
						const aCats = (a.attributes.article_categories?.data)?.map((c: any) => c.attributes?.Category) ?? []
						const intersection = aCats.filter((x: any) => cats.includes(x))
						if (intersection.length === 0) return
					}
					if (counter >= MaxCount) return
					filteredArticles.push(a.attributes)
				})

				set_articles(filteredArticles)
			}

			asyncEffect()
		},
		[IncludeCategories, MaxCount])

	return (
		<CMSBlock>
			<Box w="100%" maxWidth="710px" mb="20px">
				<Heading as="h2" size="2xl">{Headline}</Heading>
				<Markdown>{Intro}</Markdown>
			</Box>
			<SimpleGrid columns={{base: 1, xl: 2}} spacing="20px">
				{articles.map((article: Article) => (
					<Link href={`/article/${article.slug}`} key={article.slug} prefetch={false}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a>
							<Flex minHeight="200px" background="primary.grey2">
								<Box p="32px" flex="1 1 auto">
									<Flex direction="row">
										{article?.article_categories?.data?.map((cat: ArticleCategory) => (<ArticleTag key={cat.id} category={cat}/>))}
									</Flex>
									<h5>{article.Headline}</h5>
								</Box>
								{article.Image?.data &&
									<Box>
										<ResponsiveImage
											src={`${process.env.NEXT_PUBLIC_CMS_URL}${article.Image.data.attributes.url}`}
											height="100%"
											width="180px"
										/>
									</Box>
								}
							</Flex>
						</a>
					</Link>
				))}
			</SimpleGrid>
		</CMSBlock>
	)
}
