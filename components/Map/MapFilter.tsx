import React from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import Select from 'components/Select'

const combustionOptions = [
  {
    label: 'Combustion & Pre-combustion',
    value: '',
  },
  {
    label: 'Combustion',
    value: 'scope1',
  },
  {
    label: 'Pre-combustion',
    value: 'scope3',
  },
]

const fuelOptions = [
  {
    label: 'Aggregate',
    value: '',
  },
  {
    label: 'Oil',
    value: 'oil',
  },
  {
    label: 'Gas',
    value: 'gas',
  },
  {
    label: 'Coal',
    value: 'coal',
  },
]

const MapFilter = ({ filters, onChange }) => {
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
          value={combustionOptions.find((o) => o.value === filters.combustion)}
          onChange={(option) => {
            onChange({
              ...filters,
              combustion: option.value,
            })
          }}
          options={combustionOptions}
          height="40px"
          placeholder="Combustion & Pre-combustion"
        />
      </Box>
      <Box w="280px">
        <Select
          value={fuelOptions.find((o) => o.value === filters.fuel)}
          onChange={(option) => {
            onChange({
              ...filters,
              fuel: option.value,
            })
          }}
          options={fuelOptions}
          height="40px"
          placeholder="Aggregate"
        />
      </Box>
    </SimpleGrid>
  )
}

export default MapFilter
