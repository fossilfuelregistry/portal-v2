import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box, Flex } from '@chakra-ui/react'
import mapStyle from './style.json'
import { colors } from '../../assets/theme'
import { MinusIcon, PlusIcon } from 'components/Icons'

const MIN_ZOOM = 1.25
const MAX_ZOOM = 24

const Map = ({ outlineGeometry, emissionsData }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)
  const [lng] = useState(-0.39417687115326316)
  const [lat] = useState(41.118875451562104)
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
      minZoom: MIN_ZOOM,
      zoom: MIN_ZOOM,
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

      map.current.on('click', 'emissions-circles', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setText('Annual emissions')
          .addTo(map.current)
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
    <Box w="100%" h="640px" p="relative" bg="#0A2244">
      <Box ref={mapContainer} w="100%" h="100%" p="absolute" />
      <Flex
        position="absolute"
        right="60px"
        top="50%"
        transform="translateY(-50%)"
        direction="column"
      >
        <PlusIcon
          cursor="pointer"
          my="20px"
          onClick={() => handleChangeZoom('max')}
        />
        <MinusIcon
          cursor="pointer"
          my="20px"
          onClick={() => handleChangeZoom('min')}
        />
      </Flex>
    </Box>
  )
}

export default Map
