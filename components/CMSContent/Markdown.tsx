import React from 'react'
import ReactMarkdown from "react-markdown";
import {chakra} from '@chakra-ui/react';

interface Props {
	children: string
}

const Markdown = ({children}: Props) => (
	<chakra.div lineHeight={{base: '28px'}}>
		<ReactMarkdown
			skipHtml
			transformImageUri={(uri: string) =>
				uri.startsWith("http") ? uri : `${process.env.NEXT_PUBLIC_CMS_URL}${uri}`
			}
		>
			{children}
		</ReactMarkdown>
	</chakra.div>
)
export default Markdown
