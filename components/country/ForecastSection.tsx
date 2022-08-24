import React from 'react'
import InfoSection from 'components/InfoSection'
import ForecastChart from 'components/charts/ForecastChart'
import { Box } from '@chakra-ui/react'
import { colors } from '../../assets/theme'

const ForecastSection = () => {
  return (
    <InfoSection title="Historical and projected emissions under various scenarios">
      <Box as="p" fontSize="16" mb="24px" color={colors.primary.richBlack}>
        This chart shows how the currently estimated level of reserves and
        contingent resources, expressed in terms of their embedded greenhouse
        gas emissions, compared to projected future production under various
        scenarios. Where projected production exceeds the amount of currently
        estimated reserves and contingent resources, it indicates that fossil
        fuel production may expand beyond current reserves under those
        scenarios. We call these forecasted reserves. Where projected future
        production is entirely met by existing reserves and contingent
        resources, it indicates the country may wind down production before all
        existing reserves are depleted. We call these excess reserves.
      </Box>
      <ForecastChart />
    </InfoSection>
  )
}

export default ForecastSection
