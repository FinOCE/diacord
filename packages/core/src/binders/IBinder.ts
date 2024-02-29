export default interface IBinder<T extends object> {
  getObject(id: string): T

  setObject(id: string, item: T): void

  getValue<K extends keyof T>(id: string, key: K): T[K]

  setValue<K extends keyof T>(id: string, key: K, value: T[K]): void

  bind(id: string, item: T): T
}
