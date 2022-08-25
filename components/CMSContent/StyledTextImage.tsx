import React from 'react'
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Heading, Text} from "@chakra-ui/react"
import {ICMSImage} from "lib/types";
import CMSBlock from "components/CMSContent/CMSBlock";
import CMSImage from "./CMSImage"

interface Block {
	Text: string,
	Headline: string,
	Template: string,
	Image: ICMSImage
}

interface Props {
	block: Block
}

const StyledTextImage = ({block}: Props) => {
	switch (block.Template) {

		case 'Hero':
			return (
				<Box w={{base: '100%'}} position="relative">
					<CMSImage image={block.Image}
							  height={{base: '250px', sm: '350px', md: '450px', lg: '680px'}}/>
					<Box position="absolute" top={0} left={0} h="100%" w="100%">
						<Box maxWidth="1440px" m="0 auto">
							<Flex
								pl={{base: '24px', md: '100px'}} pt={{base: '24px', md: '100px'}}
								maxWidth="750px">
								<Heading as="h1" textStyle="inverse">{block.Headline}</Heading>
							</Flex>
						</Box>
					</Box>
				</Box>
			)

		case 'Centered':
			return (
				<CMSBlock>
					<CMSImage image={block.Image}
							  height={{base: '250px', sm: '350px', md: '450px', lg: '680px'}}/>
				</CMSBlock>
			)

		case 'Text only':
			return (
				<CMSBlock>
					<Text>{block.Text}</Text>
				</CMSBlock>
			)

		default:
			return (
				<CMSBlock>
					<Alert status="warning">
						<AlertIcon/>
						<AlertTitle>Unsupported Template!</AlertTitle>
						<AlertDescription>
							We do not know how to render a StyledTextImage template of type &nbsp;
							<b>{block.Template}</b>.
						</AlertDescription>
					</Alert>
				</CMSBlock>
			)
	}
}

export default StyledTextImage