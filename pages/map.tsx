import React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Map from 'components/Map/Map'
import { Flex, Box } from '@chakra-ui/react'
import { Country } from 'components/Map/types'
import Navbar from 'components/navigation/Navbar'
import PageHead from 'components/CMSContent/PageHead'
import Footer from 'components/navigation/Footer'
import { FooterProps, Page } from 'lib/types'
import { getPageStaticProps } from 'lib/staticProps'
import PieChart from 'components/charts/PieChart'

const pieData = [
  {
    fillColor: '#87BFFF',
    fuel: 'oil',
    label: 'Oil, combustion',
    percentage: 10,
    quantity: 80,
    year: 2020,
  },
  {
    fillColor: 'rgba(135, 191, 255, .5)',
    fuel: 'oil',
    label: 'Oil, pre-combustion',
    percentage: 10,
    quantity: 18,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: '#4C6EE6',
    fuel: 'gas',
    label: 'Gas, combustion',
    percentage: 30,
    quantity: 80,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: 'rgba(76, 110, 230, .5)',
    fuel: 'gas',
    label: 'Gas, pre-combustion',
    percentage: 10,
    quantity: 25.7,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: '#52B9BF',
    fuel: 'coal',
    label: 'Coal, combustion',
    percentage: 30,
    quantity: 3,
    year: 2020,
  },
  {
    fillColor: 'rgba(82, 185, 191, .5)',
    fuel: 'coal',
    label: 'Coal, pre-combustion',
    percentage: 10,
    quantity: 1,
    year: 2020,
  },
]

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
    <Flex justify="center">
      <PieChart
        data={pieData}
        parentWidth={320}
        parentHeight={320}
        value="55.6"
        header="Total Mt CO₂e"
      />
    </Flex>
    <Footer footer={footer} texts={texts} />
  </div>
)

export default MapPage
export const getStaticProps: GetStaticProps = (context) =>
  getPageStaticProps(context, '/')
