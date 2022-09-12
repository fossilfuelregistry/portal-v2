/* eslint-disable no-unused-vars */
import { useQuery } from '@apollo/client'
import {
  GQL_CountrySources,
  GQL_countrySources,
} from 'queries/country'
import { GQL_countrySourcesRecord } from 'queries/country-types'
import { getPreferredReserveGrade } from 'lib/calculate'
import { useCallback, useMemo } from 'react'

export type Props = {
  country: string
}

const DEBUG = false

const useCountrySources = ({ country }: Props) => {
  const { data: _countrySources, loading: cLoad } = useQuery(
    GQL_countrySources,
    {
      variables: { iso3166: country },
      skip: !country,
    }
  ) as GQL_CountrySources
  const productionSources = (
    (_countrySources?.getCountrySources?.nodes ??
      [])
  )
    .filter((s) => s.dataType === 'PRODUCTION')
    .sort((a, b) => Math.sign((b.quality ?? 0) - (a.quality ?? 0)))

  const distinctSourceIds: Record<number, number> = {} // On source can appear several times if it has different quality for different data points.
    
  const projectionSources = (
    (_countrySources?.getCountrySources?.nodes ??
      []) as GQL_countrySourcesRecord[]
  )
    .filter((s) => {
      if (!(s.dataType === 'PROJECTION')) return false
      if (distinctSourceIds[s.sourceId] !== undefined) return false
      distinctSourceIds[s.sourceId] = Math.max(
        s.quality ?? 0,
        distinctSourceIds[s.sourceId] ?? 0
      )
      return true
    })
    .map((s) => ({ ...s, quality: distinctSourceIds[s.sourceId] })) // Use max value found
    .sort((a, b) => Math.sign((b.quality ?? 0) - (a.quality ?? 0)))

  const reservesSources = (
    (_countrySources?.getCountrySources?.nodes ??
      []) as GQL_countrySourcesRecord[]
  )
    .filter((s) => s.dataType === 'RESERVE')
    .map((s) => ({
      ...s,
      namePretty: `${getPreferredReserveGrade(s.grades ?? [])} ${s.year}`,
    }))
    .sort((a, b) => Math.sign((b.quality ?? 0) - (a.quality ?? 0)))

  const isLoading = cLoad

  const preferredProductionSourceId = useMemo(() => productionSources[0]?.sourceId, [productionSources])
  const preferredProjectionSourceId = useMemo(() => projectionSources[0]?.sourceId, [projectionSources])
  const preferredReservesSourceId = useMemo(() => reservesSources[0]?.sourceId, [reservesSources])

  DEBUG && console.info("PREFERRED SOURCES", { preferredProjectionSourceId, preferredProductionSourceId, preferredReservesSourceId })

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
    preferredProductionSourceId,
    preferredProjectionSourceId,
    preferredReservesSourceId,
    getSourceName
  }
}

export default useCountrySources
