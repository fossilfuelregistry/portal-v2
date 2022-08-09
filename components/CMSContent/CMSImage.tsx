import React from 'react'
import ResponsiveImage from '../ResponsiveImage'
import {LayoutProps} from "@chakra-ui/react";
import {CMS_Image} from "lib/types";

interface Props {
	image: CMS_Image,
	height: LayoutProps["h"],
}


const CMSImage = ( { image, height }: Props ) => {
	return (
		<ResponsiveImage
			src={ process.env.NEXT_PUBLIC_CMS_URL + image?.data?.attributes?.url}
			height={height}
			width="100%"
		/>
	)
}

export default CMSImage
