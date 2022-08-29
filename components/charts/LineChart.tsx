import React, { FC } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { curveLinear } from '@visx/curve'
import { scaleLinear } from '@visx/scale'
import { max, min } from 'd3-array'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { colors } from '../../assets/theme'
import { DashIcon, InfoIcon } from 'components/Icons'

type LineChartProps = {
  title: string
  width: number
  height: number
  fuel: string
}

const COLORS = ['#87BFFF', '#4C6EE6', '#52B9BF', '#81D986']

const LineChart: FC<LineChartProps> = ({ width, height, title, fuel }) => {
  const years: any = [
    1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
    1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
    1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
    2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
    2018, 2019, 2020,
  ]
  const sources: any = [3, 2]
  const dataset: any = [
    { '3': 0.04, year: 1970 },
    { '3': 0.044, year: 1971 },
    { '3': 0.057, year: 1972 },
    { '3': 0.065, year: 1973 },
    { '3': 0.068, year: 1974 },
    { '3': 0.07, year: 1975 },
    { '3': 0.02, year: 1976 },
    { '3': 0.06, year: 1977 },
    { '3': 0.08, year: 1978 },
    { '3': 0.08, year: 1979 },
    { '2': 0.26051498872, '3': 0.26, year: 1980 },
    { '2': 0.24918825008000003, '3': 0.25, year: 1981 },
    { '2': 0.283168466, '3': 0.25, year: 1982 },
    { '2': 0.3398021592, '3': 0.3, year: 1983 },
    { '2': 0.3398021592, '3': 0.34, year: 1984 },
    { '2': 0.3681190058, '3': 0.38, year: 1985 },
    { '2': 0.3964358524, '3': 0.4, year: 1986 },
    { '2': 0.4530695456, '3': 0.45, year: 1987 },
    { '2': 0.5097032388, '3': 0.5, year: 1988 },
    { '2': 0.424752699, '3': 0.43, year: 1989 },
    { '2': 0.5380200854, '3': 0.54, year: 1990 },
    { '2': 0.566336932, '3': 0.58, year: 1991 },
    { '2': 0.57000537947703, '3': 0.5700000000000001, year: 1992 },
    { '2': 0.56000528510024, '3': 0.56, year: 1993 },
    { '2': 0.519897303576, '3': 0.56, year: 1994 },
    { '2': 0.56000528510024, '3': 0.56, year: 1995 },
    { '2': 0.56000528510024, '3': 0.56, year: 1996 },
    { '2': 0.57000537947703, '3': 0.5700000000000001, year: 1997 },
    { '2': 0.5800054738538201, '3': 0.58, year: 1998 },
    { '2': 0.56000528510024, '3': 0.56, year: 1999 },
    { '2': 0.57000537947703, '3': 0.5700000000000001, year: 2000 },
    { '2': 0.53000500196987, '3': 0.53, year: 2001 },
    { '2': 0.62000585136098, '3': 0.6, year: 2002 },
    { '2': 0.65000613449135, '3': 0.65, year: 2003 },
    { '2': 0.75000707825925, '3': 0.75, year: 2004 },
    { '2': 0.65000613449135, '3': 0.65, year: 2005 },
    { '2': 0.68000641762172, '3': 0.68, year: 2006 },
    { '2': 0.8300078332735701, '3': 0.8300000000000001, year: 2007 },
    { '2': 0.68000641762172, '3': 0.68, year: 2008 },
    { '2': 0.6900065119985099, '3': 0.6900000000000001, year: 2009 },
    { '2': 0.7340069272563859, '3': 0.733, year: 2010 },
    { '2': 0.752007097134608, '3': 0.752, year: 2011 },
    { '2': 0.76000717263604, '3': 0.76, year: 2012 },
    { '2': 0.9250087298530751, '3': 0.925, year: 2013 },
    { '2': 0.731006898943349, '3': 0.732, year: 2014 },
    { '2': 0.773007295325867, '3': 0.772, year: 2015 },
    { '2': 1.7130081813933857, '3': 1.919, year: 2016 },
    { '2': 3.1030094916421636, '3': 3.111, year: 2017 },
    { '2': 6.160611164116738, '3': 9.614, year: 2018 },
    { '2': 6.76771501066136, '3': 10.546, year: 2019 },
    { '3': 11.313428700000001, year: 2020 },
  ]
  const margin = { left: 64, top: 20 }
  const currentYearSet = { 3: 11.313428700000001, year: 2020 }
  const yMax = 11.313428700000001

  // data.forEach((point) => {
  //   if (point.fossilFuelType !== fuel) return
  //
  //   if (!sources.includes(point.sourceId)) {
  //     sources.push(point.sourceId)
  //   }
  //
  //   if (!years.includes(point.year)) {
  //     years.push(point.year)
  //     currentYearSet = { year: point.year }
  //     dataset.push(currentYearSet)
  //   }
  //
  //   let y
  //   if (point.fossilFuelType === 'gas') y = convertVolume(point, 'e9m3')
  //   if (point.fossilFuelType === 'oil') y = convertVolume(point, 'e6bbl')
  //   if (point.fossilFuelType === 'coal') y = convertVolume(point, 'e6ton')
  //
  //   currentYearSet[point.sourceId] = y
  //
  //   maxY = Math.max(maxY, y)
  // })

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
          {sources.map((s: any, i: number) => {
            return (
              <LinePath
                key={s}
                curve={curveLinear}
                className="history-curve"
                data={dataset}
                defined={(d) => getY(s, d) > 0}
                x={(d) => yearScale(getYear(d)) ?? 0}
                y={(d) => yScale(getY(s, d)) ?? 0}
                shapeRendering="geometricPrecision"
                stroke={COLORS[i]}
              />
            )
          })}
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
            tickLabelProps={() => ({
              fill: colors.primary.richBlack,
              fontSize: 14,
              textAnchor: 'middle',
            })}
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
          OPEC
          <InfoIcon ml="8px" />
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
            backgroundColor="#4C6EE6"
            borderRadius="100%"
            mr="8px"
          />
          BP
          <InfoIcon ml="8px" />
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
            backgroundColor="#52B9BF"
            borderRadius="100%"
            mr="8px"
          />
          EIA
          <InfoIcon ml="8px" />
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
            backgroundColor="#81D986"
            borderRadius="100%"
            mr="8px"
          />
          DEA
          <InfoIcon ml="8px" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default LineChart
