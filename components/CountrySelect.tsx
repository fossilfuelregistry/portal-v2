import React, { FC, useMemo } from 'react'
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
  countriesData,
  onChange,
}) => {
  const countries = useMemo(() => {
    const cs = (countriesData ?? [])
      .map((c) => ({ ...c, value: c.iso3166, label: c['en'] ?? c.en }))
      .filter((c) => c.label !== null && c.iso31662 === '') // Exclude regions
      .sort((a, b) => a.label.localeCompare(b.label))
    return cs
  }, [countriesData])

  console.log('----countries', countries)

  return (
    <Box w="256px" bg={colors.common.white}>
      <Select size="md" value={value} onChange={onChange} options={countries} />
    </Box>
  )
}

export default CountrySelect
