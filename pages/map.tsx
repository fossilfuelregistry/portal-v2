import React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Map from 'components/Map/Map'
import { Country } from 'components/Map/types'
import Navbar from 'components/navigation/Navbar'
import PageHead from 'components/CMSContent/PageHead'
import Footer from 'components/navigation/Footer'
import { FooterProps, Page } from 'lib/types'
import { getPageStaticProps } from 'lib/staticProps'
import PieChart from 'components/charts/PieChart'

type MapPageType = {
  countries: Country[]
  page: Page
  menu: Array<any>
  footer: FooterProps
  texts: Array<any>
}

const MapPage: NextPage<MapPageType> = ({
  countries,
  page,
  menu,
  texts,
  footer,
}) => (
  <div id="page_main">
    <Navbar menu={menu} texts={texts} />
    <PageHead page={page} />
    <Map countries={countries} />
    <PieChart
      parentWidth={320}
      parentHeight={320}
      value="55.6"
      header="Total Mt CO₂e"
    />
    <Footer footer={footer} texts={texts} />
  </div>
)

export default MapPage
export const getStaticProps: GetStaticProps = (context) =>
  getPageStaticProps(context, '/')
