import { Diff } from "../utils"

export interface IBinder<T extends object, B extends object> {
  readonly keys: (keyof T)[]
  readonly additions: Record<string, B>
  readonly links: Record<string, string>
  readonly modifications: Record<string, { [K in keyof T]?: Diff<T[K]> }>
  readonly deletions: string[]

  createObject(id: string, item: T, body: B): Bound<T>

  createLink(mockId: string, realId: string): void

  getObject(id: string): Bound<T>

  setObject(id: string, item: T): Bound<T>

  getValue<K extends keyof T>(id: string, key: K): T[K]

  setValue<K extends keyof T>(id: string, key: K, value: T[K]): void

  track(id: string): Bound<T>
}

export type Bound<T> = T & {
  delete(): void
  restore(): void
}
