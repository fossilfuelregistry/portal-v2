import React, { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import InfoSection from 'components/InfoSection'
import GroupBarChart from 'components/charts/GroupBarChart'
import { StaticData } from 'lib/types'
import useCountrySources from 'lib/useCountrySources'
import useCountryData from 'lib/useCountryData'
import SourceSelect from 'components/filters/SourceSelect'
import { DataContext } from 'components/DataContext'
import HistoryProductionInfo from 'components/country/HistoryProductionInfo'
import { CoalIcon, GasIcon, OilIcon } from 'components/Icons'
import { colors } from '../../assets/theme'
import groupBy from '../../utils/groupBy'

type HistoricProductionProps = {
  country: string
}

const startYear = 2015

const HistoricProduction: FC<HistoricProductionProps> = ({ country }) => {
  const staticData: StaticData = useContext(DataContext)
  const { countryName, conversions, constants, prefixConversions, texts } =
    staticData

  const { productionSources, preferredProductionSourceId } = useCountrySources({
    country,
  })
  const [productionSourceId, setProductionSourceId] = useState<number>(
    preferredProductionSourceId
  )
  const { production } = useCountryData({
    productionSourceId,
    gwp: 'GWP100',
    country,
    conversionConstants: conversions,
    // @ts-ignore
    allSources: productionSources,
    constants,
    conversionPrefixes: prefixConversions,
  })

  useEffect(() => {
    if (productionSources.length && !productionSourceId) {
      setProductionSourceId(productionSources[0].sourceId)
    }
  }, [productionSources])

  const historicData = useMemo(() => {
    const calculateTotal = (data: any[]) =>
      data
        ? data.reduce((prev, current) => prev + current.co2e.total.total.wa, 0)
        : 0

    const filteredData = production.filter(
      (p) => p.year >= startYear && p.sourceId === productionSourceId
    )
    const groupedByYear = groupBy(filteredData, (d) => d.year)
    const groupedByFuel = Object.values(groupedByYear).map((d) =>
      groupBy(d, (i) => i.fossilFuelType)
    )
    const result = groupedByFuel.map((d) => ({
      Oil: calculateTotal(d.oil),
      Gas: calculateTotal(d.gas),
      Coal: calculateTotal(d.coal),
      date:
        (d?.oil?.length && d?.oil[0]?.year) ||
        (d?.gas?.length && d?.gas[0]?.year) ||
        (d?.coal?.length && d?.coal[0]?.year),
    }))

    return result
  }, [production])

  const historicTotalData = useMemo(() => {
    const calculate = (data: any, fuelType: string) => {
      return data[fuelType] && data[fuelType]?.length
        ? data[fuelType][0].volume
        : 0
    }

    const filteredData = production.filter(
      (p) => p.sourceId === productionSourceId
    )
    const groupedByYear = groupBy(filteredData, (d) => d.year)
    const groupedByFuel = Object.values(groupedByYear).map((d) =>
      groupBy(d, (i) => i.fossilFuelType)
    )

    // TODO Refactor the calculation
    const result = groupedByFuel.reduce((prev, curr) => {
      // @ts-ignore
      if (prev.oil) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        prev.oil += calculate(curr, 'oil')
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        prev.gas += calculate(curr, 'gas')
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        prev.coal += calculate(curr, 'coal')
      } else {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign,no-unsafe-optional-chaining
        prev.oil = curr?.oil?.length ? curr?.oil[0]?.volume : 0
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign,no-unsafe-optional-chaining
        prev.gas = curr?.gas?.length ? curr?.gas[0]?.volume : 0
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign,no-unsafe-optional-chaining
        prev.coal = curr?.coal?.length ? curr?.coal[0]?.volume : 0
      }

      return prev
    }, {})

    return result
  }, [production])

  const translatedCsvData = useMemo(() => {
    return historicData.map((d) => ({
      Year: d.date,
      Oil: d.Oil,
      Gas: d.Gas,
      Coal: d.Coal,
    }))
  }, [historicData])

  return (
    <InfoSection
      title={`${countryName} Historic Emissions`}
      csvData={translatedCsvData}
      filename={`${country}_production_estimates.csv`}
    >
      <SimpleGrid mb="40px" columns={3} gridGap="20px">
        <SourceSelect
          label="Production source"
          sources={productionSources}
          value={productionSourceId}
          onChange={(option) => setProductionSourceId(option?.value as any)}
        />
      </SimpleGrid>
      {/*<SimpleGrid*/}
      {/*  columns={{ base: 1, md: 3 }}*/}
      {/*  gridGap={{ base: '30px', md: '60px', lg: '134px' }}*/}
      {/*  mb="40px"*/}
      {/*>*/}
      {/*  <HistoryProductionInfo*/}
      {/*    title="Oil historic production"*/}
      {/*    subtitle="Million tonnes CO₂e"*/}
      {/*    icon={<OilIcon fill={colors.primary.grey70} opacity="1" />}*/}
      {/*    // @ts-ignore*/}
      {/*    value={historicTotalData.oil?.toFixed(2)}*/}
      {/*    hasLine*/}
      {/*  />*/}
      {/*  <HistoryProductionInfo*/}
      {/*    title="Gas historic production"*/}
      {/*    subtitle="Billion cubic metres"*/}
      {/*    icon={<GasIcon fill={colors.primary.grey70} opacity="1" />}*/}
      {/*    // @ts-ignore*/}
      {/*    value={historicTotalData.gas?.toFixed(2)}*/}
      {/*    hasLine*/}
      {/*  />*/}
      {/*  <HistoryProductionInfo*/}
      {/*    title="Coal historic production"*/}
      {/*    subtitle="Thousand tonnes"*/}
      {/*    icon={<CoalIcon stroke={colors.primary.grey70} opacity="1" />}*/}
      {/*    // @ts-ignore*/}
      {/*    value={historicTotalData.coal?.toFixed(2)}*/}
      {/*  />*/}
      {/*</SimpleGrid>*/}
      {!!historicData.length && (
        <Box mb="40px" position="relative">
          <GroupBarChart data={historicData} width={1176} height={400} />
        </Box>
      )}
    </InfoSection>
  )
}

export default HistoricProduction
