import React, {useEffect, useState} from 'react'
import ReactMarkdown from "react-markdown"
import {Box, chakra, Flex, Heading, SimpleGrid} from "@chakra-ui/react"
import {headers} from "lib/staticProps";
import {useRouter} from "next/router";
import {Article} from "lib/types";
import Link from "next/link";
import ResponsiveImage from "components/ResponsiveImage";
import CMSBlock from "./CMSBlock"

interface Block {
	Headline: string,
	Intro: string,
	Categories: string,
	MaxCount: number
}

interface Props {
	block: Block
}

export default function ArticleSelector({block}: Props) {
	const {Intro, Headline, Categories, MaxCount} = block
	const [articles, set_articles] = useState<Article[]>([])
	const router = useRouter()

	useEffect(() => {
			const asyncEffect = async () => {
				const api = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/articles?locale=${router.locale}&sort[0]=createdAt&populate=deep`, {headers})
				if (!api.ok) throw new Error(`Article fetch failed: ${api.status} ${api.statusText}`)
				const art = (await api.json()).data ?? []
				const cats = (Categories ?? '').split(',').map(c => c.trim()).filter(c => c.length > 0)

				const counter = 0
				const filteredArticles: Array<Article> = []

				art.forEach((a: any) => {
					if (cats.length > 0) {
						if (!cats.includes(a.Category)) return
					}
					if (counter >= MaxCount) return
					filteredArticles.push(a.attributes)
				})

				set_articles(filteredArticles)
			}
			asyncEffect()
		},
		[Categories, MaxCount])

	return (
		<CMSBlock>
			<Box w="100%" maxWidth="710px" mb="20px">
				<Heading as="h2" size="2xl">{Headline}</Heading>
				<ReactMarkdown skipHtml>{Intro}</ReactMarkdown>
			</Box>
			<SimpleGrid columns={{base: 1, md: 2}} spacing="20px">
				{articles.map((article: Article) => (
					<Link href={`/article/${article.slug}`} key={article.slug}>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a>
							<Flex minHeight="200px" background="primary.grey2">
								<Box p="32px" flex="1 1 auto">
									<chakra.div
										display="inline-block"
										background={`category.${article.Category}`}
										py={1} px={3} mb="20px"
										color="common.white"
										fontWeight={700}
									>
										{article.Category}
									</chakra.div>
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
