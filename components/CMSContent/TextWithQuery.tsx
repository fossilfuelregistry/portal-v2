import React, {useEffect, useState} from 'react'
import {Box, Heading} from "@chakra-ui/react"
import Markdown from "components/CMSContent/Markdown";
import useTextInjectQueryResult from "./useTextInjectQueryResult"
import CMSBlock from "./CMSBlock"

interface Block {
	Text: string,
	Headline: string
}

interface Props {
	block: Block
}

export default function TextWithQuery({block}: Props) {
	const {Text, Headline} = block
	const injectQueryResult = useTextInjectQueryResult()
	const [result, set_result] = useState(Text)

	useEffect(() => {
			const asyncEffect = async () => {
				set_result(await injectQueryResult(Text))
			}
			asyncEffect()
		},
		[Text])

	return (
		<CMSBlock>
			<Box w="100%" maxWidth="710px" my={{base: '24px', md: '72px', lg: '120px'}}>
				<Heading as="h2" size="2xl" mb="32px">{Headline}</Heading>
				<Markdown>
					{result}
				</Markdown>
			</Box>
		</CMSBlock>
	)
}
