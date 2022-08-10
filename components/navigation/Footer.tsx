import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import {FooterProps, MenuItem} from "lib/types";
import CMSBlock from "components/CMSContent/CMSBlock";
import {useRouter} from "next/router";
import ReactMarkdown from "react-markdown";
import {RenderLinkOrSubmenu} from "components/navigation/Navbar";

interface FooterCompProps {
	footer: FooterProps,
	texts: any
}

export default function Footer({footer, texts}: FooterCompProps) {
	const router = useRouter()
	const locales = router.locales ?? []
	return (
		<Box w="100%" bg="primary.darkBlue" py={{base: '80px'}}>
			<CMSBlock>
				<Flex textStyle="inverse" direction="row" wrap="wrap">
					<Box w={{base: '100%', lg: '40%'}}>{texts.grff}</Box>
					<Box w={{base: '100%', md: '30%', lg: '25%'}}>
						{footer.Items.filter((i: MenuItem) => i.Column < 2).map((i: MenuItem) => (
							<RenderLinkOrSubmenu item={i} mb="20px"/>))}
					</Box>
					<Box w={{base: '100%', md: '30%', lg: '25%'}}>
						{footer.Items.filter((i: MenuItem) => i.Column === 2).map((i: MenuItem) => (
							<RenderLinkOrSubmenu item={i} mb="20px"/>))}
					</Box>
					<Box w={{base: '100%', md: '30%', lg: '10%'}}>
						{footer.Items.filter((i: MenuItem) => i.Column === 3).map((i: MenuItem) => (
							<RenderLinkOrSubmenu item={i} mb="20px"/>))}
					</Box>
				</Flex>
				<Box textStyle="inverse" w="100%" borderTop="1px solid rgba(255,255,255,0.4)" mt="40px" pt="20px">
					<Flex justifyContent="space-between">
						<Flex>
							<Box mr="20px">
								<img src="/cc.svg" width="160px" alt="Creative Commons CC-BY-SA"/>
							</Box>
							<Box maxWidth="420px">
								<ReactMarkdown>{footer.Copyright}</ReactMarkdown>
							</Box>
						</Flex>
						<Flex>
							{locales.map(l => (
								<Box ml="20px">{l.toUpperCase()}</Box>
							))}
						</Flex>
					</Flex>
				</Box>
			</CMSBlock>
		</Box>
	);
}
