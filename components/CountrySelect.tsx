import React, { FC, useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import Select from 'components/Select'
import { colors } from '../assets/theme'

type CountrySelectProps = {
  value: string
  onChange: (e: any) => void
}

export const GLOBAL_OPTION = {
  value: 'global',
  label: 'Global',
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
    return [GLOBAL_OPTION, ...cs]
  }, [countriesData])

  return (
    <Box w="256px">
      <Select
        value={value}
        onChange={onChange}
        options={countries}
        height="44px"
      />
    </Box>
  )
}

export default CountrySelect
