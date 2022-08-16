import React, { FC } from 'react'
import { Box } from '@chakra-ui/react'

type ContainerProps = {
  children: React.ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <Box maxWidth="1270px" width="100%" px="15px" margin="0 auto">
      {children}
    </Box>
  )
}

export default Container
