import React, {createContext, FC} from "react"
import {StaticData} from "lib/types";

type DCPProps = {
	data: StaticData
	children: React.ReactNode
}

const DataContext = createContext<StaticData>({
	countries: [],
	texts: {},
	conversions: [],
	constants: [],
	prefixConversions: []
})

const DataContextProvider: FC<DCPProps>  = ( { children, data } ) => (
		<DataContext.Provider value={ data }>
			{ children }
		</DataContext.Provider>
	)

export { DataContext, DataContextProvider }
