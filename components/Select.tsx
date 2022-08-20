import React, { FC, useMemo } from 'react'
import {
  Select as ChakraSelect,
  OptionBase,
  SingleValue,
} from 'chakra-react-select'
import { Box } from '@chakra-ui/react'
import type { CSSObject } from '@chakra-ui/system'
import { colors } from '../assets/theme'

export interface SelectOption extends OptionBase {
  value: string
  label: string
}

type SelectProps = {
  label?: string
  height?: string
  value: string | number | null
  options: SelectOption[]
  onChange: (newValue: SingleValue<SelectOption>) => void
}

const Select: FC<SelectProps> = ({
  label,
  value,
  height = '40px',
  options,
  onChange,
}) => {
  const chakraStyles = {
    container: (provided: CSSObject, state: any) => ({
      ...provided,
      border: state.isFocused
        ? `1px solid ${colors.primary.brandingBlue}`
        : `1px solid ${colors.primary.grey25}`,
      background: colors.common.white,
      width: '100%',
      borderRadius: '3px',
      outline: 'none !important',
      height,
    }),
    control: (provided: CSSObject) => ({
      ...provided,
      borderRadius: '3px',
      padding: '0 8px 0 12px',
      boxShadow: 'none !important',
      border: 'none',
      height: '100%',
      minHeight: 'auto',
    }),
    placeholder: (provided: CSSObject) => ({
      ...provided,
      color: colors.primary.grey70,
    }),
    singleValue: (provided: CSSObject) => ({
      ...provided,
      fontWeight: '400',
      fontSize: '16px',
      color: colors.primary.richBlack,
    }),
    valueContainer: (provided: CSSObject) => ({
      ...provided,
      padding: '0',
      fontSize: '14px',
    }),
    indicatorSeparator: (provided: CSSObject) => ({
      ...provided,
      display: 'none',
      padding: '0',
    }),
    menu: (provided: CSSObject) => ({
      ...provided,
      background: colors.common.white,
      overflow: 'hidden',
      zIndex: '2',
      marginTop: '2px',
      p: '0',
      borderRadius: '3px',
    }),
    menuList: (provided: CSSObject) => ({
      ...provided,
      boxShadow: 'none',
      p: '0',
      borderRadius: '3px',
    }),
    option: (provided: CSSObject, state: any) => ({
      ...provided,
      marginTop: '0',
      color: colors.primary.richBlack,
      cursor: 'pointer',
      fontSize: '16px',
      // eslint-disable-next-line no-nested-ternary
      background: state.isSelected
        ? colors.primary.blue10
        : state.isFocused
        ? colors.primary.grey10
        : '',
      borderBottom: `1px solid ${colors.primary.grey10}`,
    }),
    dropdownIndicator: (provided: CSSObject) => ({
      ...provided,
      padding: '0',
      background: 'transparent',
    }),
  }

  const selectedValue = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  )

  return (
    <Box w="100%">
      {label && (
        <Box fontSize="16px" mb="4px" color={colors.primary.richBlack}>
          {label}
        </Box>
      )}
      <ChakraSelect
        size="md"
        chakraStyles={chakraStyles}
        isSearchable
        value={selectedValue}
        options={options}
        onChange={onChange}
      />
    </Box>
  )
}

export default Select
