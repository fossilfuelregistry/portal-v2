import React, { FC } from 'react'
import { Group } from '@visx/group'
import { BarGroup } from '@visx/shape'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { GridRows } from '@visx/grid'
import { colors } from '../../assets/theme'

export type BarGroupProps = {
  data: any[]
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const blue = '#87BFFF'
const green = '#4C6EE6'
const purple = '#52B9BF'

const GroupBarChart: FC<BarGroupProps> = ({
  width,
  height,
  margin = { top: 50, right: 0, bottom: 40, left: 64 },
  data,
}) => {
  // bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom
  const keys = Object.keys(data[0]).filter((d) => d !== 'date')

  // accessors
  const getDate = (d: any) => d.date

  // scales
  const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    padding: 0.31,
  })
  const cityScale = scaleBand<string>({
    domain: keys,
    padding: 0,
  })
  const tempScale = scaleLinear<number>({
    domain: [0, 1],
  })
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [blue, green, purple],
  })

  // update scale output dimensions
  dateScale.rangeRound([0, xMax])
  cityScale.rangeRound([0, dateScale.bandwidth()])
  tempScale.range([yMax, 0])

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={colors.primary.grey2}
        rx={14}
      />
      <Group top={margin.top} left={margin.left}>
        <GridRows
          scale={tempScale}
          width={xMax}
          height={yMax}
          numTicks={5}
          stroke={colors.primary.grey10}
        />
        <AxisLeft
          top={4}
          left={-16}
          hideAxisLine
          scale={tempScale}
          tickStroke="transparent"
          numTicks={5}
          tickLabelProps={() => ({
            fill: colors.primary.grey70,
            fontSize: 14,
            textAnchor: 'middle',
          })}
        />
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={getDate}
          x0Scale={dateScale}
          x1Scale={cityScale}
          yScale={tempScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group
                key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                left={barGroup.x0}
              >
                {barGroup.bars.map((bar) => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={40}
                    height={bar.height}
                    fill={bar.color}
                    rx={0}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        left={64}
        scale={dateScale}
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

export default GroupBarChart
