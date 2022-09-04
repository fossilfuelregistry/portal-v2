/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { GQL_projectSources } from 'queries/general'

import { GQL_countryBorder, GQL_project } from 'queries/country'
import { ProjectSourcesRecord } from 'queries/general-types'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { getPreferredReserveGrade } from 'lib/calculate'

type Props = {
  projectId: number | undefined
  country: string | undefined
}

const DEBUG = false

const useProjectSources = ({ projectId, country }: Props) => {

  const { data: _projectSources, loading: pLoad } = useQuery(
    GQL_projectSources,
    {
      variables: { id: projectId },
      skip: !(projectId && projectId > 0),
    }
  )

  DEBUG && console.info({_projectSources})

  const { data: _border, loading: bLoad } = useQuery(GQL_countryBorder, {
    variables: { isoA2: country?.toUpperCase(), iso3166: country },
    skip: !country,
  })

  const productionSources = (
    (_projectSources?.getProjectSources?.nodes ??
      []) as ProjectSourcesRecord[]
  ).filter((s) => s.dataType === 'PRODUCTION')
  const projectionSources = (
    (_projectSources?.getProjectSources?.nodes ??
      []) as ProjectSourcesRecord[]
  ).filter((s) => s.dataType === 'PROJECTION')
  const reservesSources = (
    (_projectSources?.getProjectSources?.nodes ??
      []) as ProjectSourcesRecord[]
  )
    .filter((s) => s.dataType === 'RESERVE')
    .map((s) => ({
      ...s,
      // @ts-ignore
      namePretty: `${getPreferredReserveGrade(s.grades)} ${s.year}`,
    }))
  DEBUG &&
    console.info({
      _projectSources,
      productionSources,
      projectionSources,
      reservesSources,
    })
  // }

  const borders = _border?.neCountries?.nodes?.[0]?.geometry?.geojson
  const projectBorders = _border?.projects?.nodes ?? []

  const isLoading = pLoad || bLoad


  return {
    isLoading, productionSources,
    projectionSources,
    reservesSources,
    borders,
    projectBorders,
  }
}

export default useProjectSources
