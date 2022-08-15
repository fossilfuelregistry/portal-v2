// @ts-ignore
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import { useCallback } from 'react'
import getCalculationConstants, { Filters } from '.'
import { DatabaseRecord } from './types'

export const useCalculationConstants = (
  calculationConstants: DatabaseRecord[]
) => {
  const getConstants = useCallback(
    ({ country, projectId, modifier }: Filters) =>
      pipe(
        calculationConstants,
        O.fromNullable,
        O.map(getCalculationConstants({ country, modifier, projectId }))
      ),
    [calculationConstants]
  )
  return getConstants
}

export type GetConstants = ReturnType<
  ReturnType<typeof useCalculationConstants>
>
