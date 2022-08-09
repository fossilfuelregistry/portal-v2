import { gql, useApolloClient } from "@apollo/client"

const DEBUG = false

type InjectQueryResult = (text: string) => Promise<any>

export default function useTextInjectQueryResult() {
	const client = useApolloClient()

	const injectQueryResult: InjectQueryResult = async text => {
		const queries = text?.match( /QUERY:(\S*)/gm )
			?.map( q => ( { query: q.substring( 6 ), string: q } ) )

		if( !queries ) return text

		let result = text
		for( const query of queries ) {
			const ql = gql`query ${ query.query } { ${ query.query } }`
			const res = await client.query( { query: ql } )
			result = result.replace( query.string, res?.data?.[ query.query ] )
		}
		console.log( { text, result, queries } )
		return result
	}
	return injectQueryResult
}
