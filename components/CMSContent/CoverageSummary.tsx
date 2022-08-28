import React, {FC} from 'react'
import {Box, Heading, Text, Grid, Flex} from '@chakra-ui/react'
import Container from 'components/Container'
import {CoalIcon, GasIcon, OilIcon} from 'components/Icons'
import CMSBlock from "components/CMSContent/CMSBlock";
import {colors} from '../../assets/theme'

type Block = {
	Headline: string
	Intro: string
}

interface PercentageProps {children: React.ReactNode}
const Percentage = ({children}: PercentageProps) => (
	<Box
		w={{base: '100%', md: '33%', xl: '18%'}}
		position="relative"
		mb={{base: "42px", md: "24px"}}
		 maxW="250px" mx="auto">
		{children}
	</Box>
)

type CoverageSummaryProps = {
	block: Block
}

const CoverageSummary: FC<CoverageSummaryProps> = ({block}) => {
	const {Headline, Intro} = block
	console.log(block)

	return (
		<Box bg={colors.primary.richBlue} py={{base: '40px', md: '78px'}}>
			<CMSBlock>
				<Heading
					as="h2"
					fontSize={{base: '28px', md: '44px'}}
					color={colors.common.white}
					fontWeight="700"
					mb="26px"
				>
					{Headline}
				</Heading>
				<Text
					maxW={{base: '100%', md: '600px'}}
					fontSize="18px"
					fontWeight="400"
					color={colors.common.white}
					mb="40px"
				>
					{Intro}
				</Text>

				<Flex
					color={colors.common.white}
					justifyContent="space-between"
					flexWrap="wrap"
					alignItems="center"
				>

					<Box w={{base: '100%', xl: '23%'}} mb="24px" maxW="250px" mx="auto">
						<Heading as="h2">89</Heading>
						<Text fontSize={{base: '16px', md: '18px'}} opacity="0.8">
							Countries
							<br/><br/>
						</Text>
					</Box>

					<Box w={{base: '100%', xl: '23%'}} mb="24px" maxW="250px" ml="auto" mr={{base: 'auto', xl: '50px'}} borderRight={{xl: '1px solid'}}>
						<Heading as="h2">73161</Heading>
						<Text
							maxW={{base: '100%', xl: '133px'}}
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8"
						>
							Extraction fields and projects
						</Text>
					</Box>

					<Percentage>
						<OilIcon height="40px" width="40px" position="absolute" top={5}/>
						<Heading as="h2" pl={{base: "60px"}}>
							70%
						</Heading>
						<Text
							width="100%"
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							Oil projects by production
						</Text>
					</Percentage>

					<Percentage>
						<GasIcon position="absolute" top={5}/>
						<Heading as="h2" pl={{base: "60px"}}>
							91%
						</Heading>
						<Text
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							Gas projects by production
						</Text>
					</Percentage>

					<Percentage>
						<CoalIcon position="absolute" top={5}/>
						<Heading as="h2" pl={{base: "60px"}}>
							50%
						</Heading>
						<Text
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							Coal projects by production
						</Text>
					</Percentage>
				</Flex>

			</CMSBlock>
		</Box>
	)
}

export default CoverageSummary
