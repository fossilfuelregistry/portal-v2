import { ap } from 'fp-ts/lib/Identity'
import { pipe } from 'fp-ts/lib/function'
import {
    calculateCoalCO2ECombustionEmissions,
    calculateCoalCO2EProductionEmission,
    calculateCoalMethaneReleases,
    calculateTotalCoalCO2EEmissions,
    isoCoalCO2ECombustionEmissions,
    isoCoalCO2EProductionEmission,
    isoCoalMethaneEmissionsMidPoint,
    isoCoalMethaneReleases,
    isoCoalProduction,
    isoTonsCO2EPerTon,
    isoTotalCoalCO2EEmissions,
} from './coal'
import { isoMethaneFactorisation } from '../methane'

describe('COAL', () => {
    it(' Oil CO2E Combustion emissions', () => {
        const coalProduction = isoCoalProduction.wrap(350000)
        const tonsCO2EPerTon = isoTonsCO2EPerTon.wrap({
            p5: 2.2,
            wa: 2.28,
            p95: 2.36,
        })
        const expectedResult = { p5: 770000000, wa: 798000000, p95: 826000000 }
        const result = isoCoalCO2ECombustionEmissions.unwrap(
            calculateCoalCO2ECombustionEmissions(coalProduction)(tonsCO2EPerTon)
        )
        expect(result.p5.toFixed(0)).toBe(expectedResult.p5.toString())
        expect(result.wa.toFixed(0)).toBe(expectedResult.wa.toString())
        expect(result.p95.toFixed(0)).toBe(expectedResult.p95.toString())
    })

    it('Methane releases', () => {
        const coalProduction = isoCoalProduction.wrap(350000)
        const coalMethaneEmissionsMidPoint =
            isoCoalMethaneEmissionsMidPoint.wrap(3.49)
        const expectedResult = 1221500
        const result = pipe(
            calculateCoalMethaneReleases,
            ap(coalProduction),
            ap(coalMethaneEmissionsMidPoint),
            isoCoalMethaneReleases.unwrap
        )
        expect(result.toFixed(0)).toBe(expectedResult.toString())
    })

    it(' Coal CO2E Production emissions mid-point ', () => {
        const coalMethaneReleases = isoCoalMethaneReleases.wrap(1220020)
        const methaneFactorisation = isoMethaneFactorisation.wrap(29.8)

        const expectedResult = 36356596
        const result = pipe(
            calculateCoalCO2EProductionEmission,
            ap(coalMethaneReleases),
            ap(methaneFactorisation),
            isoCoalCO2EProductionEmission.unwrap
        )
        expect(result.toFixed(0)).toBe(expectedResult.toString())
    })

    it('Total coal emissions', () => {
        const productionEmissions = isoCoalCO2EProductionEmission.wrap(36356589)
        const combustionEmissions = isoCoalCO2ECombustionEmissions.wrap({
            p5: 770369675,
            wa: 798824412,
            p95: 863513546,
        })
        const expectedResult = { p5: 806726264, wa: 835181001, p95: 899870135 }
        const result = isoTotalCoalCO2EEmissions.unwrap(
            calculateTotalCoalCO2EEmissions(combustionEmissions)(
                productionEmissions
            )
        )
        expect(result.p5.toFixed(0)).toBe(expectedResult.p5.toString())
        expect(result.wa.toFixed(0)).toBe(expectedResult.wa.toString())
        expect(result.p95.toFixed(0)).toBe(expectedResult.p95.toString())
    })
})
