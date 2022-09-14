import React from 'react'
import InfoSection from 'components/InfoSection'
import ExcessReservesChart from 'components/charts/ExcessReservesChart'
import { Box, SimpleGrid } from '@chakra-ui/react'
import ReserveInfo from 'components/country/ReserveInfo'
import { CoalIcon, GasIcon, OilIcon } from 'components/Icons'
import { colors } from '../../assets/theme'

const ExcessReservesSection = () => (
  <InfoSection title="Forecasted & Excess Reserves">
    <Box as="p" fontSize="16" mb="40px" color={colors.primary.richBlack}>
      In the selected scenario and parameters, existing oil reserves would be
      sufficient to cover production out to YEAR. Existing reserves are excess
      of what is needed to meet this scenario through YEAR by AMOUNT. OR The
      selected scenario forecasts an additional AMOUNT of reserves to be
      identified out to YEAR.
    </Box>
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      gridGap={{ md: '60px', lg: '80px', xl: '120px' }}
      mb="40px"
    >
      <ReserveInfo
        title="Oil forecasted resources"
        icon={<OilIcon fill={colors.primary.grey70} opacity="1" />}
        value={15}
        subtitle="Million barrels"
        co2eValue={89}
        hasLine
      />
      <ReserveInfo
        title="Gas excess of reserves"
        icon={<GasIcon fill={colors.primary.grey70} opacity="1" />}
        value={856}
        subtitle="Billion cubic metres"
        co2eValue={67}
        hasLine
      />
      <ReserveInfo
        title="Coal excess of reserves"
        icon={<CoalIcon stroke={colors.primary.grey70} opacity="1" />}
        value={0.0}
        subtitle="Billion cubic metres"
        co2eValue={0.0}
      />
    </SimpleGrid>
    <ExcessReservesChart width={1176} height={500} />
  </InfoSection>
)

export default ExcessReservesSection
