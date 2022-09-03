import React, { FC, useMemo } from 'react'
import Select, { SelectOption } from 'components/Select'
import { SingleValue } from 'chakra-react-select'

type ProductionSourceSelectProps = {
  sources: any[]
  value: number
  onChange: (option: SingleValue<SelectOption>) => void
  label: string
  showAll?: boolean
}

const SourceSelect: FC<ProductionSourceSelectProps> = ({
  sources,
  value,
  onChange,
  label,
  showAll = false,
}) => {
  const options = useMemo(() => {
    const sourcesList = sources.map((s) => ({
      label: s.name,
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
    <Select label={label} value={value} options={options} onChange={onChange} />
  )
}

export default SourceSelect
