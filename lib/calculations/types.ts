export type Scenarios = {
    p5: number
    wa: number
    p95: number
}

export type CO2EEmissions = {
    // eslint-disable-next-line no-unused-vars
    [f in 'scope1' | 'scope3' | 'total']: {
        // eslint-disable-next-line no-unused-vars
        [p in 'co2' | 'total' | 'ch4']: Scenarios
    }
}

export type CO2EScope = {
    scope1: Scenarios
    scope3: Scenarios
}

type VintageScope = [number, number, number]
export type VintageScopes = {
    scope1: VintageScope
    scope3: VintageScope
}
