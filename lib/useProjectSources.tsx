
import { GQL_projectSources } from 'queries/general'
import { GQL_countryBorder } from 'queries/country'
import { ProjectSourcesRecord } from 'queries/general-types'
import { useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
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

  const borders = _border?.neCountries?.nodes?.[0]?.geometry?.geojson
  const projectBorders = _border?.projects?.nodes ?? []

  const isLoading = pLoad || bLoad

  const preferredProductionSourceId = useMemo(() => productionSources[0]?.sourceId ?? 2, [productionSources])
  const preferredProjectionSourceId = useMemo(() => projectionSources[0]?.sourceId ?? 102, [projectionSources])
  const preferredReservesSourceId = useMemo(() => reservesSources[0]?.sourceId ?? 2, [reservesSources])

  const getSourceName = useCallback(
    (sourceId: number | undefined) => 
      productionSources.find(s=>s.sourceId === sourceId)?.namePretty ?? '',
    [productionSources],
  )
  
  return {
    isLoading, 
    productionSources,
    projectionSources,
    reservesSources,
    borders,
    projectBorders,
    preferredProductionSourceId,
    preferredProjectionSourceId,
    preferredReservesSourceId,
    getSourceName
  }
}

export default useProjectSources
