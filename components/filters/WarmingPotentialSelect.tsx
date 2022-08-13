import React from 'react'
import Select from 'components/Select'

const options = [
  { label: 'GWP100', value: 'GWP100' },
  { label: 'GWP20', value: 'GWP20' },
]

const WarmingPotentialSelect = () => {
  return (
    <Select
      label="Warming potential"
      value={options[0]}
      options={options}
      onChange={() => {}}
    />
  )
}

export default WarmingPotentialSelect
