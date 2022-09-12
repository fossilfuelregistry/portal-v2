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
		px="24px" mb="20px"
		height="40px"
		alignItems="center"
		mr="20px"
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
