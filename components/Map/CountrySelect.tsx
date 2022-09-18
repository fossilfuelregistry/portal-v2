import React, {FC, useMemo} from 'react'
import {SimpleGrid} from '@chakra-ui/react'
import Select, {SelectOption} from 'components/Select'
import {GLOBAL_OPTION} from 'components/Map/constants'
import {Country} from 'components/Map/types'
import {SingleValue} from 'chakra-react-select'
import useCountryProjects from 'lib/useCountryProjects'
import {useRouter} from 'next/router'
import useText from "lib/useText";

type CountrySelectProps = {
	selectedCountry: SelectOption | undefined
	countriesData: Country[]
	onChange: (newValue: SingleValue<SelectOption>) => void
	disableGlobalOption?: boolean
}

const CountrySelect: FC<CountrySelectProps> = (
	{
		selectedCountry,
		countriesData,
		onChange,
		disableGlobalOption
	}) => {
	const {projects} = useCountryProjects({
		country: selectedCountry?.value || '',
	})
	const router = useRouter()
	const {translate} = useText()

	const countries = useMemo(() => {
		const cs = (countriesData ?? [])
			.map((c) => ({...c, value: c.iso3166, label: c.en}))
			.filter((c) => c.label !== null && c.iso31662 === '') // Exclude regions
			.sort((a, b) => a.label.localeCompare(b.label))
		if (disableGlobalOption === true)
			return [...cs]
		return [GLOBAL_OPTION, ...cs]
	}, [countriesData])

	const countryProjects = useMemo(() => (projects ?? [])
		.map((p: any) => ({value: p.id, label: p.projectIdentifier}))
		.sort((a, b) => a.label.localeCompare(b.label)), [projects])

	return (
		<SimpleGrid w="600px" columns={2} gridGap="20px">
			<Select
				placeholder={`${translate('country')}...`}
				height="44px"
				value={selectedCountry?.value as string}
				options={countries}
				onChange={onChange}
			/>
			{selectedCountry?.value && (
				<Select
					height="44px"
					placeholder={translate('country_projects')}
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
