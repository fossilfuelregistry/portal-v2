import { Box } from "@chakra-ui/react"
import {ReactNode} from "react";

interface Props {
	children: Array<ReactNode> | ReactNode,
	extended?: boolean
}

const CMSBlock = ( {children, extended}: Props ) => {
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
