import React from 'react'
import ReactMarkdown from "react-markdown";
import {chakra} from '@chakra-ui/react';

interface Props {
	children: string
}

const Markdown = ({children}: Props) => (
	<chakra.div lineHeight={1.5}>
		<ReactMarkdown
			skipHtml
			linkTarget={(href, children, title) => {
				if(title?.startsWith('_')) return title
				return ''
			}}
			transformImageUri={(uri: string) =>
				uri.startsWith("http") ? uri : `${process.env.NEXT_PUBLIC_CMS_URL}${uri}`
			}
			className="markdown"
		>
			{children}
		</ReactMarkdown>
	</chakra.div>
)
export default Markdown
