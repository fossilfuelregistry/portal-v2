import React, {
  useState,
  useEffect,
  FC,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import { SimpleGrid, Box, Heading } from '@chakra-ui/react'
import { WarmingPotential } from 'components/filters/WarmingPotentialSelect'
import useCountrySources from 'lib/useCountrySources'
import useCountryData from 'lib/useCountryData'
import { DataContext } from 'components/DataContext'
import { SmokeIcon, OilIcon, GasIcon, CoalIcon } from 'components/Icons'
import { usePrefixConversion } from 'lib/calculations/prefix-conversion'
import InfoBox from 'components/InfoBox'
import { CO2EEmissions } from 'lib/calculations/types'
import useText from 'lib/useText'
import { FossilFuelType, StaticData } from 'lib/types'
import { isNumber } from 'fp-ts/number'
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

const getYear =
  (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    getFuelData(fossilFuelType)(emissionsData)?.year
const getOilYear = getYear('oil')
const getGasYear = getYear('gas')
const getCoalYear = getYear('coal')

const getVolume =
  (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    getFuelData(fossilFuelType)(emissionsData)?.volume

const getUnit =
  (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    getFuelData(fossilFuelType)(emissionsData)?.unit

const getSourceId =
  (fossilFuelType: FossilFuelType) => (emissionsData: EmissionsDataType) =>
    getFuelData(fossilFuelType)(emissionsData)?.sourceId

const getOilSourceId = getSourceId('oil')
const getGasSourceId = getSourceId('gas')
const getCoalSourceId = getSourceId('coal')

const getToUnit = (fossilFuelType: FossilFuelType) => {
  switch (fossilFuelType) {
    case 'oil':
      return 'e6bbl'
    case 'gas':
      return 'e9m3'
    case 'coal':
      return 'e6ton'
    default:
      throw new Error('Fossil Fuel Type case is not defined')
  }
}

const CountrySnapshot: FC<CountrySnapshotProps> = ({ country }) => {
  const {
    preferredProductionSourceId,
    preferredProjectionSourceId,
    preferredReservesSourceId,
  } = useCountrySources({ country })
  const { translate } = useText()
  const staticData: StaticData = useContext(DataContext)
  const { countryName, conversions, constants, prefixConversions, texts } =
    staticData
  const { getSourceName } = useCountrySources({ country })
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

  const calculate = useCallback(
    (fossilFuelType: FossilFuelType): number | undefined => {
      const unit = getUnit(fossilFuelType)(emissionsData)
      if (!emissionsData || !unit) return
      const volume = getVolume(fossilFuelType)(emissionsData)
      const p = prefix(unit, getToUnit(fossilFuelType))
      if (!p || !volume) return
      // eslint-disable-next-line consistent-return
      return p * volume
    },
    [emissionsData, prefix]
  )

  useEffect(() => {
    setTotalEmissions(emissionsData?.totalCO2E)
    setOilProduction(calculate('oil'))
    setGasProduction(calculate('gas'))
    setCoalProduction(calculate('coal'))
  }, [calculate, emissionsData])

  const oilYear = useMemo(() => getYear('oil')(emissionsData), [emissionsData])
  const gasYear = useMemo(() => getYear('gas')(emissionsData), [emissionsData])
  const coalYear = useMemo(
    () => getYear('coal')(emissionsData),
    [emissionsData]
  )

  const py = (year?: number) => (isNumber(year) ? year : +Infinity)
  const ny = (year?: number) => (isNumber(year) ? year : -Infinity)
  const yearRange = useMemo(() => {
    const min = Math.min(py(oilYear), py(gasYear), py(coalYear)).toString()
    const max = Math.max(ny(oilYear), ny(gasYear), ny(coalYear)).toString()
    return `(${min} - ${max})`
  }, [oilYear, gasYear, coalYear])

  return (
    <Box>
      <Heading
        as="h4"
        color={colors.primary.richBlue}
        fontSize="32px"
        lineHeight="42px"
        mb="30px"
      >
        {countryName} Country Snapshot
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} gridGap="20px" mb="80px">
        <InfoBox
          title="Total emissions"
          icon={<SmokeIcon />}
          subtitle="Million tonnes CO₂e"
          value={totalEmissions}
          year={yearRange}
        />
        <InfoBox
          title="Oil production"
          icon={<OilIcon fill={colors.primary.grey70} opacity="1" />}
          subtitle="Million barrels"
          value={oilProduction}
          year={oilYear?.toFixed() ?? ''}
          source={getSourceName(getOilSourceId(emissionsData))}
        />
        <InfoBox
          title="Gas production"
          icon={<GasIcon fill={colors.primary.grey70} opacity="1" />}
          subtitle="Billion cubic metres"
          value={gasProduction}
          year={gasYear?.toFixed() ?? ''}
          source={getSourceName(getGasSourceId(emissionsData))}
        />
        <InfoBox
          title="Coal production"
          icon={<CoalIcon stroke={colors.primary.grey70} opacity="1" />}
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
