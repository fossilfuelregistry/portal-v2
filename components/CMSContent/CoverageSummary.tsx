import React, {FC} from 'react'
import {Box, Flex, Heading, Text} from '@chakra-ui/react'
import {CoalIcon, GasIcon, OilIcon} from 'components/Icons'
import CMSBlock from "components/CMSContent/CMSBlock";
import {colors} from '../../assets/theme'

type Block = {
	Headline: string
	Intro: string
	Countries: string
	Projects: string
	Oil: string
	Gas: string
	Coal: string
	ManualData: any
}

interface PercentageProps {
	children: React.ReactNode
}

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
	const {Headline, Intro, Countries, Projects, Oil, Gas, Coal, ManualData} = block
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

					<Box w={{base: '100%', xl: '17%'}} mb="24px" maxW="250px" mx="auto">
						<Heading as="h2">{ManualData.countries}</Heading>
						<Text fontSize={{base: '16px', md: '18px'}} opacity="0.8">
							{Countries}
							<br/><br/>
						</Text>
					</Box>

					<Box w={{base: '100%', xl: '17%'}} mb="24px" maxW="250px" ml="auto" mr={{base: 'auto', xl: '50px'}}
						 borderRight={{xl: '1px solid'}}>
						<Heading as="h2">{ManualData.projects}</Heading>
						<Text
							maxW={{base: '100%', xl: '133px'}}
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8"
						>
							{Projects}
						</Text>
					</Box>

					<Percentage>
						<Box position="absolute" top={5}><OilIcon height="40px" width="40px"/></Box>
						<Heading as="h2" pl={{base: "60px"}}>
							{ManualData.oil}
						</Heading>
						<Text
							width="100%"
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							{Oil}
						</Text>
					</Percentage>

					<Percentage>
						<Box position="absolute" top={5}><GasIcon/></Box>
						<Heading as="h2" pl={{base: "60px"}}>
							{ManualData.gas}
						</Heading>
						<Text
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							{Gas}
						</Text>
					</Percentage>

					<Percentage>
						<Box position="absolute" top={5}><CoalIcon/></Box>
						<Heading as="h2" pl={{base: "60px"}}>
							{ManualData.coal}
						</Heading>
						<Text
							fontSize={{base: '16px', md: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							{Coal}
						</Text>
					</Percentage>
				</Flex>

			</CMSBlock>
		</Box>
	)
}

export default CoverageSummary
