import Diff from "../types/Diff"

export default interface IBinder<T extends object> {
  readonly keys: (keyof T)[]
  readonly modifications: Record<string, { [K in keyof T]?: Diff<T[K]> }>

  getObject(id: string): T

  setObject(id: string, item: T): void

  getValue<K extends keyof T>(id: string, key: K): T[K]

  setValue<K extends keyof T>(id: string, key: K, value: T[K]): void
}
