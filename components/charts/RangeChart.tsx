import React, { FC, useMemo } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { colors } from '../../assets/theme'

const data = [
  {
    value: [10, 20, 30],
    label: 'Pre-combustion',
  },
  {
    value: [50, 60, 70],
    label: 'Combustion',
  },
  {
    value: [60, 80, 100],
    label: 'Total',
  },
]
const verticalMargin = 60

export type BarsProps = {
  width: number
  height: number
  title: string
}

// accessors
const getLabel = (d: any) => d.label
const getValue = (d: any) => Number(d.value[2])

const RangeChart: FC<BarsProps> = ({ width, height, title }: BarsProps) => {
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
        domain: [0, Math.max(...data.map(getValue))],
      }),
    [yMax]
  )

  return width < 10 ? null : (
    <Box>
      <Heading
        as="h4"
        fontFamily="Roboto"
        fontSize="16px"
        color={colors.primary.richBlack}
        mb="40px"
      >
        {title}
      </Heading>
      <Heading
        as="h6"
        fontFamily="Roboto"
        fontSize="12px"
        color={colors.primary.richBlack}
        mb="24px"
      >
        KT CO₂e
      </Heading>
      <svg width={width} height={height}>
        <Group top={verticalMargin / 2} left={50}>
          <GridRows
            scale={yScale}
            width={xMax}
            height={yMax}
            numTicks={5}
            stroke={colors.primary.grey10}
          />
          <AxisLeft
            top={4}
            left={-20}
            hideAxisLine
            scale={yScale}
            tickStroke="transparent"
            numTicks={5}
            tickLabelProps={() => ({
              fill: colors.primary.grey70,
              fontSize: 14,
              textAnchor: 'middle',
            })}
          />
          {data.map((d) => {
            const label = getLabel(d)
            const barHeight = yMax - (yScale(d.value[2] - d.value[0]) ?? 0)
            const barX = xScale(label)
            const barY = yMax - (yMax - (yScale(d.value[2]) ?? 0))
            const middlePoint = yMax - (yMax - (yScale(d.value[1]) ?? 0))
            return (
              <>
                <Bar
                  key={`bar-${label}`}
                  x={barX}
                  y={barY}
                  width={40}
                  height={barHeight}
                  fill="#87BFFF"
                />
                <g fill="none" stroke="#040404" strokeWidth="2">
                  <path
                    strokeDasharray="7,5"
                    d={`M${barX} ${middlePoint} l40 00`}
                  />
                </g>
              </>
            )
          })}
          <g fill="none" strokeWidth="2">
            <path
              stroke="rgba(4, 4, 4, .7)"
              d={`M5 ${height - 60} l${width} 0`}
            />
          </g>
          <AxisBottom
            top={height - 60}
            left={-25}
            scale={xScale}
            tickStroke="transparent"
            hideAxisLine
            tickLabelProps={() => ({
              fill: colors.primary.richBlack,
              fontSize: 14,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
    </Box>
  )
}

export default RangeChart
