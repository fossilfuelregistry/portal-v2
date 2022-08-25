import React from 'react'
import {chakra} from "@chakra-ui/react";
import {Article} from "lib/types";

interface Props {
	article: Article
}

const ArticleTag = ({article}: Props) => (
	<chakra.div
		display="block"
		background={`category.${article.Category}`}
		py={1} px={3} mb="20px"
		color="common.white"
		fontWeight={700}
		whiteSpace="nowrap"
		height="40px"
		margin="0 auto"
	>
		{article.Category}
	</chakra.div>
)

export default ArticleTag
