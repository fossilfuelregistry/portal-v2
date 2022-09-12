import React, { useState, useEffect, FC, useContext, useCallback, useMemo } from 'react'
import { SimpleGrid, Box, Heading } from '@chakra-ui/react'
import { WarmingPotential } from 'components/filters/WarmingPotentialSelect'
import useCountrySources from 'lib/useCountrySources'
import useCountryData from 'lib/useCountryData'
import { DataContext } from 'components/DataContext'
import { usePrefixConversion } from 'lib/calculations/prefix-conversion'
import InfoBox from 'components/InfoBox'
import { CO2EEmissions } from 'lib/calculations/types'
import useText from 'lib/useText'
import { FossilFuelType, StaticData } from 'lib/types'
import { colors } from '../../assets/theme'

type EmissionsDataType =
  | {
      sourceId: number
      production: {
        co2e: CO2EEmissions | null
        fossilFuelType: 'oil' | 'coal' | 'gas'
        sourceId: number
        volume: number
        unit: string
        year: number
      }[]
      totalCO2E: number
    }
  | null
  | undefined

  type CountrySnapshotProps = {
    country: string
  }
  

const getFuelData =
  (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    emissionsData?.production.find((a) => a.fossilFuelType === fossilFuelType)

const getYear = (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    getFuelData(fossilFuelType)(emissionsData)?.year
const getOilYear  = getYear("oil")
const getGasYear  = getYear("gas")
const getCoalYear = getYear("coal")
    

const getVolume =
  (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    getFuelData(fossilFuelType)(emissionsData)?.volume

const getUnit =
  (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    getFuelData(fossilFuelType)(emissionsData)?.unit

const getSourceId  = (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
  getFuelData(fossilFuelType)(emissionsData)?.sourceId

const getOilSourceId = getSourceId("oil")
const getGasSourceId = getSourceId("gas")
const getCoalSourceId = getSourceId("coal")


const getToUnit = (fossilFuelType: FossilFuelType) => {
  switch (fossilFuelType) {
    case "oil":
      return 'e6bbl';
    case "gas":
      return 'e9m3';
    case "coal":
      return 'e6ton';
    default:
      throw new Error("Fossil Fuel Type case is not defined");
  }
}

const CountrySnapshot: FC<CountrySnapshotProps> = ({ country }) => {
  const {
    preferredProductionSourceId,
    preferredProjectionSourceId,
    preferredReservesSourceId,
  } = useCountrySources({country})
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { countryName, conversions, constants, prefixConversions, texts } =
    staticData
  const { getSourceName } = useCountrySources({country})
  const prefix = usePrefixConversion(prefixConversions)

  const [gwp, _] = useState<string>(WarmingPotential.GWP100)
  const [emissionsData, setEmissionsData] = useState<EmissionsDataType>(null)
  const { getCurrentCO2E } = useCountryData({
    gwp,
    productionSourceId: preferredProductionSourceId,
    projectionSourceId: preferredProjectionSourceId,
    reservesSourceId: preferredReservesSourceId,
    country,
    conversionConstants: conversions,
    constants,
    conversionPrefixes: prefixConversions,
  })

  useEffect(() => {
    const calculateData = async () => {
      setEmissionsData(
        (await getCurrentCO2E())?.find(
          (d) => d?.sourceId === preferredProductionSourceId
        )
      )
    }
    calculateData()
  }, [gwp, preferredProductionSourceId, country])

  const [totalEmissions, setTotalEmissions] = useState<number | undefined>()
  const [oilProduction, setOilProduction] = useState<number | undefined>()
  const [gasProduction, setGasProduction] = useState<number | undefined>()
  const [coalProduction, setCoalProduction] = useState<number | undefined>()

  const calculate  = useCallback((fossilFuelType: FossilFuelType): number | undefined => {
    const unit = getUnit(fossilFuelType)(emissionsData)
    if(!emissionsData || !unit) return    
    const volume = getVolume(fossilFuelType)(emissionsData)
    const p = prefix(unit, getToUnit(fossilFuelType))
    if(!p || !volume) return
    // eslint-disable-next-line consistent-return
    return p * volume
  },[emissionsData, prefix])

  useEffect(() => {
    setTotalEmissions(emissionsData?.totalCO2E)
    setOilProduction(calculate("oil"))
    setGasProduction(calculate("gas"))
    setCoalProduction(calculate("coal"))
  }, [calculate, emissionsData])

  const oilYear  = useMemo(() => getYear("oil")(emissionsData), [emissionsData]) 
  const gasYear  = useMemo(() => getYear("gas")(emissionsData), [emissionsData]) 
  const coalYear = useMemo(() => getYear("coal")(emissionsData), [emissionsData]) 

  const yearRange = useMemo(() => {
    if(!oilYear || !gasYear || !coalYear) return ''
    const min = Math.min(oilYear, gasYear, coalYear).toString()
    const max = Math.max(oilYear, gasYear, coalYear).toString()
    return `(${min} - ${max})`
  }, [oilYear, gasYear, coalYear])

  return (
    <Box>
      <Heading as="h4" mb="40px">
        {countryName} Country Snapshot
      </Heading>
      <SimpleGrid mb="40px" columns={4} gridGap="20px">
        <InfoBox
          title="Total emissions"
          subtitle="Million tonnes CO₂e"
          value={totalEmissions}
          year={yearRange}
        />
        <InfoBox
          title="Oil production"
          subtitle="Million barrels"
          value={oilProduction}
          year={oilYear?.toFixed() ?? ''}
          source={getSourceName(getOilSourceId(emissionsData))}
        />
        <InfoBox
          title="Gas production"
          subtitle="Billion cubic metres"
          value={gasProduction}
          year={gasYear?.toFixed() ?? ''}
          source={getSourceName(getGasSourceId(emissionsData))}
        />
        <InfoBox
          title="Coal production"
          subtitle="Million tonnes"
          value={coalProduction}
          year={coalYear?.toFixed() ?? ''}
          source={getSourceName(getCoalSourceId(emissionsData))}
        />
      </SimpleGrid>
    </Box>
  )
}

export default CountrySnapshot
