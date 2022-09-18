import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  FC,
  useContext,
} from 'react'
import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box, Flex } from '@chakra-ui/react'
import CountrySelect from 'components/Map/CountrySelect'
import MapFilter, { Filter } from 'components/Map/MapFilter'
import ZoomControls from 'components/Map/ZoomControls'
import { GLOBAL_OPTION } from 'components/Map/constants'
import {
  calculateEmission,
  calculateFuelEmission,
  calculateTotalEmission,
} from 'components/Map/utils'
import { StaticData } from 'lib/types'
import { useRouter } from 'next/router'
import mapStyle from './style.json'
import { colors } from '../../assets/theme'
import updatePathname from '../../utils/updatePathname'
import { DataContext } from '../DataContext'

const MIN_ZOOM = 1.25
const MAX_ZOOM = 24
// Center of the map
const [lng, lat] = [-0.39417687115326316, 41.118875451562104]

type MapProps = {
  country: string
  type: 'country' | 'project'
  onChangeCountry: (countryCode: string) => void
  disableGlobalOption?: boolean
}

const Map: FC<MapProps> = ({
  country,
  type,
  onChangeCountry,
  disableGlobalOption,
}) => {
  const staticData: StaticData = useContext(DataContext)
  const { countries } = staticData
  const router = useRouter()

  const [selectedCountry, setSelectedCountry] = useState<any>(() => {
    const currentCountry = countries.find((c) => c.iso3166 === country)
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
        .map((c) => [
          c.iso3166,
          calculateEmission(filters, c.productionSnapshotData),
        ])
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

    map.current.scrollZoom.disable()

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
        const {
          en: name,
          country,
          productionSnapshotData,
        } = e.features[0].properties
        const co2E = JSON.parse(productionSnapshotData)

        // const total = calculateTotalEmission(co2E).toFixed(1)
        // const oil = calculateFuelEmission(co2E, 'oil')
        // const gas = calculateFuelEmission(co2E, 'gas')
        // const coal = calculateFuelEmission(co2E, 'coal')
        const link = `/country/${country}`

        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            ` <h2 class="maplibregl-popup-title">
                <a class="maplibregl-popup-link" href='${link}'>${name}</a>
              </h2>
              `
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
    if (type === 'country') {
      router.push(`/${type}/${countryCode}`)
    }
  }

  return (
    <>
      <Box w="100%" h="640px" position="relative" bg="#0A2244">
        <Box ref={mapContainer} w="100%" h="100%" position="absolute" />
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
          selectedCountry={selectedCountry}
          countriesData={countries}
          onChange={handleChangeSelectedCountry}
          disableGlobalOption={disableGlobalOption}
        />
      </Flex>
    </>
  )
}

export default Map
