import React from 'react'
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, Heading, Text} from "@chakra-ui/react"
import Link from "next/link";
import {ICMSImage} from "lib/types";
import CMSBlock from "components/CMSContent/CMSBlock";
import CMSImage from "./CMSImage"

interface Block {
	Text: string,
	Headline: string,
	Template: string,
	Buttons: any[],
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
						<Box maxWidth="1440px" m="0 auto" h="100%">
							<Flex
								direction="column"
								h="100%"
								justifyContent="space-between"
								pl={{base: '24px', md: '100px'}} py={{base: '24px', md: '160px'}}
								maxWidth="750px">
								<Heading as="h1" textStyle="inverse">{block.Headline}</Heading>
								{block.Buttons?.map((b: any) => (
									<Link href={b.URL}>
										{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a>
											<Button variant="inverse">{b.Text}</Button>
										</a>
									</Link>
								))}
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