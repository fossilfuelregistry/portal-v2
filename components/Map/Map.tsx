import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box } from '@chakra-ui/react'
import mapStyle from './style.json'
import { colors } from '../../assets/theme'

const Map = ({ outlineGeometry, emissionsData }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)
  const [lng] = useState(-0.39417687115326316)
  const [lat] = useState(41.118875451562104)
  const [zoom] = useState(1.25)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

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
      setIsLoaded(true)
    })
  })

  useEffect(() => {
    if (isLoaded && map.current) {
      map.current.addSource('emissions', {
        type: 'geojson',
        data: emissionsData,
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
            'ua',
            10,
            'us',
            40,
            /* other */ 0,
          ],
        },
      })
    }
  }, [isLoaded, emissionsData])

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
