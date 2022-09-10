import React, { FC } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { Tooltip, useTooltip } from '@visx/tooltip'
import Info from 'components/Info'
import { colors } from '../../assets/theme'

const DEBUG = false

export const PIE_CHART_COLORS = {
  oil: {
    scope1: '#87BFFF',
    scope3: 'rgba(135, 191, 255, .5)',
  },
  gas: {
    scope1: '#4C6EE6',
    scope3: 'rgba(76, 110, 230, .5)',
  },
  coal: {
    scope1: '#52B9BF',
    scope3: 'rgba(82, 185, 191, .5)',
  },
}

type PieChartProps = {
  title: string
  parentWidth: number
  parentHeight: number
  header: string
  total: string
  data: any[]
}

const Piechart: FC<PieChartProps> = ({
  parentWidth,
  parentHeight,
  title,
  header,
  total,
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

  DEBUG && console.log('data', data)

  const minimumSize = Math.min(parentWidth, parentHeight)
  const radius = minimumSize / 2
  const whiteSpace = 3
  const innerLabel = 0.95

  return (
    <Box>
      <Heading
        as="h4"
        fontFamily="Roboto"
        fontSize="16px"
        color={colors.primary.richBlack}
        mb="89px"
      >
        {title}
      </Heading>
      <Box position="relative" margin="0 auto" width={parentWidth}>
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
                  const [centroidX, centroidY] = pie.path.centroid(arc)
                  const labelPosX =
                    // eslint-disable-next-line no-nested-ternary
                    centroidX > 0
                      ? centroidX * innerLabel + whiteSpace
                      : centroidX < 0
                      ? centroidX * innerLabel - whiteSpace
                      : centroidX
                  const labelPosY =
                    // eslint-disable-next-line no-nested-ternary
                    centroidY > 0
                      ? centroidY * innerLabel + whiteSpace
                      : centroidY < 0
                      ? centroidY * innerLabel - whiteSpace
                      : centroidY

                  return (
                    <g key={`arc-${arc.data.label}`}>
                      <path
                        d={arcPath}
                        fill={arcFill}
                        onMouseLeave={() => {
                          hideTooltip()
                        }}
                        onMouseEnter={() => {
                          showTooltip({
                            tooltipLeft: labelPosX + parentWidth / 2,
                            tooltipTop: labelPosY - parentHeight / 2,
                            tooltipData: arc.data,
                          })
                        }}
                      />
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
              {total}
            </text>
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
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 16,
              paddingRight: 16,
              color: colors.primary.richBlack,
              fontSize: '14px',
              fontWeight: 'normal',
              display: 'inline-block',
              pointerEvents: 'none',
            }}
          >
            <Flex alignItems="center">
              <Box
                w="12px"
                h="12px"
                backgroundColor={tooltipData.fillColor}
                borderRadius="100%"
                mr="8px"
              />
              {tooltipData.label}:
              <strong style={{ marginLeft: '4px' }}>
                {' '}
                {tooltipData.quantity} Mt CO₂e
              </strong>
            </Flex>
          </Tooltip>
        )}
      </Box>
      <Flex alignItems="flex-start" flexWrap="wrap" mt="74px" minHeight="74px">
        {data.map((d) => (
          <Flex
            key={d.label}
            alignItems="center"
            mt="16px"
            mr="24px"
            fontSize="14px"
            color={colors.primary.richBlack}
          >
            <Box
              w="12px"
              h="12px"
              backgroundColor={d.fillColor}
              borderRadius="100%"
              mr="8px"
            />
            {d.label}
            <Info text="sdsdasdasdsadasassa" />
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default Piechart
