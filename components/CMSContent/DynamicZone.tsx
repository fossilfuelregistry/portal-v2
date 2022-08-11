import React, {ReactNode} from 'react'
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react'
import TextWithQuery from "./TextWithQuery"
import StyledTextImage from "./StyledTextImage"
import CMSBlock from "./CMSBlock"
import ArticleSelector from './ArticleSelector'

interface Props {
	content: Array<any>
}

export default function DynamicZone( { content }: Props ) {
	const rendered: Array<ReactNode> = []

	content?.forEach( block => {

		// eslint-disable-next-line no-underscore-dangle
		switch( block.__component ) {

			case "shared.styled-text-image":
				rendered.push( <StyledTextImage key={ `STI${ block.id }` } block={ block }/> )
				break

			case "shared.text-block":
				rendered.push( <TextWithQuery key={ `T${ block.id }` } block={ block }/> )
				break

			case "shared.article-selector":
				rendered.push( <ArticleSelector key={ `AS${ block.id }` } block={ block }/> )
				break

			default:
				rendered.push(
					<CMSBlock key={ `A${ block.id }` }>
						<Alert status="warning">
							<AlertIcon/>
							<AlertTitle>Unknown CMS content type!</AlertTitle>
							<AlertDescription>
								{/* eslint-disable-next-line no-underscore-dangle */}
								We do not know how to render a block of type &nbsp;<b>{ block.__component }</b>.
							</AlertDescription>
						</Alert>
					</CMSBlock>
				)
				break
		}
	} )

	return rendered
}
