import React from 'react'
import InfoSection from 'components/InfoSection'
import LineChart from 'components/charts/LineChart'

const HistoricalSection = () => {
  return (
    <InfoSection title="Historical Oil production">
      <LineChart title="Million barrels" fuel="oil" width={1176} height={400} />
    </InfoSection>
  )
}

export default HistoricalSection
