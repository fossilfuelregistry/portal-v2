import React, { FC, useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { colors } from '../../assets/theme'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'

const data = [
  {
    label: 'Pre-combustion',
    value: [10, 15, 20],
    v: 20,
  },
  {
    label: 'Combustion',
    value: [30, 35, 40],
    v: 50,
  },
]
const verticalMargin = 120

console.log('data', data)

// accessors
const getLabel = (d: any) => d.label
const getLetterFrequency = (d: any) => d.v

export type BarsProps = {
  width: number
  height: number
}

const RangeChart: FC<BarsProps> = ({ width, height }: BarsProps) => {
  // bounds
  const xMax = width
  const yMax = height - verticalMargin

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLabel),
        padding: 0.4,
      }),
    [xMax]
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, 50],
      }),
    [yMax]
  )

  console.log('yMax', yMax)

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <GridRows
        scale={yScale}
        width={xMax}
        height={yMax + 100}
        numTicks={5}
        stroke={colors.primary.grey10}
      />
      <AxisLeft
        top={0}
        left={0}
        hideAxisLine
        scale={yScale}
        tickStroke="transparent"
        tickLabelProps={() => ({
          fill: colors.primary.grey70,
          fontSize: 14,
          textAnchor: 'middle',
        })}
      />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getLabel(d)
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0)
          console.log('barHeight', barHeight)
          const barX = xScale(letter)
          const barY = yMax - barHeight
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={40}
              height={barHeight}
              fill="#87BFFF"
            />
          )
        })}
      </Group>
      <AxisBottom
        top={yMax + 50}
        left={0}
        scale={xScale}
        tickStroke="transparent"
        hideAxisLine
        tickLabelProps={() => ({
          fill: colors.primary.richBlack,
          fontSize: 14,
          textAnchor: 'middle',
        })}
      />
    </svg>
  )
}

export default RangeChart
