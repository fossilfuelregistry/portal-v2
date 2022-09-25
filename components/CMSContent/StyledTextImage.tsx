import React from 'react'
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Flex,
	Heading,
	SimpleGrid,
	Text
} from "@chakra-ui/react"
import Link from "next/link";
import {ICMSImage} from "lib/types";
import CMSBlock from "components/CMSContent/CMSBlock";
import CMSImage from "./CMSImage"

interface Block {
	id: string
	Text: string
	Headline: string
	Template: string
	Buttons: any[]
	Image: ICMSImage
}

interface Props {
	block: Block
}

let dimensions;
let pl

const StyledTextImage = ({block}: Props) => {
	switch (block.Template) {

		case 'Hero':
		case 'Hero Slim':
			dimensions = {base: '250px', sm: '350px', md: '450px', lg: '680px'}
			pl = {base: '0', md: '0'}
			if (block.Template === 'Hero Slim') {
				dimensions = {base: '180px', sm: '200px', md: '280px', lg: '320px'}
				pl = {base: '24px', md: '100px'}
			}

			return (
				<Box w={{base: '100%'}} position="relative">
					<CMSImage image={block.Image}
							  height={dimensions}/>
					<Box position="absolute" top={0} left={0} h="100%" w="100%">
						<Box maxWidth="1440px" m="0 auto" h="100%">
							<Flex
								direction="column"
								h="100%"
								justifyContent="space-between"
								pl={{base: '24px', md: '100px'}} py={{base: '24px', md: '160px'}}
								maxWidth="750px"
							>
								<Text as="h1"
									  textStyle="inverse"
									  mb="24px"
									  pl={pl}
								>
									{block.Headline}
								</Text>
								{block.Buttons?.map((b: any) => (
									<Link href={b.URL} prefetch={false} key={b.id} passHref>
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

		case 'Hero 4col':
			return (
				<Box w={{base: '100%'}} position="relative" bgColor="primary.richBlue">
					<Box position="absolute">
						<CMSImage
							image={block.Image}
							height={{base: '180px', sm: '200px', md: '280px', lg: '320px'}}
						/>
					</Box>
					<Box w="100%" pb={{base: '24px'}}>
						<Flex direction="column" justifyContent="center" h="100%">
							<Box maxWidth="1440px" m="0 auto" w="100%">
								<Text as="h1"
									  textStyle="inverse"
									  mb="24px"
									  pl={{base: '24px', md: '100px'}}
								>
									{block.Headline}
								</Text>
								<SimpleGrid
									columns={{base: 1, md: 2, lg: 4}}
									spacing={6}
									mx={{base: '24px', lg: 0}}
								>
									{block.Buttons?.map((b: any) => (
										<Box
											background="rgba(127,127,127,0.7)"
											borderRadius="8px"
											p={{base: '12px', md: '24px', lg: '40px'}}
										>
											<Link href={b.URL} prefetch={false} key={b.id} passHref>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a>
													<Button variant="inverse" size={{base: 'sm', md: 'md', lg: 'lg'}}>
														{b.Text}
													</Button>
												</a>
											</Link>
											<Box
												color="common.white" mt={4}
												fontSize={{base: '12px', md: '14px', lg: '16px'}}
											>
												{b.Description}
											</Box>
										</Box>
									))}
								</SimpleGrid>
							</Box>
						</Flex>
					</Box>
				</Box>
			)

		case 'Centered':
			return (
				<Box w={{base: '100%'}} position="relative">
					<CMSImage image={block.Image}
							  height={{base: '250px', sm: '300px', md: '400px', lg: '500px'}}/>
					<Box position="absolute" top={0} left={0} h="100%" w="100%">
						<Box maxWidth="1440px" mx="auto" h="100%">
							<Flex
								direction="column"
								h="100%"
								py={{base: '24px', md: '160px'}}
								mx="auto"
								maxWidth="750px"
								alignItems="center"
							>
								<Text as="h1"
									  textStyle="inverse"
									  mb="24px"
									  pl={{base: '24px', md: '100px'}}
									  textAlign="center"
								>
									{block.Headline}
								</Text>
								{block.Buttons?.map((b: any) => (
									<Link href={b.URL} prefetch={false} key={b.url} passHref>
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