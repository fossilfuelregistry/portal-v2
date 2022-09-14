import React, { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { BarStackHorizontal } from '@visx/shape'
import { Group } from '@visx/group'
import { AxisBottom } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { useTooltip } from '@visx/tooltip'
import { colors } from '../../assets/theme'

type TooltipData = any

export type BarStackProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const COLORS = {
  'Oil-proven': '#87BFFF',
  'Oil-reserves': 'rgba(135, 191, 255, .5)',
  'Gas-proven': '#4C6EE6',
  'Gas-reserves': 'rgba(76, 110, 230, .5)',
  'Coal-proven': '#52B9BF',
  'Coal-reserves': 'rgba(82, 185, 191, .5)',
}

const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 }

const data = [
  {
    proven: 2028,
    reserves: 2,
    fuel: 'Coal',
  },
  {
    proven: 2031,
    reserves: 4,
    fuel: 'Gas',
  },
  {
    proven: 2035,
    reserves: 2,
    fuel: 'Oil',
  },
]
const keys = Object.keys(data[0]).filter((d) => d !== 'fuel')

// accessors
const getFuel = (d: any) => d.fuel

// scales
const fuelScale = scaleBand<string>({
  domain: data.map(getFuel),
  padding: 0.6,
})

const yearsScale = scaleLinear<number>({
  domain: [2022, 2040],
  nice: true,
})

const colorScale = scaleOrdinal<any, string>({
  domain: keys,
  range: ['#4C6EE6', '#87BFFF'],
})

const HorizontalBarStackChart: FC<BarStackProps> = ({
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
  const xMax = width - margin.left
  const yMax = height - margin.top - 30

  yearsScale.rangeRound([0, xMax])
  fuelScale.range([yMax, 0])

  return width < 10 ? null : (
    <Box>
      <Box ml="80px" position="relative">
        <svg width={width} height={height}>
          <Group top={margin.top} left={0}>
            <BarStackHorizontal
              data={data}
              keys={keys}
              y={getFuel}
              xScale={yearsScale}
              yScale={fuelScale}
              color={colorScale}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar, index) => {
                    return (
                      <>
                        <rect
                          key={`bar-stack-${barStack.index}-${bar.index}`}
                          x={bar.x}
                          y={bar.y}
                          height={40}
                          width={bar.width}
                          // @ts-ignore
                          fill={COLORS[`${bar.bar.data.fuel}-${bar.key}`]}
                        />
                        {bar.key === 'reserves' && (
                          <text
                            x={bar.x + bar.width + 28}
                            y={bar.y + 28}
                            fill={colors.primary.richBlack}
                            fontSize={18}
                            fontFamily="Roboto"
                            textAnchor="middle"
                            fontWeight="700"
                          >
                            {bar.bar[1]}
                          </text>
                        )}
                      </>
                    )
                  })
                )
              }
            </BarStackHorizontal>
          </Group>
          <g fill="none" strokeWidth="2">
            <path
              stroke="rgba(4, 4, 4, .7)"
              d={`M0 ${height - 30} l${width} 0`}
            />
          </g>
          <AxisBottom
            top={yMax + margin.top}
            scale={yearsScale}
            tickStroke="transparent"
            numTicks={width > 520 ? 8 : 4}
            hideAxisLine
            tickFormat={(x: any) => `${x?.toFixed(0)}`}
            tickLabelProps={(label, pos, ticks) => {
              let dx = 0
              if (pos === 0) dx = 15
              // eslint-disable-next-line no-unsafe-optional-chaining
              if (pos === ticks?.length - 1) dx = -15
              return {
                dx,
                dy: '0.25em',
                fill: colors.primary.richBlack,
                fontSize: 14,
                textAnchor: 'middle',
              }
            }}
          />
        </svg>
        <Box position="absolute" left="-48px" top="108px" textAlign="right">
          <Box color={colors.primary.grey70} fontSize={14}>
            Oil
          </Box>
          <Box color={colors.primary.grey70} fontSize={14} mt="100px">
            Gas
          </Box>
          <Box color={colors.primary.grey70} fontSize={14} mt="100px">
            Coal
          </Box>
        </Box>
      </Box>
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
            backgroundColor={COLORS['Oil-proven']}
            borderRadius="100%"
            mr="8px"
          />
          Oil proven reserves
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
            backgroundColor={COLORS['Oil-reserves']}
            borderRadius="100%"
            mr="8px"
          />
          Oil contingent resources
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
            backgroundColor={COLORS['Gas-proven']}
            borderRadius="100%"
            mr="8px"
          />
          Gas proven reserves
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
            backgroundColor={COLORS['Gas-reserves']}
            borderRadius="100%"
            mr="8px"
          />
          Gas contingent resources
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
            backgroundColor={COLORS['Coal-proven']}
            borderRadius="100%"
            mr="8px"
          />
          Coal proven resources
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
            backgroundColor={COLORS['Coal-reserves']}
            borderRadius="100%"
            mr="8px"
          />
          Coal contingent resources
        </Flex>
      </Flex>
    </Box>
  )
}

export default HorizontalBarStackChart
