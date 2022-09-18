import React, {useCallback, useState} from 'react'
import CMSBlock from "components/CMSContent/CMSBlock";
import Map from "components/Map/Map";

interface Block {
	DisableGlobalOption: boolean
}

interface Props {
	block: Block
}

const WorldMap = ({block}: Props) => {
	const {DisableGlobalOption} = block
	const [country, set_country] = useState('-')
	const handleCountryChange = useCallback( (e: any) => {
		console.log(e)
		set_country(e)
	}, [])

	return (
		<CMSBlock extended>
			<Map country={country} type='country' onChangeCountry={handleCountryChange} disableGlobalOption={DisableGlobalOption}/>
		</CMSBlock>
	)
}

export default WorldMap
