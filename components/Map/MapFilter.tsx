import React, { FC } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import Select from 'components/Select'
import { COMBUSTION_OPTIONS, FUEL_OPTIONS } from 'components/Map/constants'

export type Filter = {
  combustion: string
  fuel: string
}

type MapFilterProps = {
  filters: Filter
  // eslint-disable-next-line no-unused-vars
  onChange: (filters: Filter) => void
}

const MapFilter: FC<MapFilterProps> = ({ filters, onChange }) => {
  return (
    <SimpleGrid
      columns={2}
      gridGap="8px"
      position="absolute"
      top="45px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="9"
    >
      <Box w="280px">
        <Select
          value={COMBUSTION_OPTIONS.find((o) => o.value === filters.combustion)}
          onChange={(option) => {
            onChange({
              ...filters,
              combustion: option?.value as string,
            })
          }}
          options={COMBUSTION_OPTIONS}
          height="40px"
        />
      </Box>
      <Box w="280px">
        <Select
          value={FUEL_OPTIONS.find((o) => o.value === filters.fuel)}
          onChange={(option) => {
            onChange({
              ...filters,
              fuel: option?.value as string,
            })
          }}
          options={FUEL_OPTIONS}
          height="40px"
        />
      </Box>
    </SimpleGrid>
  )
}

export default MapFilter
