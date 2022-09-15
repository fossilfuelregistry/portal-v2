import { useMemo } from 'react'
import { PIE_CHART_COLORS } from 'components/charts/PieChart'
import { CO2EEmissions, VintageScopes } from 'lib/calculations/types';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

type EmissionsData = {
  sourceId: number;
  production: {
      co2: VintageScopes;
      co2e: CO2EEmissions | null;
      fossilFuelType: "oil" | "coal" | "gas";
      sourceId: number;
      volume: number;
      unit: string;
      year: number;
  }[];
  totalCO2E: number;
}[] | null | undefined

const useVolumes = (emissionsData: EmissionsData, productionSourceId: number) => {
  const volumesData = useMemo(() => {
    const source = emissionsData?.find(d => d.sourceId === productionSourceId)

    if (source) {
      const total = source.production.reduce(
        (prev, curr) =>
          prev + ((curr.co2e?.scope1.total.wa ?? 0) + (curr.co2e?.scope3.total.wa ?? 0)),
        0
      )

      const calculatePercentage = (value: number) => (value * 100) / total

      const productionData = source.production
        .map((p) => [
          {
            label: `${capitalizeFirstLetter(p.fossilFuelType)}, combustion`,
            combustionType: 'combustion',
            fossilFuelType: p.fossilFuelType,
            // @ts-ignore
            fillColor: PIE_CHART_COLORS[p.fossilFuelType].scope3,
            quantity: p.co2e?.scope3.total.wa.toFixed(8),
            percentage: calculatePercentage(p.co2e?.scope3.total.wa as number),
            year: p.year,
          },
          {
            label: `${capitalizeFirstLetter(p.fossilFuelType)}, pre-combustion`,
            combustionType: 'precombustion',
            fossilFuelType: p.fossilFuelType,
            // @ts-ignore
            fillColor: PIE_CHART_COLORS[p.fossilFuelType].scope1,
            quantity: p.co2e?.scope1.total.wa.toFixed(8),
            percentage: calculatePercentage(p.co2e?.scope1.total.wa as number),
            year: p.year,
          },
        ])
        .flat(1)

      return {
        data: productionData,
        total: total.toFixed(2),
      }
    }

    return {
      data: [],
      total: 0,
    }
  }, [emissionsData, productionSourceId])

  return { volumesData }
}

export default useVolumes
