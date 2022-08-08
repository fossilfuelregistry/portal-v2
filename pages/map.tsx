import React from 'react'
import type { NextPage } from 'next'
import Map from 'components/Map/Map'

const MapPage: NextPage = ({ countries }) => {
  return <Map countries={countries} />
}

export default MapPage
export { getCommonStaticProps as getStaticProps } from '../lib/staticProps'
