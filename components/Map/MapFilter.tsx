import React from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import Select from 'components/Select'

const combustionOptions = [
  {
    label: 'Combustion & Pre-combustion',
    value: 'all',
  },
  {
    label: 'Combustion',
    value: 'combustion',
  },
  {
    label: 'Pre-combustion',
    value: 'pre-combustion',
  },
]

const fuelOptions = [
  {
    label: 'Aggregate',
    value: 'all',
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

const MapFilter = () => {
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
          value={{
            label: 'Combustion & Pre-combustion',
            value: 'all',
          }}
          onChange={() => {}}
          options={combustionOptions}
          height="40px"
          placeholder="Combustion & Pre-combustion"
        />
      </Box>
      <Box w="280px">
        <Select
          value={{
            label: 'Aggregate',
            value: 'all',
          }}
          onChange={() => {}}
          options={fuelOptions}
          height="40px"
          placeholder="Aggregate"
        />
      </Box>
    </SimpleGrid>
  )
}

export default MapFilter
