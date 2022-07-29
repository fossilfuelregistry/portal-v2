import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box } from '@chakra-ui/react'
import mapStyle from './style.json'
import data from './data.json'

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)
  const [lng] = useState(47.19497528338846)
  const [lat] = useState(9.669634635566009)
  const [zoom] = useState(0)

  useEffect(() => {
    if (map.current || !mapContainer.current) return
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style: mapStyle,
      center: [lng, lat],
      renderWorldCopies: false,
      minZoom: 1.5,
      zoom,
    })

    map.current.on('load', () => {
      map.current.addSource('emissions', {
        type: 'geojson',
        data,
      })
      map.current.addLayer({
        id: 'emissions-circles',
        type: 'circle',
        source: 'emissions',
        paint: {
          'circle-color': '#fff',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
          'circle-opacity': 0.4,
          'circle-radius': [
            'match',
            ['get', 'country'],
            'Ukraine',
            10,
            'Canada',
            40,
            'Brazil',
            40,
            'Australia',
            40,
            'Saudi Arabia',
            40,
            'India',
            40,
            'Korea',
            15,
            'Japan',
            15,
            'Guinea',
            17,
            'USA',
            110,
            'russ',
            120,
            'China',
            130,
            'Kazakhstan',
            22,
            'South Africa',
            16,
            'Angola',
            16,
            'Ghana',
            11,
            'Cameroon',
            22,
            'Niger',
            22,
            'Algeria',
            25,
            'Egypt',
            18,
            'Libya',
            17,
            'Turkey',
            13,
            'Italy',
            10,
            'Hungary',
            10,
            'Poland',
            13,
            /* other */ 10,
          ],
        },
      })
    })
  })

  console.log('map.current')

  return (
    <Box w="100%" h="640px" p="relative" bg="#0A2244">
      <Box ref={mapContainer} w="100%" h="100%" p="absolute" />
    </Box>
  )
}

export default Map
