/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import theme from 'assets/theme'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient( {
	uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
	cache: new InMemoryCache()
} )

const MyApp = ({Component, pageProps}: AppProps) => (
	<ApolloProvider client={ client }>
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	</ApolloProvider>
)

export default MyApp
