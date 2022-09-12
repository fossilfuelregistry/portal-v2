import React, { FC } from 'react'
import { SimpleGrid, Box, Grid, GridItem, Heading, Spinner, Spacer, Flex } from '@chakra-ui/react'
import { colors } from '../assets/theme'


type InfoBoxProps = {
  icon?: React.ReactNode
  label?: string
  source?: string
  subtitle?: string
  title: string
  value: number | undefined
  year?: string
}

const InfoBox: FC<InfoBoxProps> = ({
    icon, 
    label, 
    source = '',
    subtitle, 
    title, 
    value, 
    year,
}) => (
    <Box w="100%" bgColor={colors.primary.grey5}  padding="20px">
        <Grid gap={10}>
            <GridItem>
                <Box>{title}</Box>
                {!!subtitle &&<Box>{subtitle}</Box>}
            </GridItem>
            {!!icon && <GridItem>{icon}</GridItem>}
        </Grid>
        <Box>{label}</Box>
        <Heading as="h3">{value!==undefined ? value?.toFixed(2): <Spinner />}</Heading>
        <Box>{year}{!!source && ` (${source})`}</Box>
    </Box>
  )

export default InfoBox
