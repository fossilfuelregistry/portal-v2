import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { Flex, SimpleGrid, Box } from '@chakra-ui/react'
import Map from 'components/Map/Map'
import CountrySelect, { GLOBAL_OPTION } from 'components/CountrySelect'
import { colors } from '../assets/theme'
import { GQL_countryBorder } from '../queries/country'
import Select from 'components/Select'
import MapFilter from 'components/Map/MapFilter'

const MapPage: NextPage = ({ countries }) => {
  const [country, set_country] = useState([GLOBAL_OPTION])

  const { data: _border } = useQuery(GQL_countryBorder, {
    variables: {
      isoA2: country?.value?.toUpperCase(),
      iso3166: country?.value,
    },
    skip: !country?.value,
  })

  const borders =
    country.value === GLOBAL_OPTION.value
      ? GLOBAL_OPTION.value
      : _border?.neCountries?.nodes?.[0]?.geometry?.geojson
  console.log('country', country)
  console.log('borders', borders)

  return (
    <>
      <Box position="relative">
        <MapFilter />
        <Map outlineGeometry={borders} />
      </Box>
      <Flex p="18px" justify="center" bg={colors.primary.grey10}>
        <CountrySelect
          value={country}
          countriesData={countries}
          onChange={set_country}
        />
      </Flex>
    </>
  )
}

export default MapPage
export { getCommonStaticProps as getStaticProps } from '../lib/getCommonStaticProps'
