import { pipe } from 'fp-ts/function'
import Graph from 'graph-data-structure'
import { useCallback, useMemo } from 'react'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'

export type PrefixRecord = {
  fromPrefix: string
  toPrefix: string
  factor: number
}

const prefixGraph = (rows: PrefixRecord[]) => {
  const g = Graph()
  rows.forEach(({ fromPrefix, toPrefix, factor }) => {
    if (!g.hasEdge(fromPrefix, toPrefix)) {
      g.addEdge(fromPrefix, toPrefix, factor)
    }
    if (!g.hasEdge(toPrefix, fromPrefix)) {
      g.addEdge(toPrefix, fromPrefix, 1 / factor)
    }
  })
  return g
}

const shortestPathBoolean = (graph: ReturnType<typeof Graph>) =>
(from: string, to: string) =>
 E.tryCatch(()=>graph.shortestPath(from, to),()=>false)

const getFactor =
  (graph: ReturnType<typeof Graph>) =>
  (from: string, to: string): number =>
    pipe(
      shortestPathBoolean(graph)(from, to),
      E.match(
        () =>
          E.left(
            new Error(`Could not find prefix factor from ${from} to ${to}`)
          ),
        () => {
          const paths = graph.shortestPath(from, to);
          return E.right(paths.reduce((prev, curr, i)=>prev * graph.getEdgeWeight(curr, paths[i+1]), 1))
        }
      ),
      E.getOrElse((e) => {
        console.error(e)
        return 1
      })
    )

export const usePrefixConversion = (prefixes: PrefixRecord[]) => {
  const graph = useMemo(
    () =>
      pipe(
        prefixes,
        O.fromNullable,
        O.map(prefixGraph),
        O.getOrElseW(() => null)
      ),
    [prefixes]
  )
  const conversion = useCallback(
    (from: string, to: string): number | null => {
      if (!graph) return null
      if (from.trim() === to.trim()) return 1
      return getFactor(graph)(from.trim(), to.trim())
    },
    [graph]
  )

  return conversion
}
