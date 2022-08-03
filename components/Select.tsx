import React from 'react'
import { Select as ChakraSelect } from 'chakra-react-select'
import { colors } from '../assets/theme'

const Select = ({
  value,
  height = '40px',
  options,
  placeholder = '',
  onChange,
}) => {
  const chakraStyles = {
    container: (provided, state) => ({
      ...provided,
      border: state.isFocused
        ? `1px solid ${colors.primary.brandingBlue}`
        : `1px solid ${colors.primary.grey25}`,
      background: colors.common.white,
      width: '100%',
      borderRadius: '3px',
      height,
    }),
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      borderRadius: '3px',
      padding: '0 8px 0 12px',
      boxShadow: 'none !important',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#959494',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontWeight: '400',
      fontSize: '16px',
      color: colors.primary.richBlack,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: '0',
      fontSize: '14px',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
      padding: '0',
    }),
    menu: (provided, state) => ({
      ...provided,
      background: colors.common.white,
      overflow: 'hidden',
      zIndex: '2',
      marginTop: '2px',
      p: '0',
      borderRadius: '3px',
    }),
    menuList: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      color: colors.primary.richBlack,
      cursor: 'pointer',
      fontSize: '16px',
      background: state.isSelected
        ? colors.primary.blue10
        : state.isFocused
        ? colors.primary.grey10
        : '',
      borderBottom: `1px solid ${colors.primary.grey10}`,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: '0',
      background: 'transparent',
    }),
  }

  return (
    <ChakraSelect
      size="md"
      chakraStyles={chakraStyles}
      isSearchable
      value={value}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default Select
