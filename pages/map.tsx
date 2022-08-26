import React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Map from 'components/Map/Map'
import { Box, Heading } from '@chakra-ui/react'
import { Country } from 'components/Map/types'
import Navbar from 'components/navigation/Navbar'
import PageHead from 'components/CMSContent/PageHead'
import Footer from 'components/navigation/Footer'
import { FooterProps, Page } from 'lib/types'
import { getPageStaticProps } from 'lib/staticProps'
import HistoricProduction from 'components/country/HistoricProduction'
import Container from 'components/Container'
import { colors } from '../assets/theme'
import ForecastSection from 'components/country/ForecastSection'
import ReservesLifeSection from 'components/country/ReservesLifeSection'
import ExcessReservesSection from 'components/country/ExcessReservesSection'
import HistoricalSection from 'components/country/HistoricalSection'

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
    {/* Added attributes to be able to compile */}
    <Map
      countries={countries}
      onChangeCountry={() => {}}
      type="country"
      country="au"
    />
    <Container>
      <HistoricProduction />
      <Box h="1px" background={colors.primary.grey30} mb="80px" />
      <Heading
        as="h3"
        fontSize="32px"
        mb="24px"
        color={colors.primary.richBlue}
      >
        Emissions from Fossil Fuels produced under various scenarios
      </Heading>
      <ForecastSection />
      <ReservesLifeSection />
      <ExcessReservesSection />
      <Box h="1px" background={colors.primary.grey30} mb="80px" />
      <Heading
        as="h3"
        fontSize="32px"
        mb="24px"
        color={colors.primary.richBlue}
      >
        Historical production and reserves data
      </Heading>
      <HistoricalSection />
    </Container>
    <Footer footer={footer} texts={texts} />
  </div>
)

export default MapPage
export const getStaticProps: GetStaticProps = (context) =>
  getPageStaticProps(context, '/')
