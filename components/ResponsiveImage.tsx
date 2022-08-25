import React from 'react'
import {Box, LayoutProps} from "@chakra-ui/react"

interface Props {
	src: string,
	height: LayoutProps["h"],
	width: string,
	sizing?: string,
	borderRadius?: string,
	id?: string,
	className?: string,
	gradient?: boolean
}

export const getResponsiveStyle = ( url: string, gradient?: boolean, sizing?: string ) => ({
		backgroundImage: `url(${  url  })`,
		backgroundSize: sizing || 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	})

const ResponsiveImage = ( { src, height, width, sizing, borderRadius, id, className, gradient }: Props ) => {

	const _style = { width: '100%',
		height: '100%',
		borderRadius: borderRadius || 'unset', ...getResponsiveStyle( src, gradient, sizing ) }

	return (
		<Box
			id={ id }
			className={ className }
			w={ width ?? '100%' }
			h={ height ?? '100%' }
			position="relative"
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
						background: 'linear-gradient(160deg, rgba(0, 0, 0, 0.7) 6.04%, rgba(0, 0, 0, 0) 110%)'
					} }
				/>
			}
		</Box>
	)
}

export default ResponsiveImage
