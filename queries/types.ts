export type GQLNodes<T, Query extends string> = {
    data: Record<Query, { nodes: T[] }>
}
