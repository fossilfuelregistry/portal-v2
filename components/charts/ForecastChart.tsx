import React, { useMemo } from 'react'
import { Group } from '@visx/group'
import { AreaStack, LinePath } from '@visx/shape'
import { AxisBottom, AxisRight } from '@visx/axis'
import { curveLinear } from '@visx/curve'
import { scaleLinear } from '@visx/scale'
import { max } from 'd3-array'
import formatCsvNumber from '../../utils/numberFormatter'

const colors = {
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

const productionData = [
  {
    year: 2010,
    oil: 224.53630116576238,
    gas: 144.85828106905169,
    coal: 37.96209724433401,
  },
  {
    year: 2011,
    oil: 185.96104603933372,
    gas: 115.52118339403262,
    coal: 38.38835866950365,
  },
  {
    year: 2012,
    oil: 160.46107195081808,
    gas: 99.6506520315925,
    coal: 35.10862879797404,
  },
  {
    year: 2013,
    oil: 148.54682042241055,
    gas: 93.37659405367873,
    coal: 26.22262102051702,
  },
  {
    year: 2014,
    oil: 146.52397734906828,
    gas: 93.98243201987356,
    coal: 24.101590078052954,
  },
  {
    year: 2015,
    oil: 162.2542245777479,
    gas: 100.18863614557353,
    coal: 17.791282644603687,
  },
  {
    year: 2016,
    oil: 171.54652925720038,
    gas: 100.97137214165684,
    coal: 8.644822541553166,
  },
  {
    year: 2017,
    oil: 169.48497332194813,
    gas: 102.05460122999446,
    coal: 6.292662473553974,
  },
  {
    year: 2018,
    oil: 185.24394753428552,
    gas: 98.89323356065307,
    coal: 5.338725687739269,
  },
  {
    year: 2019,
    oil: 189.1461800526741,
    gas: 96.1469528188567,
    coal: 4.482774706328453,
  },
  {
    year: 2020,
    oil: 176.48227737632308,
    gas: 0,
    coal: 4.313751122558545,
  },
]

const projectionData = [
  {
    year: 2019,
    co2: 289.82124867727134,
  },
  {
    year: 2020,
    co2: 279.1665059980136,
  },
  {
    year: 2021,
    co2: 273.2772419015086,
  },
  {
    year: 2022,
    co2: 267.3879778738123,
  },
  {
    year: 2023,
    co2: 261.49871384574067,
  },
  {
    year: 2024,
    co2: 255.60944981823212,
  },
  {
    year: 2025,
    co2: 249.72018572153945,
  },
  {
    year: 2026,
    co2: 243.83092169384327,
  },
  {
    year: 2027,
    co2: 237.94165766577157,
  },
  {
    year: 2028,
    co2: 232.0523936378876,
  },
  {
    year: 2029,
    co2: 226.1631295623444,
  },
  {
    year: 2030,
    co2: 220.27386551368645,
  },
  {
    year: 2031,
    co2: 219.25822585273053,
  },
  {
    year: 2032,
    co2: 218.24258619844903,
  },
  {
    year: 2033,
    co2: 217.22694653749312,
  },
  {
    year: 2034,
    co2: 216.21130687653718,
  },
  {
    year: 2035,
    co2: 215.19566721539357,
  },
  {
    year: 2036,
    co2: 207.05661312323056,
  },
  {
    year: 2037,
    co2: 198.91755903811742,
  },
  {
    year: 2038,
    co2: 190.77850495319203,
  },
  {
    year: 2039,
    co2: 182.63945086121677,
  },
  {
    year: 2040,
    co2: 174.50039677591593,
  },
  {
    year: 2041,
    co2: 174.07970258532117,
  },
  {
    year: 2042,
    co2: 173.6590084015885,
  },
  {
    year: 2043,
    co2: 173.238314210806,
  },
  {
    year: 2044,
    co2: 172.81762002726109,
  },
  {
    year: 2045,
    co2: 172.3969258364786,
  },
  {
    year: 2046,
    co2: 172.10965907177078,
  },
  {
    year: 2047,
    co2: 171.82239230020087,
  },
  {
    year: 2048,
    co2: 171.53512552825552,
  },
  {
    year: 2049,
    co2: 171.24785876335997,
  },
  {
    year: 2050,
    co2: 170.96059199179007,
  },
]

const projProdData = [
  {
    year: 2019,
    oil_p: 0.20951104333867498,
    oil_c: 0.296190248379,
    gas_p: 96.1469528188567,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2020,
    oil_p: 0,
    oil_c: 0,
    gas_p: 85.84549361032167,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2021,
    oil_p: 0,
    oil_c: 0,
    gas_p: 83.78520171371784,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2022,
    oil_p: 0,
    oil_c: 0,
    gas_p: 81.72490988573503,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2023,
    oil_p: 0,
    oil_c: 0,
    gas_p: 79.66461805775222,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2024,
    oil_p: 0,
    oil_c: 0,
    gas_p: 77.60432622976943,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2025,
    oil_p: 0,
    oil_c: 0,
    gas_p: 75.54403433316561,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2026,
    oil_p: 0,
    oil_c: 0,
    gas_p: 49.75000183701684,
    gas_c: 23.73374066816595,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2027,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 71.42345067719998,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2028,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 69.3631588492172,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2029,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 67.30286697319968,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2030,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 65.24257512463058,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2031,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 64.2811055957558,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2032,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 63.31963607374313,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2033,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 62.358166544868354,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2034,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 61.39669701599357,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2035,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 60.43522748711879,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2036,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 59.88581632384057,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2037,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 59.33640516742445,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2038,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 58.78699401100835,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2039,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 58.237582847730124,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2040,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 57.68817169131401,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2041,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 3.533448771440817,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2042,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2043,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2044,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2045,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2046,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2047,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2048,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2049,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
  {
    year: 2050,
    oil_p: 0,
    oil_c: 0,
    gas_p: 0,
    gas_c: 0,
    coal_p: 0,
    coal_c: 0,
  },
]

const margin = { left: 0, top: 10 }

const getYear = (d: any) => d.year
const getY0 = (d: any) => d[0]
const getY1 = (d: any) => d[1]
const getProjection = (d: any) => d.co2

const ForecastChart = ({ width = 1176, height = 500 }: any) => {
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
    const maxValue = Math.max(maxInProductionData, maxInProjectionData)
    return maxValue * 1.05
  }, [productionData, projectionData])

  const productionScale = scaleLinear({
    range: [height - 30, 0],
    domain: [0, maxCO2],
  })

  // @ts-ignore
  return (
    <svg width={'100%'} height={height} id="CO2Forecast">
      <Group left={margin.left} top={0}>
        <AxisBottom
          top={height - 30}
          scale={yearScale}
          numTicks={width > 520 ? 8 : 4}
          tickFormat={(x: any) => `${x?.toFixed(0)}`}
          tickLabelProps={(label, pos, ticks) => {
            let dx = 0
            if (pos === 0) dx = 15
            // eslint-disable-next-line no-unsafe-optional-chaining
            if (pos === ticks?.length - 1) dx = -15
            return {
              dx,
              dy: '0.25em',
              fill: '#222',
              fontFamily: 'Arial',
              fontSize: 13,
              textAnchor: 'middle',
            }
          }}
        />

        <AreaStack
          keys={['oil_c', 'oil_p', 'gas_c', 'gas_p', 'coal_c', 'coal_p']}
          data={projProdData}
          x={(d) => yearScale(getYear(d.data))}
          y0={(d) => productionScale(getY0(d))}
          y1={(d) => productionScale(getY1(d))}
        >
          {({ stacks, path }) =>
            stacks.map((stack) => {
              return (
                <path
                  key={`stack-${stack.key}`}
                  d={path(stack) || ''}
                  stroke="transparent"
                  fill={
                    {
                      oil_p: colors.oil.reserves,
                      oil_c: colors.oil.contingent,
                      gas_p: colors.gas.reserves,
                      gas_c: colors.gas.contingent,
                      coal_p: colors.coal.reserves,
                      coal_c: colors.coal.contingent,
                    }[stack.key]
                  }
                />
              )
            })
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
            stacks.map((stack) => {
              return (
                <path
                  key={`stack-${stack.key}`}
                  d={path(stack) || ''}
                  stroke="transparent"
                  fill={
                    {
                      oil: colors.oil.past,
                      gas: colors.gas.past,
                      coal: colors.coal.past,
                    }[stack.key]
                  }
                />
              )
            })
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

        <AxisRight
          scale={productionScale}
          numTicks={width > 520 ? 8 : 4}
          tickFormat={(x: any) => formatCsvNumber(x) as any}
          tickLabelProps={(label, pos) => {
            return {
              dx: '0.25em',
              dy: pos === 0 ? -12 : 2,
              fill: '#222',
              fontFamily: 'Arial',
              fontSize: 13,
              textAnchor: 'start',
            }
          }}
        />

        <text x="40" y="18" transform="rotate(0)" fontSize={13}>
          test
        </text>
      </Group>
    </svg>
  )
}

export default ForecastChart
