export interface IStore<T extends object> {
  get(id: string): T

  set(id: string, item: T): void

  remove(id: string): void

  clear(): void
}
