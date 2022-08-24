const formatCsvNumber = (number: any) =>
  typeof number === 'number' ? parseFloat(number.toFixed(4)) : undefined

export default formatCsvNumber
