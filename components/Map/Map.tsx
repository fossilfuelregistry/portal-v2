import React, { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box } from '@chakra-ui/react'
import mapStyle from './style.json'

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)
  const [lng] = useState(47.19497528338846)
  const [lat] = useState(9.669634635566009)
  const [zoom] = useState(1.7)

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
  })

  return (
    <Box w="100%" h="640px" p="relative" bg="#0A2244">
      <Box ref={mapContainer} w="100%" h="100%" p="absolute" />
    </Box>
  )
}

export default Map
