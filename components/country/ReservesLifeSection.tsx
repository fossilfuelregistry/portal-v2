import React from 'react'
import InfoSection from 'components/InfoSection'
import { Box } from '@chakra-ui/react'
import HorizontalBarStackChart from 'components/charts/HorizontalBarStackChart'
import { colors } from '../../assets/theme'

const ReservesLifeSection = () => {
  return (
    <InfoSection title="Reserves life, various scenarios">
      <Box as="p" fontSize="16" color={colors.primary.richBlack}>
        This chart shows how quickly proven reserves will be exhausted under a
        range of different scenarios. These scenarios are drawn from several
        different sources, are for illustrative purposes only, AND DO NOT
        REFLECT ANY VIEW OF THE REGISTRY. In order to remain within 1.5C many
        currently proven reserves will need to remain unextracted. COUNTRIES
        MIGHT CONSIDER EQUITY AND OTHER RATIONALES FOR ALLOCATING THE REMAINING
        CARBON BUDGET to remain within the 1.5C Paris Agreement goal.
      </Box>
      <HorizontalBarStackChart width={1096} height={500} />
    </InfoSection>
  )
}

export default ReservesLifeSection
