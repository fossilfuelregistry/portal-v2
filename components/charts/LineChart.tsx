import React, { FC } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { curveLinear } from '@visx/curve'
import { scaleLinear } from '@visx/scale'
import { max, min } from 'd3-array'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import Info from 'components/Info'
import useText from 'lib/useText'
import { colors } from '../../assets/theme'

type LineChartProps = {
  title: string
  width: number
  height: number
  data: any
  allSources: any[]
}

const COLORS: any = {
  1: '#4C6EE6',
  2: '#52B9BF',
  3: '#87BFFF',
  4: '#81D986',
}

const LineChart: FC<LineChartProps> = ({
  width,
  height,
  title,
  data,
  allSources,
}) => {
  const { years, sources, dataset, max: yMax } = data
  const margin = { left: 64, top: 20 }

  const { translate } = useText()

  const getYear = (d: any) => d.year
  const getY = (src: any, d: any) => d[src] ?? 0

  // scales
  const yearScale = scaleLinear({
    range: [0, width - margin.left],
    // @ts-ignore
    domain: [min(years), max(years)],
  })

  const yScale = scaleLinear({
    range: [height - 25, 0],
    domain: [0, yMax],
  })

  return (
    <Box>
      <Heading
        as="h4"
        fontFamily="Roboto"
        fontSize="12px"
        color={colors.primary.richBlack}
        mb="24px"
        letterSpacing="1px"
        textTransform="uppercase"
      >
        {title}
      </Heading>
      <svg width={width} height={height + margin.top}>
        <Group left={margin.left} top={10}>
          <GridRows
            scale={yScale}
            width={width}
            height={height - 30}
            numTicks={5}
            stroke={colors.primary.grey10}
          />
          {sources.map((s: any) => (
              <LinePath
                key={s}
                curve={curveLinear}
                className="history-curve"
                data={dataset}
                defined={(d) => getY(s, d) > 0}
                x={(d) => yearScale(getYear(d)) ?? 0}
                y={(d) => yScale(getY(s, d)) ?? 0}
                shapeRendering="geometricPrecision"
                stroke={COLORS[s]}
              />
            ))}
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
          <AxisBottom
            top={height - margin.top}
            left={20}
            scale={yearScale}
            tickStroke="transparent"
            hideAxisLine
            numTicks={10}
            tickFormat={(x: any) => `${x?.toFixed(0)}`}
            tickLabelProps={(label, pos, ticks) => {
              let dx = 0
              if (pos === 0) dx = -5
              // eslint-disable-next-line no-unsafe-optional-chaining
              if (pos === ticks?.length - 1) dx = -25
              return {
                dx,
                dy: '0.25em',
                fill: colors.primary.richBlack,
                fontSize: 14,
                textAnchor: 'middle',
              }
            }}
          />
          <g fill="none" strokeWidth="2">
            <path
              stroke="rgba(4, 4, 4, .7)"
              d={`M0 ${height - 26} l${width} 0`}
            />
          </g>
        </Group>
      </svg>
      <Flex alignItems="flex-start" flexWrap="wrap" mt="40px">
        {allSources
          .filter((s) => sources.includes(s.sourceId))
          .map((s) => (
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
                backgroundColor={COLORS[s.sourceId]}
                borderRadius="100%"
                mr="8px"
              />
              {s.name}
              <Info text={translate(s?.name?.toLowerCase())} />
            </Flex>
          ))}
      </Flex>
    </Box>
  )
}

export default LineChart
