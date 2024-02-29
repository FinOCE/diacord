export default interface IStore<T extends object> {
  get(id: string): T | null

  set(id: string, item: T): void

  remove(id: string): void

  clear(): void
}
