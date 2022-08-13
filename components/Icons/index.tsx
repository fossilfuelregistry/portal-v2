import React from 'react'
import { Icon } from '@chakra-ui/react'

export const PlusIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="13px" height="13px" viewBox="0 0 13 13" fill="none" {...props}>
    <path d="M6.5 0V13M0 6.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)

export const MinusIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="13px" height="3px" viewBox="0 0 13 3" fill="none" {...props}>
    <path d="M0 1.5H13" stroke="white" strokeWidth="1.5" />
  </Icon>
)

export const DownloadIcon = (props: any) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon width="14px" height="14px" viewBox="0 0 14 14" fill="none" {...props}>
    <path
      d="M7 9.5L3.75 6.5M7 9.5L10 6.5M7 9.5V0M13 6V12.5H1V6"
      stroke="white"
      strokeWidth="2"
    />
  </Icon>
)
