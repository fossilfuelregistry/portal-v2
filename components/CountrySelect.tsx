import React, { FC } from 'react'
import { Select } from 'chakra-react-select'
import { Box } from '@chakra-ui/react'
import { colors } from '../assets/theme'

type CountrySelectProps = {
  value: string
  options: any
  onChange: (e: any) => void
}

const CountrySelect: FC<CountrySelectProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <Box w="256px" bg={colors.common.white}>
      <Select size="md" value={value} onChange={onChange} options={options} />
    </Box>
  )
}

export default CountrySelect
