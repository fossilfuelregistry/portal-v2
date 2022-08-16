import { isString } from 'fp-ts/lib/string'

// eslint-disable-next-line import/prefer-default-export
export const isCountryString = (countryCode: unknown): countryCode is string =>
  isString(countryCode) && countryCode.length === 2
