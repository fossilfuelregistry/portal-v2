/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useMemo } from 'react'
import Head from 'next/head'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Navbar from 'components/navigation/Navbar'
// @ts-ignore
import { getPageStaticProps, getProducingCountries } from 'lib/staticProps'
import { ConversionFactorInStore, FooterProps, Page } from 'lib/types'
import { PrefixRecord } from 'lib/calculations/prefix-conversion'
import { useApolloClient, useQuery } from '@apollo/client'
import { DatabaseRecord } from 'lib/calculations/calculation-constants/types'
import useCountryData from 'lib/useCountryData'
import useCountrySources from 'lib/useCountrySources'
import useCountryProjects from 'lib/useCountryProjects'
import useProjectSources from 'lib/useProjectSources'
import { DataContextProvider } from 'components/DataContext'
// eslint-disable-next-line import/no-named-as-default
import { GQL_project } from 'queries/country'
import PageHead from 'components/CMSContent/PageHead'
import Footer from 'components/navigation/Footer'
import { Country } from 'components/Map/types'
import Container from 'components/Container'
import AnnualEmissions from 'components/project/AnnualEmissions'

const DEBUG = false

export type Props = {
  page: Page
  menu: Array<any>
  sources: any
  CO2Costs: any
  constants: DatabaseRecord[]
  countries: Country[]
  footer: FooterProps
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

const ProjectPage: React.FC<Props> = (props) => {
  // @ts-ignore
  const {
    page,
    menu,
    texts,
    conversions,
    constants,
    prefixConversions,
    footer,
    countries,
  } = props
  const router = useRouter()
  const projectId = router.query.projectId as string

  const {
    data: projectData,
    loading,
    error,
  } = useQuery(GQL_project, {
    variables: { id: Number(projectId) },
    skip: !projectId,
  })

  const theProject = projectData?.project ?? {}

  const countryName = useMemo(
    () => countries.find((c) => c.iso3166 === theProject.iso3166)?.en || '',
    [theProject]
  )

  const Title = `Global Fossil fuel Registry: ${countryName}: ${theProject?.projectIdentifier}`

  // @ts-ignore
  return (
    <>
      <DataContextProvider
        data={{ countries, constants, texts, conversions, prefixConversions }}
      >
        <div id="page_main">
          <Navbar menu={menu} />
          <PageHead
            page={{
              ...page,
              Title,
            }}
          />
          {theProject && (
            <Container>
              <AnnualEmissions
                theProject={theProject}
                countryName={countryName}
              />
            </Container>
          )}
          <Footer footer={footer} />
        </div>
      </DataContextProvider>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    // @ts-ignore
    paths: [],
    fallback: 'blocking',
  }
}

// @ts-ignore
export const getStaticProps = (context) =>
  getPageStaticProps(context, `/project`)

export default ProjectPage
