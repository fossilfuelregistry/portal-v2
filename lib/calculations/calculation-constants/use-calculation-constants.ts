// @ts-ignore
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import { useCallback } from 'react'
// @ts-ignore
import { useSelector } from 'react-redux'

import getCalculationConstants, { Filters } from '.'

export const useCalculationConstants = () => {
  const calculationConstants = useSelector(
    (redux: any) => redux.calculationConstants
  )

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
