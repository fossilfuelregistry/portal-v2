import React, { FC } from 'react'
import { Group } from '@visx/group'
import { BarGroup } from '@visx/shape'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { Heading, Box, Flex } from '@chakra-ui/react'
import { GridRows } from '@visx/grid'
import Info from 'components/Info'
import { Tooltip, useTooltip } from '@visx/tooltip'
import { colors } from '../../assets/theme'

export type BarGroupProps = {
  data: any[]
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const DEBUG = false

const oilColor = '#87BFFF'
const gasColor = '#4C6EE6'
const coalColor = '#52B9BF'

const GroupBarChart: FC<BarGroupProps> = ({
  width,
  height,
  margin = { top: 50, right: 0, bottom: 40, left: 64 },
  data,
}) => {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<any>()

  // bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom
  const keys = Object.keys(data[0]).filter((d) => d !== 'date')
  // Temporary solution
  const values = data.map((d) => [d.Oil, d.Gas, d.Coal]).flat(1)

  // accessors
  const getDate = (d: any) => d.date

  // scales
  const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    padding: 0.31,
  })
  const fuelScale = scaleBand<string>({
    domain: keys,
    padding: 0,
  })
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...values)],
  })
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [oilColor, gasColor, coalColor],
  })

  // update scale output dimensions
  dateScale.rangeRound([0, xMax])
  fuelScale.rangeRound([0, dateScale.bandwidth()])
  yScale.range([yMax, 0])

  return width < 10 ? null : (
    <Box>
      <Heading
        as="h6"
        fontFamily="Roboto"
        fontSize="12px"
        color={colors.primary.richBlack}
        mb="24px"
        textTransform="uppercase"
        letterSpacing="1px"
      >
        Mt CO₂e
      </Heading>
      <Box position="relative">
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
              scale={yScale}
              width={xMax}
              height={yMax}
              numTicks={5}
              stroke={colors.primary.grey10}
            />
            <AxisLeft
              top={4}
              left={-16}
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
            <BarGroup
              data={data}
              keys={keys}
              height={yMax}
              x0={getDate}
              x0Scale={dateScale}
              x1Scale={fuelScale}
              yScale={yScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                    onMouseEnter={() => {
                      DEBUG && console.log('barGroup.x0', barGroup)
                      showTooltip({
                        // @ts-ignore
                        tooltipLeft: barGroup.x0,
                        tooltipTop: -100,
                        tooltipData: barGroup,
                      })
                    }}
                    onMouseLeave={() => {
                      hideTooltip()
                    }}
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
            <g fill="none" strokeWidth="2">
              <path
                stroke="rgba(4, 4, 4, .7)"
                d={`M0 ${height - 90} l${width} 0`}
              />
            </g>
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
        {tooltipData && tooltipOpen && (
          <Tooltip
            style={{
              position: 'absolute',
              transition: 'all 0.2s ease',
              transform: `translate(calc(${tooltipLeft}px - 50%), calc(${tooltipTop}px - 50%))`,
              backgroundColor: colors.primary.grey10,
              borderRadius: 0,
              padding: 16,
              color: colors.primary.richBlack,
              fontSize: '14px',
              fontWeight: 'normal',
              display: 'inline-block',
              pointerEvents: 'none',
              zIndex: 999999,
            }}
          >
            <Flex alignItems="center">
              <Box
                w="12px"
                h="12px"
                backgroundColor={oilColor}
                borderRadius="100%"
                mr="8px"
              />
              Oil production::{' '}
              <strong>{tooltipData.bars[0].value.toFixed(2)} Mt CO₂e</strong>
            </Flex>
            <Flex alignItems="center">
              <Box
                w="12px"
                h="12px"
                backgroundColor={gasColor}
                borderRadius="100%"
                mr="8px"
              />
              Gas production::{' '}
              <strong>{tooltipData.bars[1].value.toFixed(2)} Mt CO₂e</strong>
            </Flex>
            <Flex alignItems="center">
              <Box
                w="12px"
                h="12px"
                backgroundColor={coalColor}
                borderRadius="100%"
                mr="8px"
              />
              Coal production::{' '}
              <strong>{tooltipData.bars[2].value.toFixed(2)} Mt CO₂e</strong>
            </Flex>
          </Tooltip>
        )}
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
            backgroundColor={oilColor}
            borderRadius="100%"
            mr="8px"
          />
          Oil
          <Info />
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
            backgroundColor={gasColor}
            borderRadius="100%"
            mr="8px"
          />
          Gas
          <Info />
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
            backgroundColor={coalColor}
            borderRadius="100%"
            mr="8px"
          />
          Coal
          <Info />
        </Flex>
      </Flex>
    </Box>
  )
}

export default GroupBarChart
