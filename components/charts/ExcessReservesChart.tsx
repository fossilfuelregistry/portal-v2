import React, { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { BarStack } from '@visx/shape'
import { Group } from '@visx/group'
import { GridRows } from '@visx/grid'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { useTooltip } from '@visx/tooltip'
import { colors } from '../../assets/theme'

type TooltipData = any

export type ExcessReservesChartProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  title: string
}

const defaultMargin = { top: 40, right: 0, bottom: 0, left: 64 }

const data = [
  {
    'Pre-combustion': 0.8,
    Combustion: 0.1,
    fuel: 'Oil',
  },
  {
    'Pre-combustion': 0.7,
    Combustion: 0.9,
    fuel: 'Gas',
  },
  {
    'Pre-combustion': 1,
    Combustion: 0.5,
    fuel: 'Coal',
  },
]
const keys = Object.keys(data[0]).filter((d) => d !== 'fuel')

const totals = data.reduce((allTotals, current: any) => {
  const totalTemperature = keys.reduce((t: any, k) => {
    // eslint-disable-next-line no-param-reassign
    t += Number(current[k])
    return t
  }, 0)
  allTotals.push(totalTemperature)
  return allTotals
}, [] as number[])

// accessors
const getFuel = (d: any) => d.fuel

// scales
const fuelScale = scaleBand<string>({
  domain: data.map(getFuel),
  padding: 0.6,
})
const combustionScale = scaleLinear<number>({
  domain: [0, Math.max(...totals)],
  nice: true,
})
const colorScale = scaleOrdinal<any, string>({
  domain: keys,
  range: ['#4C6EE6', '#87BFFF'],
})

const ExcessReservesChart: FC<ExcessReservesChartProps> = ({
  width,
  height,
  margin = defaultMargin,
  title,
}) => {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>()

  if (width < 10) return null
  // bounds
  const xMax = width - margin.left
  const yMax = height - margin.top - 30

  fuelScale.rangeRound([0, xMax])
  combustionScale.range([yMax, 0])

  return width < 10 ? null : (
    <Box>
      <Heading
        as="h4"
        fontFamily="Roboto"
        fontSize="16px"
        color={colors.primary.richBlack}
        mb="32px"
      >
        {title}
      </Heading>
      <Heading
        as="h6"
        fontFamily="Roboto"
        fontSize="12px"
        color={colors.primary.richBlack}
        mb="24px"
        textTransform="uppercase"
        letterSpacing="1px"
      >
        Intensity
      </Heading>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <GridRows
            scale={combustionScale}
            width={xMax}
            height={yMax}
            numTicks={5}
            stroke={colors.primary.grey10}
          />
          <AxisLeft
            top={4}
            left={-16}
            hideAxisLine
            scale={combustionScale}
            tickStroke="transparent"
            numTicks={5}
            tickLabelProps={() => ({
              fill: colors.primary.grey70,
              fontSize: 14,
              textAnchor: 'middle',
            })}
          />
          <BarStack
            data={data}
            keys={keys}
            x={getFuel}
            xScale={fuelScale}
            yScale={combustionScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={40}
                    fill={bar.color}
                  />
                ))
              )
            }
          </BarStack>
        </Group>
        <g fill="none" strokeWidth="2">
          <path
            stroke="rgba(4, 4, 4, .7)"
            d={`M64 ${height - 30} l${width - 64} 0`}
          />
        </g>
        <AxisBottom
          top={yMax + margin.top}
          left={54}
          scale={fuelScale}
          tickStroke="transparent"
          hideAxisLine
          tickLabelProps={() => ({
            fill: colors.primary.richBlack,
            fontSize: 14,
            textAnchor: 'middle',
          })}
        />
      </svg>
    </Box>
  )
}

export default ExcessReservesChart
