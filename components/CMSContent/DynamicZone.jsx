import React from 'react'
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react'
import TextWithQuery from "./TextWithQuery"

export default function DynamicZone( { content } ) {
	const rendered = []

	content?.forEach( block => {

		switch( block.__component ) {
			case "shared.text-block":
				rendered.push( <TextWithQuery key={ `T${  block.id}` } template={ block.Text }/> )
				break
			default:
				rendered.push(
					<Alert status='warning'>
						<AlertIcon />
						<AlertTitle>Unknown CMS content type!</AlertTitle>
						<AlertDescription>
							We do not know how to render a block of type &nbsp;<b>{ block.__component }</b>.
						</AlertDescription>
					</Alert>
				)
				break
		}
	} )

	return ( <>{ rendered }</> )
}
