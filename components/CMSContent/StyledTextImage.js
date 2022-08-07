import React from 'react'
import ReactMarkdown from "react-markdown"
import CMSImage from "./CMSImage"
import { Box } from "@chakra-ui/react"

export default function StyledTextImage( { block } ) {

	return (
		<div>
			<Box w={ { base: '100%' } }>
				<CMSImage image={ block.Image } height={ { base: '250px', sm: '350px', md: '450px', lg: '680px' } }/>
			</Box>
			<ReactMarkdown skipHtml>{ 'Text' }</ReactMarkdown>
		</div>
	)
}
