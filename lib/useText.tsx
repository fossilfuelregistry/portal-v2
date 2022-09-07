import React, {useContext} from "react"
import {StaticData} from "lib/types";
import {DataContext} from "components/DataContext";

export default function useText() {
	const staticData: StaticData =  useContext(DataContext)
	const translate = React.useCallback( (key: string) => {
		if( staticData.texts?.[ key ]?.length > 0 ) return staticData.texts[ key ]
		return `?? ${key} ??`
	}, [ staticData.texts ] )

	return { translate }
}
