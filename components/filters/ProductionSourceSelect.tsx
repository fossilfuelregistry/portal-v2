import React, { FC, useMemo } from 'react'
import Select, { SelectOption } from 'components/Select'
import { SingleValue } from 'chakra-react-select'

type ProductionSourceSelectProps = {
  sources: any[]
  value: number
  onChange: (option: SingleValue<SelectOption>) => void
}

const ProductionSourceSelect: FC<ProductionSourceSelectProps> = ({
  sources,
  value,
  onChange,
}) => {
  const options = useMemo(
    () => sources.map((s) => ({ label: s.name, value: s.sourceId })),
    [sources]
  )

  return (
    <Select
      label="Production estimates source"
      value={value}
      options={options}
      onChange={onChange}
    />
  )
}

export default ProductionSourceSelect
