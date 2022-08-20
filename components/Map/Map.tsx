import React, { useRef, useEffect, useState, useMemo, FC } from 'react'
import { useRouter } from 'next/router'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box, Flex } from '@chakra-ui/react'
import CountrySelect from 'components/Map/CountrySelect'
import MapFilter, { Filter } from 'components/Map/MapFilter'
import ZoomControls from 'components/Map/ZoomControls'
import { Country } from 'components/Map/types'
import { GLOBAL_OPTION } from 'components/Map/constants'
import {
  calculateEmission,
  calculateFuelEmission,
  calculateTotalEmission,
} from 'components/Map/utils'
import mapStyle from './style.json'
import { colors } from '../../assets/theme'
import updatePathname from '../../utils/updatePathname'

const MIN_ZOOM = 1.25
const MAX_ZOOM = 24
// Center of the map
const [lng, lat] = [-0.39417687115326316, 41.118875451562104]

type MapProps = {
  country: string
  countries: Country[]
  type: 'country' | 'project'
  // eslint-disable-next-line no-unused-vars
  onChangeCountry: (countryCode: string) => void
}

const Map: FC<MapProps> = ({ country, countries, type, onChangeCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState<any>(() => {
    console.log('-------country-------country', country)
    const currentCountry = countries.find((c) => c.iso3166 === country)
    console.log('currentCountry', currentCountry)
    if (currentCountry) {
      return {
        ...currentCountry,
        value: currentCountry.iso3166,
        label: currentCountry.en,
      }
    }

    return GLOBAL_OPTION
  })
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filter>({
    combustion: '',
    fuel: '',
  })
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)
  const router = useRouter()

  const countriesCollection = useMemo(() => {
    const features = countries.map((c) => ({
      properties: {
        country: c.iso3166,
        ...c,
      },
      geometry: {
        type: 'Point',
        coordinates: c.centroid.geojson.coordinates,
      },
    }))
    return {
      type: 'FeatureCollection',
      features,
    }
  }, [countries])

  const emissionsData = useMemo(
    () =>
      countries
        .map((c) => [c.iso3166, calculateEmission(filters, c.productionCo2E)])
        .flat(),
    [countries, filters]
  )

  useEffect(() => {
    if (map.current || !mapContainer.current) return
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style: mapStyle,
      center: [lng, lat],
      renderWorldCopies: false,
      minZoom: MIN_ZOOM,
      zoom: MIN_ZOOM,
      localIdeographFontFamily: "'Roboto', sans-serif",
    })

    map.current.on('load', () => {
      setIsLoaded(true)
    })
  })

  useEffect(() => {
    if (isLoaded && map.current) {
      const isSourceExist = map.current.getSource('emissions')

      if (isSourceExist) return

      map.current.addSource('emissions', {
        type: 'geojson',
        data: countriesCollection,
      })

      map.current.on('click', 'emissions-circles', (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const { en: name, productionCo2E } = e.features[0].properties
        const co2E = JSON.parse(productionCo2E)
        const total = (calculateTotalEmission(co2E) / 10e9).toFixed(1)
        const oil = calculateFuelEmission(co2E, 'oil')
        const gas = calculateFuelEmission(co2E, 'gas')
        const coal = calculateFuelEmission(co2E, 'coal')

        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            ` <h2 class="maplibregl-popup-title">${name}</h2>
              <div class="maplibregl-popup-info">
                Annual emissions
                <strong>${total} Million tonnes CO²</strong>
              </div>
              <div class="maplibregl-popup-info">
                Oil
                <strong>${oil} Million barrels</strong>
              </div>
              <div class="maplibregl-popup-info">
                Gas
                <strong>${gas} Billion cubic meters</strong>
              </div>
              <div class="maplibregl-popup-info">
                Coal
                <strong>${coal} Thousand tonnes</strong>
              </div>`
          )
          .addTo(map.current)
      })
    }
  }, [isLoaded, countriesCollection])

  useEffect(() => {
    if (isLoaded && map.current) {
      const isLayerExist = map.current.getLayer('emissions-circles')

      if (isLayerExist) {
        map.current.removeLayer('emissions-circles')
      }

      map.current.addLayer({
        id: 'emissions-circles',
        type: 'circle',
        source: 'emissions',
        paint: {
          'circle-color': colors.common.white,
          'circle-stroke-width': 1,
          'circle-stroke-color': colors.common.white,
          'circle-opacity': 0.4,
          'circle-radius': [
            'match',
            ['get', 'country'],
            ...emissionsData,
            /* other */ 0,
          ],
        },
      })
    }
  }, [isLoaded, emissionsData])

  useEffect(() => {
    const outlineGeometry = selectedCountry.borders?.geojson

    if (outlineGeometry) {
      const bounds = bbox(outlineGeometry)
      map.current.fitBounds(bounds, { padding: 50 })
    } else {
      map.current.setCenter([lng, lat])
      map.current.zoomTo(1.25, {
        duration: 2000,
      })
    }
  }, [selectedCountry])

  const handleChangeZoom = (action: 'min' | 'max') => {
    const zoomStep = 0.5
    const currentZoom = map.current.getZoom()
    const duration = 1000

    if (action === 'min' && currentZoom > MIN_ZOOM) {
      map.current.zoomTo(currentZoom - zoomStep, {
        duration,
      })
    }

    if (action === 'max' && currentZoom < MAX_ZOOM) {
      map.current.zoomTo(currentZoom + zoomStep, {
        duration,
      })
    }
  }

  const handleChangeSelectedCountry = (countryOption: any) => {
    const countryCode = countryOption.iso3166 || 'global'
    setSelectedCountry(countryOption)
    onChangeCountry(countryCode)
    updatePathname(`/${type}/${countryCode}`)
  }

  return (
    <>
      <Box w="100%" h="640px" position="relative" bg="#0A2244">
        <Box
          ref={mapContainer}
          w="100%"
          h="100%"
          position="absolute"
          zIndex="1"
        />
        <MapFilter filters={filters} onChange={setFilters} />
        <ZoomControls onChangeZoom={handleChangeZoom} />
      </Box>
      <Flex
        p="18px"
        justify="center"
        bg={colors.primary.grey5}
        mb="80px"
        borderBottom={`1px solid ${colors.primary.grey10}`}
      >
        <CountrySelect
          value={selectedCountry}
          countriesData={countries}
          onChange={handleChangeSelectedCountry}
        />
      </Flex>
    </>
  )
}

export default Map
