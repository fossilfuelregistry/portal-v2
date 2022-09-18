import { ProductionSnapshot } from 'lib/types'

type Geojson = {
  geojson: {
    coordinates: any[]
  }
}

type Combustion = {
  scope1?: number
  scope3?: number
}

export type ProductionCo2E = {
  gas?: Combustion
  oil?: Combustion
  coal?: Combustion
}

export type Country = {
  borders: Geojson
  centroid: Geojson
  en: string
  es: string
  fr: string
  iso3166: string
  iso31662: string
  sv: string
  productionCo2E: ProductionCo2E
  productionSnapshotData: ProductionSnapshot
}
