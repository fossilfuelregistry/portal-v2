import React, {useContext} from "react"
import {StaticData} from "lib/types";
import {DataContext} from "components/DataContext";

export default function useText(data?: StaticData) {
	// Two ways of initializing: Context or props
	let staticData: StaticData = useContext(DataContext)
	if (data) staticData = data

	const translate = React.useCallback((key: string) => {
		if (staticData.texts?.[key]?.length > 0) return staticData.texts[key]
		return `?? ${key} ??`
	}, [staticData.texts])

	return {translate}
}
