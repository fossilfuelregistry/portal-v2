import React, { FC } from 'react'
import { SimpleGrid, Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react'
import { colors } from '../assets/theme'


type InfoBoxProps = {
  title: string
  icon?: React.ReactNode
  subtitle?: string
  label?: string
  value: number | undefined
  year?: string
}

const InfoBox: FC<InfoBoxProps> = ({
    title, 
    icon, 
    subtitle, 
    label, 
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
        <Box>{year}</Box>
    </Box>
  )

export default InfoBox
