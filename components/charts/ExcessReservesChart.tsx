import React, { FC } from 'react'
import { Box, Heading, Flex } from '@chakra-ui/react'
import { BarStack } from '@visx/shape'
import { Group } from '@visx/group'
import { GridRows } from '@visx/grid'
import { AxisBottom, AxisRight } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { useTooltip } from '@visx/tooltip'
import { DashIcon, InfoIcon } from 'components/Icons'
import { colors } from '../../assets/theme'

type TooltipData = any

export type ExcessReservesChartProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const defaultMargin = { top: 40, right: 64, bottom: 0, left: 64 }

const data = [
  {
    proven: 300,
    excess: 100,
    forecast: 0,
    fuel: 'Oil',
  },
  {
    proven: 200,
    excess: 0,
    forecast: 100,
    fuel: 'Gas',
  },
  {
    proven: 300,
    excess: 0,
    forecast: 0,
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
  padding: 0.8,
})
const combustionScale = scaleLinear<number>({
  domain: [0, Math.max(...totals)],
  nice: true,
})

const colorScale = scaleOrdinal<any, string>({
  domain: keys,
  range: ['#87BFFF', 'rgba(135, 191, 255, 0.5)'],
})

const ExcessReservesChart: FC<ExcessReservesChartProps> = ({
  width,
  height,
  margin = defaultMargin,
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
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - 30

  fuelScale.rangeRound([0, xMax])
  combustionScale.range([yMax, 0])

  return width < 10 ? null : (
    <Box>
      <Flex justifyContent="space-between" mt="48px">
        <Heading
          as="h6"
          fontFamily="Roboto"
          fontSize="12px"
          color={colors.primary.richBlack}
          mb="24px"
          textTransform="uppercase"
          letterSpacing="1px"
        >
          Year
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
          OverallMt CO₂e
        </Heading>
      </Flex>
      <svg width={width} height={height}>
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="4"
            height="8"
            patternTransform="rotate(-45 2 2)"
          >
            <path d="M -1,2 l 6,0" stroke="#000000" strokeWidth=".5" />
          </pattern>
        </defs>
        <Group top={margin.top} left={margin.left}>
          <GridRows
            scale={combustionScale}
            width={xMax}
            height={yMax}
            numTicks={5}
            stroke={colors.primary.grey10}
          />
          <AxisRight
            top={4}
            left={width - 100}
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
                barStack.bars.map((bar) => {
                  console.log('bar', bar)
                  return (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={40}
                      fill={
                        bar.key === 'forecast'
                          ? 'url(#diagonalHatch)'
                          : bar.color
                      }
                    />
                  )
                })
              )
            }
          </BarStack>
        </Group>
        <g fill="none" strokeWidth="2">
          <path
            stroke="rgba(4, 4, 4, .7)"
            d={`M64 ${height - 30} l${width - 128} 0`}
          />
        </g>
        <g fill="none" stroke="#040404" strokeWidth="2">
          <path strokeDasharray="7,5" d={`M64 148 l${width - 128} 00`} />
        </g>
        <text x="20" y="152" transform="rotate(0)" fontSize={14}>
          2040
        </text>
        <AxisBottom
          top={yMax + margin.top}
          left={56}
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
      <Flex alignItems="flex-start" flexWrap="wrap" mt="40px">
        <Flex
          alignItems="center"
          mt="16px"
          mr="24px"
          fontSize="14px"
          color={colors.primary.richBlack}
        >
          <Box
            w="12px"
            h="12px"
            backgroundColor="#87BFFF"
            borderRadius="100%"
            mr="8px"
          />
          Proven reserves and contingent resources
        </Flex>
        <Flex
          alignItems="center"
          mt="16px"
          mr="24px"
          fontSize="14px"
          color={colors.primary.richBlack}
        >
          <Box
            w="12px"
            h="12px"
            backgroundColor="rgba(135, 191, 255, 0.5)"
            borderRadius="100%"
            mr="8px"
          />
          Excess reserves
        </Flex>
        <Flex
          alignItems="center"
          mt="16px"
          mr="24px"
          fontSize="14px"
          color={colors.primary.richBlack}
        >
          <DashIcon mr="8px" />
          Forecast reserves
          <InfoIcon ml="8px" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default ExcessReservesChart
