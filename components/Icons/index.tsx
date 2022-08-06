import React from 'react'
import { Icon } from '@chakra-ui/react'

export const PlusIcon = (props) => (
  <Icon width="13px" height="13px" viewBox="0 0 13 13" fill="none" {...props}>
    <path d="M6.5 0V13M0 6.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)

export const MinusIcon = (props) => (
  <Icon width="13px" height="3px" viewBox="0 0 13 3" fill="none" {...props}>
    <path d="M0 1.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)
