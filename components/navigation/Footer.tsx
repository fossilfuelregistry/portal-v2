import React from 'react';
import {Box, chakra, Flex, Heading} from "@chakra-ui/react"
import {FooterProps, MenuItem} from "lib/types";
import CMSBlock from "components/CMSContent/CMSBlock";
import {useRouter} from "next/router";
import {RenderLinkOrSubmenu} from "components/navigation/Navbar";
import Link from "next/link";
import Markdown from "components/CMSContent/Markdown";
import useText from "lib/useText";

interface FooterCompProps {
	footer: FooterProps
}

export default function Footer({footer}: FooterCompProps) {
	const router = useRouter()
	const {translate} = useText()
	const locales = router.locales ?? []
	const { pathname, query } = router

	return (
		<Box w="100%" bg="primary.darkBlue" py={{base: '80px'}} mt="24px">
			<CMSBlock>
				<Flex textStyle="inverse" direction="row" wrap="wrap">

					<Box w={{base: '100%', lg: '40%'}}>
						<Flex alignItems="center">
							<Box mr="12px"><img src="/logo2white.svg" height="40px" width="40px" alt=""/></Box>
							<Heading size="sm" m={0} color="common.white">{translate('grff')}</Heading>
						</Flex>
					</Box>

					<Box w={{base: '100%', md: '30%', lg: '25%'}}>
						{footer.Items.filter((i: MenuItem) => i.Column < 2).map((i: MenuItem) => (
							<RenderLinkOrSubmenu key={i.id} item={i} mb="20px" color="common.white"/>))}
					</Box>
					<Box w={{base: '100%', md: '30%', lg: '25%'}}>
						{footer.Items.filter((i: MenuItem) => i.Column === 2).map((i: MenuItem) => (
							<RenderLinkOrSubmenu key={i.id} item={i} mb="20px" color="common.white"/>))}
					</Box>
					<Box w={{base: '100%', md: '30%', lg: '10%'}}>
						{footer.Items.filter((i: MenuItem) => i.Column === 3).map((i: MenuItem) => (
							<RenderLinkOrSubmenu key={i.id} item={i} mb="20px" color="common.white"/>))}
					</Box>
				</Flex>
				<Box textStyle="inverse" w="100%" borderTop="1px solid rgba(255,255,255,0.4)" mt="40px" pt="20px">
					<Flex justifyContent="space-between">
						<Flex>
							<Box mr="20px">
								<img src="/cc.svg" width="107px" alt="Creative Commons CC-BY-SA"/>
							</Box>
							<Box maxWidth="450px" color="rgba(255,255,255,0.4)">
								<Markdown>{footer.Copyright}</Markdown>
							</Box>
						</Flex>
						<Flex>
							{locales.map(l => (
								<Box key={l} ml="20px">
									<Link href={{ pathname, query }} locale={l} prefetch={false}>
										<chakra.span color="common.white">{l.toUpperCase()}</chakra.span>
									</Link>
								</Box>
							))}
						</Flex>
					</Flex>
				</Box>
			</CMSBlock>
		</Box>
	)
}
