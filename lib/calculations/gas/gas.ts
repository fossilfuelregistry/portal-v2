/* eslint-disable no-underscore-dangle */
import { pipe } from 'fp-ts/lib/function'
import { ap } from 'fp-ts/lib/Identity'
import { iso, Newtype } from 'newtype-ts'
import {
    isoMethaneFactorisation,
    isoMethaneIntensity,
    MethaneFactorisation,
    MethaneIntensity,
} from '../methane'
import { Scenarios } from '../types'
import { add, scalarAddition, scalarMultiply } from '../utils'

/** Volume */

/**  Gas Production [ bln m3 ] */
export type GasProduction = Newtype<
    { readonly GasProduction: unique symbol },
    number
>
export const isoGasProduction = iso<GasProduction>()

/** Combustion Emissions */
/**  1. Volume -> Energy  */

/**  Petajoules per million cubic metres gas [  PJ / e9m3 ] */
export type PetajoulesPerMillionCubicMeterGas = Newtype<
    { readonly PetajoulesPerMillionCubicMeterGas: unique symbol },
    number
>
export const isoPetajoulesPerMillionCubicMeterGas =
    iso<PetajoulesPerMillionCubicMeterGas>()

/**  Gas energy [ Petajoules ] */
export type GasEnergy = Newtype<{ readonly GasEnergy: unique symbol }, number>
export const isoGasEnergy = iso<GasEnergy>()

export const calculateGasEnergy =
    (gasProduction: GasProduction) =>
    (
        petajoulesPerMillionCubicMeterGas: PetajoulesPerMillionCubicMeterGas
    ): GasEnergy => {
        const _gasProduction = isoGasProduction.unwrap(gasProduction)
        const _petajoulesPerMillionCubicMeterGas =
            isoPetajoulesPerMillionCubicMeterGas.unwrap(
                petajoulesPerMillionCubicMeterGas
            )
        return isoGasEnergy.wrap(
            _gasProduction * _petajoulesPerMillionCubicMeterGas
        )
    }

/**  2. Energy -> Emissions  */

export const THOUSANDS_IN_A_MILLION_RATIO = 1000

/**  EIA Gas NFU ratio globally  (U.S.-based)  [ % ] */
export type EIAGasNFURatioGlobally = Newtype<
    { readonly EIAGasNFURatioGlobally: unique symbol },
    number
>
export const isoEIAGasNFURatioGlobally = iso<EIAGasNFURatioGlobally>()

/**  Gas: IPCC energy -> emissions  [ tons (CO2E) / TJ ] */
export type GasIPCCEnergyToEmissionsFactors = Newtype<
    { readonly GasIPCCEnergyToEmissionsFactors: unique symbol },
    Scenarios
>
export const isoGasIPCCEnergyToEmissionsFactors =
    iso<GasIPCCEnergyToEmissionsFactors>()

/**  Gas CO2E Combustion emissions [ tons (CO2E) ] */
export type GasCO2ECombustionEmissions = Newtype<
    { readonly GasCO2ECombustionEmissions: unique symbol },
    Scenarios
>
export const isoGasCO2ECombustionEmissions = iso<GasCO2ECombustionEmissions>()

export const calculateGasCO2ECombustionEmissions =
    (gasEnergy: GasEnergy) =>
    (eiaGasNFURatioGlobally: EIAGasNFURatioGlobally) =>
    (
        gasIPCCEnergyToEmissionsFactors: GasIPCCEnergyToEmissionsFactors
    ): GasCO2ECombustionEmissions => {
        const _gasEnergy = isoGasEnergy.unwrap(gasEnergy)
        const _eiaGasNFURatioGlobally = isoEIAGasNFURatioGlobally.unwrap(
            eiaGasNFURatioGlobally
        )
        const _gasIPCCEnergyToEmissionsFactors =
            isoGasIPCCEnergyToEmissionsFactors.unwrap(
                gasIPCCEnergyToEmissionsFactors
            )

        return isoGasCO2ECombustionEmissions.wrap(
            scalarMultiply(
                _gasEnergy *
                    THOUSANDS_IN_A_MILLION_RATIO *
                    (1 - _eiaGasNFURatioGlobally)
            )(_gasIPCCEnergyToEmissionsFactors)
        )
    }

/** Production Emissions */
/**  Current Production */
/**  Boe per e6m3 [ e6boe / e9m3 ] */
export type BOEPere6m3 = Newtype<{ readonly BOEPere6m3: unique symbol }, number>
export const isoBOEPere6m3 = iso<BOEPere6m3>()

/**  Barrels of oil equivalent [ boe ] */
export type BarrelsOfOilEquivalent = Newtype<
    { readonly BarrelsOfOilEquivalent: unique symbol },
    number
>
export const isoBarrelsOfOilEquivalent = iso<BarrelsOfOilEquivalent>()

export const calculateBarrelsOfOilEquivalent =
    (gasProduction: GasProduction) =>
    (boePere6m3: BOEPere6m3): BarrelsOfOilEquivalent => {
        const _gasProduction = isoGasProduction.unwrap(gasProduction)
        const _boePere6m3 = isoBOEPere6m3.unwrap(boePere6m3)

        return isoBarrelsOfOilEquivalent.wrap(
            _gasProduction *
                _boePere6m3 *
                THOUSANDS_IN_A_MILLION_RATIO *
                THOUSANDS_IN_A_MILLION_RATIO
        )
    }

/**  CO2 */

/**  Gas Production CO2 [ kg (CO2E) / boe ] */
export type GasProductionCO2 = Newtype<
    { readonly GasProductionCO2: unique symbol },
    Scenarios
>
export const isoGasProductionCO2 = iso<GasProductionCO2>()

/**  Gas CO2 Production emissions [ tons (CO2E) ] */
export type GasCO2ProductionEmissions = Newtype<
    { readonly GasCO2PRoductionEmissions: unique symbol },
    Scenarios
>
export const isoGasCO2ProductionEmissions = iso<GasCO2ProductionEmissions>()

export const calculateGasCO2ProductionEmissions =
    (barrelsOfOilEquivalent: BarrelsOfOilEquivalent) =>
    (gasProductionCO2: GasProductionCO2): GasCO2ProductionEmissions => {
        const _barrelsOfOilEquivalent = isoBarrelsOfOilEquivalent.unwrap(
            barrelsOfOilEquivalent
        )
        const _gasProductionCO2 = isoGasProductionCO2.unwrap(gasProductionCO2)

        return isoGasCO2ProductionEmissions.wrap(
            scalarMultiply(
                _barrelsOfOilEquivalent / THOUSANDS_IN_A_MILLION_RATIO
            )(_gasProductionCO2)
        )
    }

/**  CH4  */

/**  Methane releases [ tons CH4 ] */
export type GasMethaneReleases = Newtype<
    { readonly MethaneReleases: unique symbol },
    number
>
export const isoGasMethaneReleases = iso<GasMethaneReleases>()

export const calculateGasMethaneReleases =
    (barrelsOfOilEquivalent: BarrelsOfOilEquivalent) =>
    (methaneIntensity: MethaneIntensity): GasMethaneReleases => {
        const _barrelsOfOilEquivalent = isoBarrelsOfOilEquivalent.unwrap(
            barrelsOfOilEquivalent
        )
        const _methaneIntensity = isoMethaneIntensity.unwrap(methaneIntensity)

        return isoGasMethaneReleases.wrap(
            (_barrelsOfOilEquivalent * _methaneIntensity) /
                THOUSANDS_IN_A_MILLION_RATIO
        )
    }

/** Oil CO2E of methane [ CO2e tons ] */
export type GasCO2EOfMethane = Newtype<
    { readonly GasCO2EOfMethane: unique symbol },
    number
>
export const isoGasCO2EOfMethane = iso<GasCO2EOfMethane>()

export const calculateGasCO2EOfMethane =
    (methaneReleases: GasMethaneReleases) =>
    (methaneFactorisation: MethaneFactorisation): GasCO2EOfMethane => {
        const _methaneReleases = isoGasMethaneReleases.unwrap(methaneReleases)
        const _methaneFactorisation =
            isoMethaneFactorisation.unwrap(methaneFactorisation)
        return isoGasCO2EOfMethane.wrap(
            _methaneReleases * _methaneFactorisation
        )
    }

/**  Upstream Total  */

/**  Gas CO2E Production emissions [ tons (CO2E) ] */
export type GasCO2EProductionEmissions = Newtype<
    { readonly GasCO2EProductionEmissions: unique symbol },
    Scenarios
>
export const isoGasCO2EProductionEmissions = iso<GasCO2EProductionEmissions>()

export const calculateGasCO2EProductionEmissions =
    (gasCO2ProductionEmissions: GasCO2ProductionEmissions) =>
    (gasCO2EOfMethane: GasCO2EOfMethane): GasCO2EProductionEmissions => {
        const _gasCO2ProductionEmissions = isoGasCO2ProductionEmissions.unwrap(
            gasCO2ProductionEmissions
        )
        const _gasCO2EOfMethane = isoGasCO2EOfMethane.unwrap(gasCO2EOfMethane)
        return isoGasCO2EProductionEmissions.wrap(
            scalarAddition(_gasCO2EOfMethane)(_gasCO2ProductionEmissions)
        )
    }

/** Gas CO2E emission [ tons (CO2E) ] */
export type TotalGasCO2EEmissions = Newtype<
    { readonly TotalGasCO2EEmissions: unique symbol },
    Scenarios
>
export const isoTotalGasCO2EEmissions = iso<TotalGasCO2EEmissions>()

export const calculateTotalGasCO2EEmissions =
    (combustionEmissions: GasCO2ECombustionEmissions) =>
    (
        productionEmissions: GasCO2EProductionEmissions
    ): TotalGasCO2EEmissions => {
        const combustion =
            isoGasCO2ECombustionEmissions.unwrap(combustionEmissions)
        const production =
            isoGasCO2EProductionEmissions.unwrap(productionEmissions)

        return pipe(
            add,
            ap(combustion),
            ap(production),
            isoTotalGasCO2EEmissions.wrap
        )
    }
