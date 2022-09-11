import React, { FC, useMemo } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { LineIcon } from 'components/Icons'
import Info from 'components/Info'
import { Tooltip, useTooltip } from '@visx/tooltip'
import useText from 'lib/useText'
import { colors } from '../../assets/theme'

const verticalMargin = 60

export type BarsProps = {
  width: number
  height: number
  title: string
  data: any[]
}

// accessors
const getLabel = (d: any) => d.label
const getValue = (d: any) => Number(d.value[2])

const RangeChart: FC<BarsProps> = ({
  width,
  height,
  title,
  data,
}: BarsProps) => {
  // bounds
  const xMax = width
  const yMax = height - verticalMargin

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<any>()

  const { translate } = useText()

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLabel),
        padding: 0.4,
      }),
    [xMax, data]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getValue))],
      }),
    [yMax, data]
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
      <Box position="relative">
        <svg width={width} height={height}>
          <Group top={verticalMargin / 2} left={70}>
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
                    onMouseEnter={() => {
                      showTooltip({
                        // @ts-ignore
                        tooltipLeft: barX + 80,
                        tooltipTop: -(height - barY + 30),
                        tooltipData: d,
                      })
                    }}
                    onMouseLeave={() => {
                      hideTooltip()
                    }}
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
                d={`M5 ${height - verticalMargin} l${width} 0`}
              />
            </g>
            <AxisBottom
              top={height - verticalMargin}
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
              <LineIcon mr="8px" width="12px" />
              Weighted average, pre-combustion:{' '}
              <strong>{tooltipData.value[1].toFixed(2)} Mt CO₂e</strong>
            </Flex>
            <Flex alignItems="center">
              <Box
                w="12px"
                h="12px"
                backgroundColor="#87BFFF"
                borderRadius="100%"
                mr="8px"
              />
              P5 range, pre-combustion:{' '}
              <strong>{tooltipData.value[0].toFixed(2)} Mt CO₂e</strong>
            </Flex>
            <Flex alignItems="center">
              <Box
                w="12px"
                h="12px"
                backgroundColor="#87BFFF"
                borderRadius="100%"
                mr="8px"
              />
              P95 range, pre-combustion:{' '}
              <strong>{tooltipData.value[2].toFixed(2)} Mt CO₂e</strong>
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
            backgroundColor="#87BFFF"
            borderRadius="100%"
            mr="8px"
          />
          P5-P95 range
          <Info text={translate('p5p95')} />
        </Flex>
        <Flex
          alignItems="center"
          mt="16px"
          mr="24px"
          fontSize="14px"
          color={colors.primary.richBlack}
        >
          <LineIcon mr="8px" />
          Weighted average
          <Info />
        </Flex>
      </Flex>
    </Box>
  )
}

export default RangeChart
