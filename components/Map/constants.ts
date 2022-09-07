import { SelectOption } from 'components/Select'

export const GLOBAL_OPTION = {
  value: 'global',
  label: 'Global',
}

export const COMBUSTION_OPTIONS: SelectOption[] = [
  {
    label: 'Combustion & Pre-combustion',
    value: '',
  },
  {
    label: 'Pre-combustion',
    value: 'scope1',
  },
  {
    label: 'Combustion',
    value: 'scope3',
  },
]

export const FUEL_OPTIONS: SelectOption[] = [
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
