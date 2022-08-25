import React from 'react'
import {LayoutProps} from "@chakra-ui/react";
import {ICMSImage} from "lib/types";
import ResponsiveImage from '../ResponsiveImage'

interface Props {
	image: ICMSImage,
	height: LayoutProps["h"],
	gradient?: boolean
}


const CMSImage = ( { image, height, gradient }: Props ) => (
		<ResponsiveImage
			// eslint-disable-next-line no-unsafe-optional-chaining
			src={ process.env.NEXT_PUBLIC_CMS_URL + image?.data?.attributes?.url}
			height={height}
			width="100%"
			gradient={gradient}
		/>
	)

export default CMSImage
