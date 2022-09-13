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

  console.log('projectId', projectId)

  const {
    data: projectData,
    loading,
    error,
  } = useQuery(GQL_project, {
    variables: { id: Number(projectId) },
    skip: !projectId,
  })

  const theProject = projectData?.project ?? {}

  console.log('projectData', projectData)

  return (
    <DataContextProvider
      data={{ countries, constants, texts, conversions, prefixConversions }}
    >
      <div id="page_main">
        <Navbar menu={menu} />
        <PageHead page={page} />
        {theProject && (
          <Container>
            <AnnualEmissions theProject={theProject} />
          </Container>
        )}
        <Footer footer={footer} />
      </div>
    </DataContextProvider>
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
