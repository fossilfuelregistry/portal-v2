import { useMemo } from 'react'

const useRangeOfCertainty = (
  emissionsData: any,
  productionSourceId: number
) => {
  const rangeData = useMemo(() => {
    const source = emissionsData.find(
      (d: any) => d.sourceId === productionSourceId
    )

    if (source) {
      return source.production.reduce((prev: any, curr: any) => {
        const { p5: p5S1, wa: waS1, p95: p95S1 } = curr.co2e.scope1.total
        const { p5: p5S3, wa: waS3, p95: p95S3 } = curr.co2e.scope3.total
        const totalP5 = p5S1 + p5S3
        const totalWa = waS1 + waS3
        const totalP95 = p95S1 + p95S3

        if (!prev.length) {
          return [
            {
              value: [p5S1, waS1, p95S1],
              label: 'Pre-combustion',
            },
            {
              value: [p5S3, waS3, p95S3],
              label: 'Combustion',
            },
            {
              value: [totalP5, totalWa, totalP95],
              label: 'Total',
            },
          ]
        }

        return [
          {
            value: [
              p5S1 + prev[1].value[0],
              waS1 + prev[1].value[1],
              p95S1 + prev[1].value[2],
            ],
            label: 'Pre-combustion',
          },
          {
            value: [
              p5S3 + prev[0].value[0],
              waS3 + prev[0].value[1],
              p95S3 + prev[0].value[2],
            ],
            label: 'Combustion',
          },
          {
            value: [
              totalP5 + prev[2].value[0],
              totalWa + prev[2].value[1],
              totalP95 + prev[2].value[2],
            ],
            label: 'Total',
          },
        ]
      }, [])
    }

    return []
  }, [emissionsData, productionSourceId])

  return { rangeData }
}

export default useRangeOfCertainty
