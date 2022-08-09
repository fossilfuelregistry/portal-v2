import React from 'react'
import type { NextPage } from 'next'
import Map from 'components/Map/Map'
import { Country } from 'components/Map/types'

type MapPageType = {
  countries: Country[]
}

// eslint-disable-next-line react/prop-types
const MapPage: NextPage<MapPageType> = ({ countries }) => {
  return <Map countries={countries} />
}

export default MapPage
export { getCommonStaticProps as getStaticProps } from '../lib/staticProps'
