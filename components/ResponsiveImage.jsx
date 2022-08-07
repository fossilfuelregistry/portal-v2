import React from 'react'
import { Box, chakra } from "@chakra-ui/react"

export const getResponsiveStyle = ( sizing, url ) => {

	return {
		backgroundImage: 'url(' + url + ')',
		backgroundSize: sizing || 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	}
}

const ResponsiveImage = ( { src, height, width, sizing, borderRadius, id, className, style, gradient } ) => {

	let _style = Object.assign( {
		width: '100%',
		height: '100%',
		borderRadius: borderRadius || 'unset',
	}, getResponsiveStyle( sizing, src, gradient ) )

	return (
		<Box
			id={ id }
			className={ className }
			w={ width ?? '100%' }
			h={ height ?? '100%' }
			position={ 'relative' }
			flex="1 1 auto"
		>
			<div style={ _style }/>
			{ gradient &&
				<div
					style={ {
						width: '100%',
						height: '100%',
						position: "absolute",
						top: 0,
						background: 'linear-gradient(11.74deg, rgba(0, 0, 0, 0.6) 6.04%, rgba(0, 0, 0, 0) 55.99%)'
					} }
				/>
			}
		</Box>
	)
}

export default ResponsiveImage
