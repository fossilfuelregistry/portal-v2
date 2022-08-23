import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import InfoSection from 'components/InfoSection'
import Select from 'components/Select'
import GroupBarChart from 'components/charts/GroupBarChart'

const data = [
  {
    Oil: '0.8',
    Gas: '0.6',
    Coal: '0.4',
    date: '2010',
  },
  {
    Oil: '0.2',
    Gas: '0.6',
    Coal: '0.8',
    date: '2012',
  },
  {
    Oil: '0.2',
    Gas: '0.6',
    Coal: '0.8',
    date: '2014',
  },
  {
    Oil: '0.2',
    Gas: '0.4',
    Coal: '0.8',
    date: '2016',
  },
  {
    Oil: '0.6',
    Gas: '0.4',
    Coal: '0.4',
    date: '2018',
  },
  {
    Oil: '0.6',
    Gas: '0.6',
    Coal: '0.4',
    date: '2020',
  },
]

const productionOptions = [
  {
    label: 'EIA',
    value: 'EIA',
  },
]

const HistoricProduction = () => (
    <InfoSection title="Historic production">
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <Select
          label="Historic production source"
          value={productionOptions[0].value}
          options={productionOptions}
          onChange={() => {}}
        />
      </SimpleGrid>
      <Box mb="40px" position="relative">
        <GroupBarChart data={data} width={1176} height={400} />
      </Box>
    </InfoSection>
  )

export default HistoricProduction
