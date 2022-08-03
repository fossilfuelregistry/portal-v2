import React from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import Select from 'components/Select'

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
          value={null}
          onChange={() => {}}
          options={[]}
          height="40px"
          placeholder="Combustion & Pre-combustion"
        />
      </Box>
      <Box w="280px">
        <Select
          value={null}
          onChange={() => {}}
          options={[]}
          height="40px"
          placeholder="Aggregate"
        />
      </Box>
    </SimpleGrid>
  )
}

export default MapFilter
