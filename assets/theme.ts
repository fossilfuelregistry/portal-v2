import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: `'Roboto', sans-serif`,
  body: `'Roboto', sans-serif`,
}

const breakpoints = {
  sm: '576px',
  md: '1024px',
  lg: '1440px',
  xl: '1920px',
}

export const colors = {
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
  primary: {
    brandingBlue: '#1172BA',
    blue10: 'rgba(17, 114, 186, 0.1)',
    richBlue: '#0C2953',
    darkBlue: '#0A2244',
    richBlack: '#040404',
    grey70: '#858585',
    grey25: '#BFBFBF',
    grey10: '#EBEBEB',
    grey2: '#FAFAFA',
    red: '#C4362D',
    green: '#4AA233',
  },
}

export default extendTheme({ fonts, breakpoints, colors })
