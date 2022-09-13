import React, { FC, useMemo } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Select, { SelectOption } from 'components/Select'
import { GLOBAL_OPTION } from 'components/Map/constants'
import { Country } from 'components/Map/types'
import { SingleValue } from 'chakra-react-select'
import useCountryProjects from 'lib/useCountryProjects'
import { useRouter } from 'next/router'

type CountrySelectProps = {
  selectedCountry: SelectOption | undefined
  countriesData: Country[]
  onChange: (newValue: SingleValue<SelectOption>) => void
}

const CountrySelect: FC<CountrySelectProps> = ({
  selectedCountry,
  countriesData,
  onChange,
}) => {
  const { projects } = useCountryProjects({
    country: selectedCountry?.value || '',
  })
  const router = useRouter()

  const countries = useMemo(() => {
    const cs = (countriesData ?? [])
      .map((c) => ({ ...c, value: c.iso3166, label: c.en }))
      .filter((c) => c.label !== null && c.iso31662 === '') // Exclude regions
      .sort((a, b) => a.label.localeCompare(b.label))
    return [GLOBAL_OPTION, ...cs]
  }, [countriesData])

  const countryProjects = useMemo(() => {
    return (projects ?? [])
      .map((p: any) => ({ value: p.id, label: p.projectIdentifier }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [projects])

  return (
    <SimpleGrid w="600px" columns={2} gridGap="20px">
      <Select
        height="44px"
        value={selectedCountry?.value as string}
        options={countries}
        onChange={onChange}
      />
      {selectedCountry?.value && (
        <Select
          height="44px"
          placeholder="Country Projects"
          value={selectedCountry?.value as string}
          options={countryProjects}
          onChange={(option) => {
            router.push(`/project/${option?.value}`)
          }}
        />
      )}
    </SimpleGrid>
  )
}

export default CountrySelect
