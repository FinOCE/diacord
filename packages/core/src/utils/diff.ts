export type Diff<T> = {
  original: T
  updated: T
}

export function getNewDiffs<T>(diff: { [K in keyof T]?: Diff<T[K]> }) {
  const updated: Partial<T> = {}

  for (const key of Object.keys(diff) as (keyof T)[]) {
    updated[key] = diff[key]?.updated
  }

  return updated
}

export function getOriginalDiffs<T>(diff: { [K in keyof T]?: Diff<T[K]> }) {
  const updated: Partial<T> = {}

  for (const key of Object.keys(diff) as (keyof T)[]) {
    updated[key] = diff[key]?.original
  }

  return updated
}
