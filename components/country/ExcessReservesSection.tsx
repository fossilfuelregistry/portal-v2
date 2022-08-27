import React from 'react'
import InfoSection from 'components/InfoSection'
import ExcessReservesChart from 'components/charts/ExcessReservesChart'
import { Box } from '@chakra-ui/react'
import { colors } from '../../assets/theme'

const ExcessReservesSection = () => {
  return (
    <InfoSection title="Forecasted & Excess Reserves">
      <Box as="p" fontSize="16" mb="24px" color={colors.primary.richBlack}>
        In the selected scenario and parameters, existing oil reserves would be
        sufficient to cover production out to YEAR. Existing reserves are excess
        of what is needed to meet this scenario through YEAR by AMOUNT. OR The
        selected scenario forecasts an additional AMOUNT of reserves to be
        identified out to YEAR.
      </Box>
      <ExcessReservesChart width={1176} height={500} />
    </InfoSection>
  )
}

export default ExcessReservesSection
