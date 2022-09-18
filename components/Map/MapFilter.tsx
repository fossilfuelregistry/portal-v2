import React, { FC, useMemo } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import Select from 'components/Select'
import { COMBUSTION_OPTIONS, FUEL_OPTIONS } from 'components/Map/constants'

export type Filter = {
  combustion: string
  fuel: 'oil' | 'coal' | 'gas' | string
}

type MapFilterProps = {
  filters: Filter
  // eslint-disable-next-line no-unused-vars
  onChange: (filters: Filter) => void
}

const MapFilter: FC<MapFilterProps> = ({ filters, onChange }) => {
  const combustionValue = useMemo(
    () => COMBUSTION_OPTIONS.find((o) => o.value === filters.combustion)?.value,
    [filters]
  )

  const fuelValue = useMemo(
    () => FUEL_OPTIONS.find((o) => o.value === filters.fuel)?.value,
    [filters]
  )

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      w={{ base: '280px', lg: 'auto' }}
      gridGap="8px"
      position="absolute"
      top="45px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="1"
    >
      <Box w="280px">
        <Select
          value={combustionValue as string}
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
          value={fuelValue as string}
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
