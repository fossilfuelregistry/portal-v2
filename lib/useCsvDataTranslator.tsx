import React from 'react'
import useText from 'lib/useText'

const useCsvDataTranslator = () => {
  // @ts-ignore
  const { translate } = useText()

  const generateCsvTranslation = (data: any) => {
    const prefix = 'csv_key_'
    const keys = Object.keys(data)
    const obj = {}

    keys.forEach((key) => {
      switch (key.toLowerCase()) {
        case 'fuel':
        case 'fossilfueltype':
          // @ts-ignore
          obj[translate(`fossil_fuel_type`)] = translate(data[key])
          break

        case 'scenario':
          // @ts-ignore
          obj[translate(`${prefix}${key}`) || key] = translate(data[key])
          break

        case 'oil':
        case 'gas':
        case 'coal':
          // @ts-ignore
          obj[translate(key)] = data[key]
          break

        default:
          // @ts-ignore
          obj[translate(`${prefix}${key}`) || key] = data[key]
          break
      }
    })
    return obj
  }
  return { generateCsvTranslation }
}

export default useCsvDataTranslator
