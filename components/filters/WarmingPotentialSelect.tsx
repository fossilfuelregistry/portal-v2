import React, { FC } from 'react'
import Select, { SelectOption } from 'components/Select'
import { SingleValue } from 'chakra-react-select'
import useText from 'lib/useText'

export enum WarmingPotential {
  GWP100 = 'GWP100',
  GWP20 = 'GWP20',
}

type WarmingPotentialSelectProps = {
  value: string
  onChange: (option: SingleValue<SelectOption>) => void
  tooltip?: string
}

const options = [
  { label: WarmingPotential.GWP100, value: WarmingPotential.GWP100 },
  { label: WarmingPotential.GWP20, value: WarmingPotential.GWP20 },
]

const WarmingPotentialSelect: FC<WarmingPotentialSelectProps> = ({
  value,
  onChange,
  tooltip,
}) => {
  const { translate } = useText()

  return (
    <Select
      tooltip={tooltip}
      label={translate('carbon_intensity')}
      value={value || options[0].value}
      options={options}
      onChange={onChange}
    />
  )
}

export default WarmingPotentialSelect
