import React from 'react'
import {LayoutProps} from "@chakra-ui/react";
import {ICMSImage} from "lib/types";
import ResponsiveImage from '../ResponsiveImage'

interface Props {
	image: ICMSImage,
	height: LayoutProps["h"],
}


const CMSImage = ( { image, height }: Props ) => (
		<ResponsiveImage
			src={ process.env.NEXT_PUBLIC_CMS_URL + image?.data?.attributes?.url}
			height={height}
			width="100%"
		/>
	)

export default CMSImage
