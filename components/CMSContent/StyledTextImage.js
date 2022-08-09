import React from 'react'
import ReactMarkdown from "react-markdown"
import CMSImage from "./CMSImage"
import { Box, Heading, Flex } from "@chakra-ui/react"
import CMSBlock from "./CMSBlock"

export default function StyledTextImage( { block } ) {
	switch( block.Template ) {

		case 'Hero':
			return (
				<Box w={ { base: '100%' } } position="relative">
					<CMSImage image={ block.Image }
							  height={ { base: '250px', sm: '350px', md: '450px', lg: '680px' } }/>
					<Box position="absolute" top={ 0 } left={ 0 } h="100%" w="100%">
						<Box maxWidth="1440px" m="0 auto">
							<Flex
								pl={ { base: '24px', md: '100px' } } pt={ { base: '24px', md: '100px' } }
								maxWidth="750px">
								<Heading as="h1" textStyle="inverse">{ block.Headline }</Heading>
							</Flex>
						</Box>
					</Box>
				</Box>
			)

		default:
			return "StyledTextImage Unsupported Template: " + block.Template
	}
}
