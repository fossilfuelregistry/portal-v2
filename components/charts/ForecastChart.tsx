import React, { useMemo } from 'react'
import { Group } from '@visx/group'
import { AreaStack, LinePath } from '@visx/shape'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { curveLinear } from '@visx/curve'
import { scaleLinear } from '@visx/scale'
import { max } from 'd3-array'
import { GridRows } from '@visx/grid'
import { Heading, Box, Flex } from '@chakra-ui/react'
import { colors } from '../../assets/theme'
import formatCsvNumber from '../../utils/numberFormatter'

const DEBUG = false

const COLORS = {
  oil: {
    past: '#87BFFF',
    reserves: 'rgba(135, 191, 255, .5)',
    contingent: 'rgba(135, 191, 255, .2)',
  },
  gas: {
    past: '#4C6EE6',
    reserves: 'rgba(76, 110, 230, .5)',
    contingent: 'rgba(76, 110, 230, .2)',
  },
  coal: {
    past: '#52B9BF',
    reserves: 'rgba(82, 185, 191, .5)',
    contingent: 'rgba(82, 185, 191, .2)',
  },
}

const settings = {
  year: {
    start: 2010,
    end: 2040,
  },
  openCorporate: {
    endpoint: 'https://api.opencorporates.com',
    web: 'https://opencorporates.com',
  },
  gradesPreferenceOrder: '3x12',
  stableProductionSourceId: 100,
  principalProductionSourceId: { oil: 2, gas: 2, coal: 1 },
  fuelTypeSeparator: '|',
  supportedFuels: ['oil', 'gas', 'coal'],
  fuelsNormalizedVolumeUnit: {
    oil: 'e3bbls',
    coal: 'e3ton',
    gas: 'e9m3',
  },
  gradient6: ['#96E6FA', '#7AC3DC', '#5EA0BF', '#437EA1', '#275B84', '#0B3866'],
}

const margin = { left: 64, top: 10 }

const getYear = (d: any) => d.year
const getY0 = (d: any) => d[0]
const getY1 = (d: any) => d[1]
const getProjection = (d: any) => d.co2

export type ForecastChartProps = {
  width: number
  height: number
  data: any
}

const ForecastChart = ({
  width = 1176,
  height = 500,
  data,
}: ForecastChartProps) => {
  const { productionData, projectionData, projProdData } = data

  const yearScale = scaleLinear({
    range: [0, width - margin.left],
    domain: [settings.year.start, settings.year.end],
  })

  const maxCO2 = useMemo(() => {
    const maxInProductionData =
      max(
        productionData,
        (d: any) => (d.oil ?? 0) + (d.gas ?? 0) + (d.coal ?? 0)
      ) ?? 0
    const maxInProjectionData = max(projectionData, (d: any) => d.co2) ?? 0
    // @ts-ignore
    const maxValue = Math.max(maxInProductionData, maxInProjectionData)
    return maxValue * 1.05
  }, [productionData, projectionData])

  const productionScale = scaleLinear({
    range: [height - 30, 0],
    domain: [0, maxCO2],
  })

  DEBUG && console.log('prod', projProdData)

  // @ts-ignore
  return (
    <Box>
      <Heading
        as="h6"
        fontFamily="Roboto"
        fontSize="12px"
        color={colors.primary.richBlack}
        textTransform="uppercase"
        letterSpacing="1px"
      >
        Mt CO₂e
      </Heading>
      <svg width="100%" height={height} id="CO2Forecast">
        <Group left={margin.left} top={0}>
          <GridRows
            scale={productionScale}
            width={width}
            height={height}
            numTicks={5}
            stroke={colors.primary.grey10}
          />
          <AreaStack
            keys={['oil_c', 'oil_p', 'gas_c', 'gas_p', 'coal_c', 'coal_p']}
            data={projProdData}
            x={(d) => yearScale(getYear(d.data))}
            y0={(d) => productionScale(getY0(d))}
            y1={(d) => productionScale(getY1(d))}
          >
            {({ stacks, path }) =>
              stacks.map((stack) => (
                <path
                  key={`stack-${stack.key}`}
                  d={path(stack) || ''}
                  stroke="transparent"
                  fill={
                    {
                      oil_p: COLORS.oil.reserves,
                      oil_c: COLORS.oil.contingent,
                      gas_p: COLORS.gas.reserves,
                      gas_c: COLORS.gas.contingent,
                      coal_p: COLORS.coal.reserves,
                      coal_c: COLORS.coal.contingent,
                    }[stack.key]
                  }
                />
              ))
            }
          </AreaStack>

          <AreaStack
            keys={['oil', 'gas', 'coal']}
            data={productionData}
            defined={(d) => getY0(d) > 0 || getY1(d) > 0}
            x={(d) => yearScale(getYear(d.data))}
            y0={(d) => productionScale(getY0(d))}
            y1={(d) => productionScale(getY1(d))}
          >
            {({ stacks, path }) =>
              stacks.map((stack) => (
                <path
                  key={`stack-${stack.key}`}
                  d={path(stack) || ''}
                  stroke="transparent"
                  fill={
                    {
                      oil: COLORS.oil.past,
                      gas: COLORS.gas.past,
                      coal: COLORS.coal.past,
                    }[stack.key]
                  }
                />
              ))
            }
          </AreaStack>

          <LinePath
            curve={curveLinear}
            className="projection auth"
            data={projectionData}
            defined={(d) => getProjection(d) > 0}
            x={(d) => yearScale(getYear(d)) ?? 0}
            y={(d) => productionScale(getProjection(d)) ?? 0}
            shapeRendering="geometricPrecision"
          />

          <AxisLeft
            scale={productionScale}
            top={4}
            left={-40}
            hideAxisLine
            numTicks={width > 520 ? 8 : 4}
            tickStroke="transparent"
            tickFormat={(x: any) => formatCsvNumber(x) as any}
            tickLabelProps={(label, pos) => ({
              dx: '0.25em',
              dy: pos === 0 ? -12 : 2,
              fill: colors.primary.grey70,
              fontSize: 14,
              textAnchor: 'start',
            })}
          />

          <AxisBottom
            top={height - 30}
            scale={yearScale}
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

          <g fill="none" strokeWidth="2">
            <path
              stroke="rgba(4, 4, 4, .7)"
              d={`M0 ${height - 30} l${width} 0`}
            />
          </g>
        </Group>
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
            backgroundColor={COLORS.oil.past}
            borderRadius="100%"
            mr="8px"
          />
          Oil historic production
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
            backgroundColor={COLORS.oil.reserves}
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
            backgroundColor={COLORS.gas.past}
            borderRadius="100%"
            mr="8px"
          />
          Gas historic production
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
            backgroundColor={COLORS.gas.reserves}
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
            backgroundColor={COLORS.coal.past}
            borderRadius="100%"
            mr="8px"
          />
          Coal historic production
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
            backgroundColor={COLORS.coal.reserves}
            borderRadius="100%"
            mr="8px"
          />
          Coal proven reserves
        </Flex>
      </Flex>
    </Box>
  )
}

export default ForecastChart
