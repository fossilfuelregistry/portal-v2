import { Box } from "@chakra-ui/react"

const CMSBlock = ( {children, extended} ) => {
	return (
		<Box
			px={ extended ? 0 : {base:'24px', md:'100px'}}
			maxWidth="1440px"
			w="100%"
			m="0 auto"
			pb="24px"
		>
				{children}
		</Box>
	)
}

export default CMSBlock
