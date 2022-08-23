import { GQL_projects } from 'queries/general'
import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

type Props = {
  country: string
  region?: string | undefined
}

const DEBUG = false

const useProjectData = ({ country, region }: Props) => {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, error } = useQuery(GQL_projects, {
    variables: { iso3166_: country, iso31662_: region ?? '' },
    skip: !country,
  })

  const projects = useMemo(() => {
    const projs = (data?.getProjects?.nodes ?? [])
      // @ts-ignore
      .filter((p) => p.co2 > 0)
      // @ts-ignore
      .sort((a, b) => Math.sign(b.co2 - a.co2))
    DEBUG && console.info(projs[0])

    // Remove non-current entries and get one entry per project..
    const mapProjs = new Map()
    // @ts-ignore
    projs.forEach((p) => {
      const prev = mapProjs.get(p.projectIdentifier)
      if (prev?.lastYear > p.lastYear) return
      if (p.projectIdentifier?.length > 0 && (p.lastYear ?? p.dataYear) >= 2015)
        mapProjs.set(p.projectIdentifier, p)
    })
    return Array.from(projs.values())
  }, [data?.getProjects?.nodes])

  return {
    projects,
  }
}

export default useProjectData
