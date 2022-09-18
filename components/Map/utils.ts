import { Filter } from 'components/Map/MapFilter'
import { ProductionSnapshot } from 'lib/types'

export const calculateFuelEmission = (
  productionSnapshotData: ProductionSnapshot,
  fuel: 'oil' | 'gas' | 'coal'
) =>
  productionSnapshotData[fuel]
    ? // @ts-ignore
      // eslint-disable-next-line no-unsafe-optional-chaining
      (productionSnapshotData[fuel]?.total?.total.wa / 10e7).toFixed(1)
    : 0

export const calculateTotalEmission = (
  productionSnapshotData: ProductionSnapshot
) =>
  Object.keys(productionSnapshotData).reduce(
    (prev, curr) =>
      prev +
      // @ts-ignore
      // eslint-disable-next-line no-unsafe-optional-chaining
      productionSnapshotData[curr].scope1?.total?.wa +
      // @ts-ignore
      // eslint-disable-next-line no-unsafe-optional-chaining
      productionSnapshotData[curr].scope3?.total?.wa,
    0
  )

export const calculateEmission = (
  filters: Filter,
  productionSnapshotData: ProductionSnapshot
) => {
  let total = 0

  if (!filters.fuel && !filters.combustion) {
    total = calculateTotalEmission(productionSnapshotData)
  }

  if (filters.fuel && !filters.combustion) {
    total =
      // @ts-ignore
      (productionSnapshotData[filters.fuel]?.scope1?.total?.wa || 0) +
      // @ts-ignore
      (productionSnapshotData[filters.fuel]?.scope3?.total?.wa || 0)
  }

  if (!filters.fuel && filters.combustion) {
    total = Object.keys(productionSnapshotData).reduce(
      (prev, curr) =>
        prev +
        // @ts-ignore
        (productionSnapshotData?.[curr]?.[filters.combustion]?.total?.wa || 0),
      0
    )
  }

  if (filters.fuel && filters.combustion) {
    total =
      // @ts-ignore
      productionSnapshotData?.[filters.fuel]?.[filters.combustion]?.total.wa ||
      0
  }

  const value = total / 10e6
  return value > 100 ? 100 : value
}
