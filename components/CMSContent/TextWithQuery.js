import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown"
import useTextInjectQueryResult from "./useTextInjectQueryResult"
import CMSBlock from "./CMSBlock"
import { Box, Heading } from "@chakra-ui/react"

export default function TextWithQuery( { block } ) {
	const { Text, Headline } = block
	const injectQueryResult = useTextInjectQueryResult()
	const [ result, set_result ] = useState( Text )

	useEffect( () => {
			const asyncEffect = async() => {
				set_result( await injectQueryResult( Text ) )
			}
			asyncEffect()
		},
		[ Text ] )

	return (
		<CMSBlock>
			<Box w="100%" maxWidth="710px">
				<Heading as="h2" size="2xl">{Headline}</Heading>
				<ReactMarkdown skipHtml>{ result }</ReactMarkdown>
			</Box>
		</CMSBlock>
	)
}
