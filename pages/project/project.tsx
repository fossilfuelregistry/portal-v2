/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useMemo, useState } from 'react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Navbar from 'components/navigation/Navbar'
// @ts-ignore
import { getPageStaticProps, getProducingCountries } from 'lib/staticProps'
import { ConversionFactorInStore } from 'lib/types'
import { PrefixRecord } from 'lib/calculations/prefix-conversion'
import { useApolloClient, useQuery } from '@apollo/client'
import { DatabaseRecord } from 'lib/calculations/calculation-constants/types'
import useCountryData from 'lib/useCountryData'
import useCountrySources from 'lib/useCountrySources'
import useCountryProjects from 'lib/useCountryProjects'
import useProjectSources from 'lib/useProjectSources'
// eslint-disable-next-line import/no-named-as-default
import useConversionHooks from 'lib/conversionHooks'
import useProjectData from 'lib/useProjectData'
import { GQL_project } from 'queries/country'

export type Props = {
  sources: any
  CO2Costs: any
  constants: DatabaseRecord[]
  countries: any

  texts: Record<string, string>
  conversions: ConversionFactorInStore[]
  co2Costs: {
    source: null
    year: number | undefined
    currency: 'USD'
    cost: number
  }[]

  locale: string
  prefixConversions: PrefixRecord[]
}

const DEBUG = false

const CountryPage: React.FC<Props> = (props) => {
  // @ts-ignore
  const { page, menu, texts, conversions, constants, prefixConversions } = props
  const apolloClient = useApolloClient()
  const router = useRouter()

  const [gwp, setGwp] = useState('GWP100')
  const [country, setCountry ] = useState('au')

  const projectId = 15874

  const { productionSources, projectionSources, reservesSources } =
    useCountrySources({ country })

 
  const projectSources =
    useProjectSources({ projectId, country })

   console.log({projectSources})

const allProjectsInACountry = useCountryProjects({country})

  console.info({allProjectsInACountry})

  
   const {  production, projection, reserves, getCurrentCO2E } =
    useCountryData({
      texts,
      // @ts-ignore
      projectionSources,
      gwp,
      reservesSourceId: 2,
      projectionSourceId: 2,
      productionSourceId: 2,
      country,
      conversionConstants: conversions,
      // @ts-ignore
      allSources: projectSources,
      constants,
      conversionPrefixes: prefixConversions,
    })

 
 // console.log(getCurrentCO2E())

  // console.log({ production })


  const gg = useProjectData({
    reservesSourceId:21,
  projectionSourceId:21,
  productionSourceId:21,
    projectId: 15874,
    texts,
      gwp,
      country,
      conversionConstants: conversions,
      constants,
      allSources: projectSources.productionSources,
      // @ts-ignore
      stableProduction: {},
      prefixes: prefixConversions,
  })

  // useProject({projectId: 45352})

  // console.log({gg})

   const { data:projectData , loading, error } = useQuery( GQL_project, {
		variables: { id: projectId },
		skip: !projectId
	} )

  const theProject = projectData?.project ?? {}

    DEBUG && console.log({theProject})

    const projInfo = useMemo( () => {
		if( !theProject?.id ) return {}
		const co2 = gg.projectCO2( theProject )
		DEBUG && console.info( 'DenseProject projectCO2', { theProject, co2 } )
		return co2
	}, [ theProject?.id ] )

   console.log({projInfo})


  return (
    <div id="page_main">
      <Navbar menu={menu} texts={texts} />
      {country}
    </div>
  )
}

/*
export const getStaticProps: GetStaticProps = async (context) => {
    // ...
  } *//*
export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await getProducingCountries()
  countries.push({ iso3166: '-' })
  return {
    // @ts-ignore
    paths: countries.flatMap((c) => [
      { params: { country: c.iso3166 } },
      { params: { country: c.iso3166 }, locale: 'fr' },
      { params: { country: c.iso3166 }, locale: 'es' },
    ]),
    fallback: false,
  }
} */

// @ts-ignore
export const getStaticProps = (context) => getPageStaticProps(context, `/`)

export default CountryPage
