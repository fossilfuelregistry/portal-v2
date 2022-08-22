const capitalizeFirstLetter = (str: string): string =>
  str ? str[0].toUpperCase() + str.substring(1) : ''

export default capitalizeFirstLetter
