import React from 'react'
import ResponsiveImage from '../ResponsiveImage'

const CMSImage = ( { image, height } ) => {
	return (
		<ResponsiveImage
			src={ process.env.NEXT_PUBLIC_CMS_URL + image?.data?.attributes?.url}
			height={height}
			width="100%"
		/>
	)
}

export default CMSImage
