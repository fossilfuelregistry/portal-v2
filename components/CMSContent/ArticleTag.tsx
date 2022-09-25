import React from 'react'
import {Box, chakra} from "@chakra-ui/react";
import {ArticleCategory} from "lib/types";

interface Props {
	category: ArticleCategory
}

const ArticleTag = ({category}: Props) => (
	<Box
		display="inline-flex"
		background={category.attributes.Color ?? '#777777'}
		px={{base: '8px', md: '16px', lg: '24px'}}
		fontSize={{base: '12px', md: '16px', lg: '16px'}}
		mb="20px"
		height={{base: '28px', md: '32px', lg: '40px'}}
		alignItems="center"
		mr={{base: '8px', md: '16px', lg: '20px'}}
	>
		<chakra.div
			color="common.white"
			fontWeight={700}
			whiteSpace="nowrap"
		>
			{category.attributes.Category}
		</chakra.div>
	</Box>
)

export default ArticleTag
