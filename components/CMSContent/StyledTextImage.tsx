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

let dimensions

const StyledTextImage = ({block}: Props) => {
	switch (block.Template) {

		case 'Hero':
		case 'Hero Slim':
			dimensions = {base: '250px', sm: '350px', md: '450px', lg: '680px'}
			if(block.Template === 'Hero Slim')
				dimensions = {base: '180px', sm: '200px', md: '280px', lg: '320px'}

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
								<Heading as="h1" textStyle="inverse">{block.Headline}</Heading>
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
				<Box w={{base: '100%'}} position="relative">
					<CMSImage image={block.Image}
							  height={{base: '180px', sm: '200px', md: '280px', lg: '320px'}}/>
					<Box position="absolute" top={0} left={0} h="100%" w="100%">
						<Flex direction="column" justifyContent="center" h="100%">
							<Box maxWidth="1440px" m="0 auto" w="100%">
								<Heading as="h1" textStyle="inverse" mb="24px">{block.Headline}</Heading>
								<SimpleGrid
									columns={4}
									spacing={6}
								>
									{block.Buttons?.map((b: any) => (
										<Box background="rgba(127,127,127,0.7)" borderRadius="8px" p="40px">
											<Link href={b.URL} prefetch={false} key={b.id} passHref>
												{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
												<a>
													<Button variant="inverse">{b.Text}</Button>
												</a>
											</Link>
											<Box color="common.white" mt={4}>{b.Description}</Box>
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
								<Heading as="h1" textStyle="inverse" textAlign="center"
										 mb="36px">{block.Headline}</Heading>
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