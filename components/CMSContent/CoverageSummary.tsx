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
		w={{base: '100%', md: '28%', xl: '18%'}}
		position="relative"
		mb={{base: "24px", md: "0px"}}
		mr={{base: "0px", md: "24px"}}
		maxW="250px" mx="auto"
		background={{base: 'rgba(255,255,255,0.1)', xl: 'none'}}
		p={{base: '12px', xl: 0}}
	>
		{children}
	</Box>
)

type CoverageSummaryProps = {
	block: Block
}

const CoverageSummary: FC<CoverageSummaryProps> = ({block}) => {
	const {Headline, Intro, Countries, Projects, Oil, Gas, Coal, ManualData} = block

	return (
		<Box bg={colors.primary.richBlue} py={{base: '40px', md: '78px'}}>
			<CMSBlock>
				<Text
					as="h2"
					fontSize={{base: '28px', md: '44px'}}
					color={colors.common.white}
					fontWeight="700"
					mb="26px"
				>
					{Headline}
				</Text>
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

					<Box
						w={{base: '100%', sm: '45%', xl: '17%'}} mb="24px"
						mx="auto"
						background={{base: 'rgba(255,255,255,0.1)', xl: 'none'}}
						p={{base: '12px', xl: 0}}
					>
						<Text as="h2">{ManualData.countries}</Text>
						<Text fontSize={{base: '14px', lg: '18px'}} opacity="0.8">
							{Countries}
							<br/>
						</Text>
					</Box>

					<Box
						w={{base: '100%', sm: '45%', xl: '17%'}} mb="24px"
						ml="auto"
						mr={{base: '0', md: '24px', xl: '50px'}}
						 borderRight={{xl: '1px solid'}}
						background={{base: 'rgba(255,255,255,0.1)', xl: 'none'}}
						p={{base: '12px', xl: 0}}
					>
						<Text as="h2">{ManualData.projects}</Text>
						<Text
							maxW={{base: '100%', xl: '133px'}}
							fontSize={{base: '14px', lg: '18px'}}
							opacity="0.8"
						>
							{Projects}
						</Text>
					</Box>

					<Percentage>
						<Box position="absolute" top={5}><OilIcon height="40px" width="40px"/></Box>
						<Text as="h2" pl={{base: "60px"}}>
							{ManualData.oil}
						</Text>
						<Text
							width="100%"
							fontSize={{base: '14px', lg: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							{Oil}
						</Text>
					</Percentage>

					<Percentage>
						<Box position="absolute" top={5}><GasIcon/></Box>
						<Text as="h2" pl={{base: "60px"}}>
							{ManualData.gas}
						</Text>
						<Text
							fontSize={{base: '14px', lg: '18px'}}
							opacity="0.8" pl={{base: "60px"}}
						>
							{Gas}
						</Text>
					</Percentage>

					<Percentage>
						<Box position="absolute" top={5}><CoalIcon/></Box>
						<Text as="h2" pl={{base: "60px"}}>
							{ManualData.coal}
						</Text>
						<Text
							fontSize={{base: '14px', lg: '18px'}}
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
