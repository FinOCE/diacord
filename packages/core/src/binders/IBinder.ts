import { Diff } from "../utils"

export interface IBinder<T extends object> {
  readonly keys: (keyof T)[]
  readonly modifications: Record<string, { [K in keyof T]?: Diff<T[K]> }>
  readonly deletions: string[]

  getObject(id: string): Bound<T>

  setObject(id: string, item: T): void

  getValue<K extends keyof T>(id: string, key: K): T[K]

  setValue<K extends keyof T>(id: string, key: K, value: T[K]): void

  track(id: string): Bound<T>
}

export type Bound<T> = T & {
  delete(): void
  restore(): void
}
