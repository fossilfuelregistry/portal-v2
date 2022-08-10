import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import {MenuItem} from "lib/types";
import CMSBlock from "components/CMSContent/CMSBlock";
import {useRouter} from "next/router";
import ReactMarkdown from "react-markdown";

interface FooterProps {
	footer: MenuItem[],
	texts: any
}

export default function Footer({footer, texts}: FooterProps) {
	const router = useRouter()
	const locales = router.locales ?? []
	return (
		<Box w="100%" bg="primary.darkBlue" py={{base: '80px'}}>
			<CMSBlock>
				<Flex textStyle="inverse">
					<Box>{texts.grff}</Box>
				</Flex>
				<Box textStyle="inverse" w="100%" borderTop="1px solid rgba(255,255,255,0.4)" mt="80px" pt="20px">
					<Flex justifyContent="space-between">
						<Flex>
							<Box mr="20px">
								<img src="/cc.svg" height="32px" width="auto" alt="Creative Commons CCBYNC"/>
							</Box>
							<Box maxWidth="420px">
								<ReactMarkdown>{texts.data_license}</ReactMarkdown>
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
