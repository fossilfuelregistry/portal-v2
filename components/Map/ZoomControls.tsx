import React, { FC } from 'react'
import { MinusIcon, PlusIcon } from 'components/Icons'
import { Flex } from '@chakra-ui/react'

type ZoomControlsProps = {
  onChangeZoom: (action: 'min' | 'max') => void
}

const ZoomControls: FC<ZoomControlsProps> = ({ onChangeZoom }) => (
  <Flex
    position="absolute"
    right="60px"
    top="50%"
    transform="translateY(-50%)"
    direction="column"
    zIndex="999999"
  >
    <PlusIcon cursor="pointer" my="20px" onClick={() => onChangeZoom('max')} />
    <MinusIcon cursor="pointer" my="20px" onClick={() => onChangeZoom('min')} />
  </Flex>
)

export default ZoomControls
