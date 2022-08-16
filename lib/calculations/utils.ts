import { pipe } from 'fp-ts/lib/function'
import { ap } from 'fp-ts/lib/Identity'

import type { Scenarios, CO2EEmissions, VintageScopes } from './types'

export const add =
  (a: Scenarios) =>
  (b: Scenarios): Scenarios => ({
    p5: a.p5 + b.p5,
    wa: a.wa + b.wa,
    p95: a.p95 + b.p95,
  })

export const multiply =
  (a: Scenarios) =>
  (b: Scenarios): Scenarios => ({
    p5: a.p5 * b.p5,
    wa: a.wa * b.wa,
    p95: a.p95 * b.p95,
  })

export const scalarMultiply =
  (a: number) =>
  (b: Scenarios): Scenarios => ({
    p5: a * b.p5,
    wa: a * b.wa,
    p95: a * b.p95,
  })

export const scalarAddition =
  (a: number) =>
  (b: Scenarios): Scenarios => ({
    p5: a + b.p5,
    wa: a + b.wa,
    p95: a + b.p95,
  })

export const scopeAddition =
  (scope1: CO2EEmissions['scope1']) =>
  (scope3: CO2EEmissions['scope3']): CO2EEmissions['total'] => ({
    ch4: pipe(add, ap(scope1.ch4), ap(scope3.ch4)),
    co2: pipe(add, ap(scope1.co2), ap(scope3.co2)),
    total: pipe(add, ap(scope1.total), ap(scope3.total)),
  })

export const generateScenarioFromSingleNumber = (value: number): Scenarios => ({
  p5: value,
  wa: value,
  p95: value,
})

/**
 * Returns scope1 and scope3 in e6 ton co2e
 */
export const toVintageCO2ERepresentation = (
  e: CO2EEmissions
): VintageScopes => ({
  scope1: [e.scope1.total.p5, e.scope1.total.wa, e.scope1.total.p95],
  scope3: [e.scope3.total.p5, e.scope3.total.wa, e.scope3.total.p95],
})

export const toMillionCO2ETon = (e: CO2EEmissions): CO2EEmissions => ({
  scope1: {
    ch4: scalarMultiply(1 / 1e6)(e.scope1.ch4),
    co2: scalarMultiply(1 / 1e6)(e.scope1.co2),
    total: scalarMultiply(1 / 1e6)(e.scope1.total),
  },
  scope3: {
    ch4: scalarMultiply(1 / 1e6)(e.scope3.ch4),
    co2: scalarMultiply(1 / 1e6)(e.scope3.co2),
    total: scalarMultiply(1 / 1e6)(e.scope3.total),
  },
  total: {
    ch4: scalarMultiply(1 / 1e6)(e.total.ch4),
    co2: scalarMultiply(1 / 1e6)(e.total.co2),
    total: scalarMultiply(1 / 1e6)(e.total.total),
  },
})

export const fpLogger =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


    (...data: any[]) =>
    <T>(val: T): T => {
      // eslint-disable-next-line no-console
      console.info(data)
      return val
    }

export const generateZeroCO2EEmissions = (): CO2EEmissions => ({
  scope1: {
    total: generateScenarioFromSingleNumber(0),
    co2: generateScenarioFromSingleNumber(0),
    ch4: generateScenarioFromSingleNumber(0),
  },
  scope3: {
    total: generateScenarioFromSingleNumber(0),
    co2: generateScenarioFromSingleNumber(0),
    ch4: generateScenarioFromSingleNumber(0),
  },
  total: {
    total: generateScenarioFromSingleNumber(0),
    co2: generateScenarioFromSingleNumber(0),
    ch4: generateScenarioFromSingleNumber(0),
  },
})
