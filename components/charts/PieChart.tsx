import React, { FC } from 'react'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { colors } from '../../assets/theme'

const data = [
  {
    fillColor: '#87BFFF',
    fuel: 'oil',
    label: 'Oil, combustion',
    percentage: 10,
    quantity: 80.89075427268527,
    year: 2020,
  },
  {
    fillColor: 'rgba(135, 191, 255, .5)',
    fuel: 'oil',
    label: 'Oil, pre-combustion',
    percentage: 10,
    quantity: 18.970718369092925,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: '#4C6EE6',
    fuel: 'gas',
    label: 'Gas, combustion',
    percentage: 30,
    quantity: 80.69994536364122,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: 'rgba(76, 110, 230, .5)',
    fuel: 'gas',
    label: 'Gas, pre-combustion',
    percentage: 10,
    quantity: 25.76536098012795,
    subtype: undefined,
    year: 2020,
  },
  {
    fillColor: '#52B9BF',
    fuel: 'coal',
    label: 'Coal, combustion',
    percentage: 30,
    quantity: 0.03761302232599879,
    year: 2020,
  },
  {
    fillColor: 'rgba(82, 185, 191, .5)',
    fuel: 'coal',
    label: 'Coal, pre-combustion',
    percentage: 10,
    quantity: 0.0034353627768523866,
    year: 2020,
  },
]

type PieChartProps = {
  parentWidth: number
  parentHeight: number
  header: string
  value: string
}

const PieChart: FC<PieChartProps> = ({
  parentWidth,
  parentHeight,
  header,
  value,
}) => {
  const minimumSize = Math.min(parentWidth, parentHeight)
  const radius = minimumSize / 2

  return (
    <svg width={parentWidth} height={parentHeight}>
      <Group top={parentHeight / 2} left={parentWidth / 2}>
        <Pie
          data={data}
          pieValue={(d) => d.percentage}
          outerRadius={radius}
          innerRadius={0.6 * radius}
          cornerRadius={3}
          padAngle={0.005}
          pieSort={null}
          pieSortValues={null}
        >
          {(pie) =>
            pie.arcs.map((arc) => {
              const arcPath = pie.path(arc) as string
              const arcFill = arc.data.fillColor
              return (
                <g key={`arc-${arc.data.label}`}>
                  <path d={arcPath} fill={arcFill} />
                </g>
              )
            })
          }
        </Pie>
      </Group>
      <Group top={parentHeight / 2} left={parentWidth / 2}>
        <text
          x={0}
          y={-10}
          fill={colors.primary.richBlack}
          fontSize={18}
          fontFamily="Roboto"
          textAnchor="middle"
        >
          {header}
        </text>
        <text
          x={0}
          y={25}
          fill={colors.primary.richBlack}
          fontSize={32}
          fontFamily="sommet-rounded"
          fontWeight="bold"
          textAnchor="middle"
        >
          {value}
        </text>
      </Group>
    </svg>
  )
}

export default PieChart
