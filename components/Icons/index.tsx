import React from 'react'
import { Icon } from '@chakra-ui/react'
import {AnyProps} from "io-ts";

export const PlusIcon = (props: AnyProps) => (
  <Icon width="13px" height="13px" viewBox="0 0 13 13" fill="none" {...props}>
    <path d="M6.5 0V13M0 6.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)

export const MinusIcon = (props: AnyProps) => (
  <Icon width="13px" height="3px" viewBox="0 0 13 3" fill="none" {...props}>
    <path d="M0 1.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)
