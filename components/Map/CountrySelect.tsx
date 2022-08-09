import React, { FC, useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import Select, { SelectOption } from 'components/Select'
import { GLOBAL_OPTION } from 'components/Map/constants'
import { Country } from 'components/Map/types'
import { SingleValue } from 'chakra-react-select'

type CountrySelectProps = {
  value: SelectOption | undefined
  countriesData: Country[]
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: SingleValue<SelectOption>) => void
}

const CountrySelect: FC<CountrySelectProps> = ({
  value,
  countriesData,
  onChange,
}) => {
  const countries = useMemo(() => {
    const cs = (countriesData ?? [])
      .map((c) => ({ ...c, value: c.iso3166, label: c.en }))
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
