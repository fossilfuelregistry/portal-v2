import { Filter } from 'components/Map/MapFilter'

export const calculateFuelEmission = (productionCo2E: any, fuel: string) =>
  productionCo2E[fuel]
    ? (
        ((productionCo2E[fuel]?.scope1 || 0) +
          (productionCo2E[fuel]?.scope3 || 0)) /
        10e9
      ).toFixed(1)
    : 0

export const calculateTotalEmission = (productionCo2E: any) =>
  Object.keys(productionCo2E).reduce(
    (prev, curr) =>
      prev + productionCo2E[curr].scope1 + productionCo2E[curr].scope3,
    0
  )

export const calculateEmission = (filters: Filter, productionCo2E: any) => {
  let total = 0

  if (!filters.fuel && !filters.combustion) {
    total = calculateTotalEmission(productionCo2E)
  }

  if (filters.fuel && !filters.combustion) {
    total =
      (productionCo2E[filters.fuel]?.scope1 || 0) +
      (productionCo2E[filters.fuel]?.scope3 || 0)
  }

  if (!filters.fuel && filters.combustion) {
    total = Object.keys(productionCo2E).reduce(
      (prev, curr) =>
        prev + (productionCo2E?.[curr]?.[filters.combustion] || 0),
      0
    )
  }

  if (filters.fuel && filters.combustion) {
    total = productionCo2E?.[filters.fuel]?.[filters.combustion] || 0
  }

  const value = total / 10e9
  return value > 100 ? 100 : value
}
