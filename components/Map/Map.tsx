import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box } from '@chakra-ui/react'
import mapStyle from './style.json'
import data from './data.json'

const Map = ({ outlineGeometry }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)
  const [lng] = useState(-0.39417687115326316)
  const [lat] = useState(41.118875451562104)
  const [zoom] = useState(1.25)

  useEffect(() => {
    if (map.current || !mapContainer.current) return
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      style: mapStyle,
      center: [lng, lat],
      renderWorldCopies: false,
      minZoom: 1.25,
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

  useEffect(() => {
    if (!outlineGeometry) return
    if (outlineGeometry === 'global') {
      map.current.setCenter([-0.39417687115326316, 41.118875451562104])
      map.current.zoomTo(1.25, {
        duration: 2000,
      })
    } else {
      const bounds = bbox(outlineGeometry)
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [outlineGeometry])

  return (
    <Box w="100%" h="640px" p="relative" bg="#0A2244">
      <Box ref={mapContainer} w="100%" h="100%" p="absolute" />
    </Box>
  )
}

export default Map
