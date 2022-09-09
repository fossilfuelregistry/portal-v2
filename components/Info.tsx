import React from 'react'
import { Tooltip, Box } from '@chakra-ui/react'
import { InfoIcon } from 'components/Icons'

type Props = {
  text?: string
}

const Info = ({ text }: Props) => {
  if (!text) {
    return null
  }

  return (
    <Box>
      <Tooltip label={text} placement="top">
        <span>
          <InfoIcon ml="8px" />
        </span>
      </Tooltip>
    </Box>
  )
}

export default Info
