import React, { useRef, useEffect, useState, useMemo, FC } from 'react'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box, Flex } from '@chakra-ui/react'
import CountrySelect, { GLOBAL_OPTION } from 'components/Map/CountrySelect'
import MapFilter from 'components/Map/MapFilter'
import ZoomControls from 'components/Map/ZoomControls'
import mapStyle from './style.json'
import { colors } from '../../assets/theme'

const MIN_ZOOM = 1.25
const MAX_ZOOM = 24
// Center of the map
const [lng, lat] = [-0.39417687115326316, 41.118875451562104]

type MapProps = {
  countries: any[]
}

const Map: FC<MapProps> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState([GLOBAL_OPTION])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)

  const countriesCollection = useMemo(() => {
    const features = countries.map((c) => ({
      properties: {
        country: c.iso3166,
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

  const calculateEmission = (productionCo2E: any) => {
    const total = Object.keys(productionCo2E).reduce((prev, curr) => {
      return prev + productionCo2E[curr].scope1 + productionCo2E[curr].scope3
    }, 0)
    const value = total / 10e9
    return value > 100 ? 100 : value
  }

  const emissionsData = useMemo(() => {
    const data = countries
      .map((c) => [c.iso3166, calculateEmission(c.productionCo2E)])
      .flat()
    return data
  }, [countries])

  // console.log('emissionsData', emissionsData)
  // console.log('countries', countries)

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
      map.current.addSource('emissions', {
        type: 'geojson',
        data: countriesCollection,
      })

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

      map.current.on('click', 'emissions-circles', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            ` <h2 class="maplibregl-popup-title">USA</h2>
              <div class="maplibregl-popup-info">
                Annual emissions
                <strong>83.0 Million tonnes CO²</strong>
              </div>
              <div class="maplibregl-popup-info">
                Oil
                <strong>4.0 Million barrels</strong>
              </div>
              <div class="maplibregl-popup-info">
                Gas
                <strong>4.0 Billion cubic meters</strong>
              </div>
              <div class="maplibregl-popup-info">
                Coal
                <strong>4.0 Thousand tonnes</strong>
              </div>`
          )
          .addTo(map.current)
      })
    }
  }, [isLoaded, emissionsData])

  // console.log('selectedCountry', selectedCountry)
  // console.log('emissionsData', emissionsData)

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

  return (
    <>
      <Box w="100%" h="640px" p="relative" bg="#0A2244">
        <Box ref={mapContainer} w="100%" h="100%" p="absolute" />
        <MapFilter />
        <ZoomControls onChangeZoom={handleChangeZoom} />
      </Box>
      <Flex p="18px" justify="center" bg={colors.primary.grey10}>
        <CountrySelect
          value={selectedCountry}
          countriesData={countries}
          onChange={setSelectedCountry}
        />
      </Flex>
    </>
  )
}

export default Map
