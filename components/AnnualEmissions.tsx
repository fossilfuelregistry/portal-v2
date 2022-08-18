import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import PieChart from 'components/charts/PieChart'
import InfoSection from 'components/InfoSection'
import WarmingPotentialSelect from 'components/filters/WarmingPotentialSelect'
import Select from 'components/Select'
import { colors } from '../assets/theme'
import RangeChart from 'components/charts/RangeChart'

const pieData = [
  {
    fillColor: '#87BFFF',
    fuel: 'oil',
    label: 'Oil, combustion',
    percentage: 10,
    quantity: 80,
    year: 2020,
  },
  {
    fillColor: 'rgba(135, 191, 255, .5)',
    fuel: 'oil',
    label: 'Oil, pre-combustion',
    percentage: 10,
    quantity: 18,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: '#4C6EE6',
    fuel: 'gas',
    label: 'Gas, combustion',
    percentage: 30,
    quantity: 80,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: 'rgba(76, 110, 230, .5)',
    fuel: 'gas',
    label: 'Gas, pre-combustion',
    percentage: 10,
    quantity: 25.7,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: '#52B9BF',
    fuel: 'coal',
    label: 'Coal, combustion',
    percentage: 30,
    quantity: 3,
    year: 2020,
  },
  {
    fillColor: 'rgba(82, 185, 191, .5)',
    fuel: 'coal',
    label: 'Coal, pre-combustion',
    percentage: 10,
    quantity: 1,
    year: 2020,
  },
]

const productionOptions = [
  {
    label: 'EIA',
    value: 'EIA',
  },
]

const timeOptions = [
  {
    label: 'Latest year: 2020',
    value: 'Latest year: 2020',
  },
]

const AnnualEmissions = () => {
  return (
    <InfoSection title="Annual Emissions from Fossil Fuel Production">
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <WarmingPotentialSelect />
        <Select
          label="Production estimates source"
          value={productionOptions[0]}
          options={productionOptions}
          onChange={() => {}}
        />
        <Select
          label="Time"
          value={timeOptions[0]}
          options={timeOptions}
          onChange={() => {}}
        />
      </SimpleGrid>
      <SimpleGrid
        mb="40px"
        columns={2}
        gridGap="20px"
        position="relative"
        _after={{
          content: `""`,
          width: '1px',
          height: '100%',
          background: colors.primary.grey25,
          position: 'absolute',
          top: 0,
          left: '50%',
        }}
      >
        <PieChart
          data={pieData}
          parentWidth={320}
          parentHeight={320}
          title="Total volumes"
          value="55.6"
          header="Total Mt CO₂e"
        />
        <Box ml="40px">
          <RangeChart height={400} width={500} title="Range of certainty" />
        </Box>
      </SimpleGrid>
    </InfoSection>
  )
}

export default AnnualEmissions
