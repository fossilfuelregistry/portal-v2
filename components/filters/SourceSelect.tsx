import React, { FC, useMemo } from 'react'
import Select, { SelectOption } from 'components/Select'
import { SingleValue } from 'chakra-react-select'
import useText from 'lib/useText'

type ProductionSourceSelectProps = {
  sources: any[]
  value: number
  onChange: (option: SingleValue<SelectOption>) => void
  label: string
  showAll?: boolean
  translateName?: boolean
  disabled?: boolean
}

const SourceSelect: FC<ProductionSourceSelectProps> = ({
  sources,
  value,
  onChange,
  label,
  showAll = false,
  translateName = false,
  disabled = false,
}) => {
  const { translate } = useText()

  const options = useMemo(() => {
    const sourcesList = sources.map((s) => ({
      label: translateName ? translate(s.name) : s.name,
      value: s.sourceId,
    }))
    if (showAll) {
      return [
        {
          label: 'All',
          value: 0,
        },
        ...sourcesList,
      ]
    }
    return sourcesList
  }, [sources])

  return (
    <Select
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

export default SourceSelect
