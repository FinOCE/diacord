import { IStore } from "../stores/IStore"
import { Diff } from "../utils"
import { Bound, IBinder } from "./IBinder"

export abstract class ABinder<T extends object> implements IBinder<T> {
  protected _store: IStore<T>
  protected _modifications: Record<string, { [K in keyof T]?: Diff<T[K]> }> = {}
  protected _deletions: string[] = []

  public get modifications() {
    return structuredClone(this._modifications)
  }

  public get deletions() {
    return structuredClone(this._deletions)
  }

  public abstract keys: (keyof T)[]

  public constructor(store: IStore<T>) {
    this._store = store
  }

  public getObject(id: string) {
    const item = this._store.get(id)
    const clone = structuredClone(item)

    return this._bind(id, clone)
  }

  public setObject(id: string, item: T) {
    const clone = structuredClone(item)

    this._store.set(id, clone)
    this._modifications[id] = {}

    return this._bind(id, clone)
  }

  public getValue<K extends keyof T>(id: string, key: K) {
    const item = this._store.get(id)
    const clone = structuredClone(item)

    return clone[key]
  }

  public setValue<K extends keyof T>(id: string, key: K, value: T[K]) {
    const item = this._store.get(id)
    const clone = structuredClone(item)

    if (!this._modifications[id][key]) this._modifications[id][key] = { original: clone[key], updated: value }
    else if (this._modifications[id][key]!.original === value) delete this._modifications[id][key]
    else this._modifications[id][key]!.updated = value

    clone[key] = value
    this._store.set(id, clone)
  }

  public track(id: string) {
    const item = { id } as T
    this._store.set(id, item)

    return this._bind(id, item)
  }

  protected _bind(id: string, item: T) {
    const clone = structuredClone(item)

    this.keys.forEach(key =>
      Object.defineProperty(clone, key, {
        get: () => this.getValue(id, key),
        set: (v: T[keyof T]) => {
          if (!this._deletions.some(d => d === id)) this.setValue(id, key, v)
          else throw new Error("Cannot set value on item marked for deletion")
        }
      })
    )

    Object.defineProperty(clone, "delete", {
      value: () => {
        if (this._deletions.some(d => d === id)) this._deletions.push(id)
      }
    })

    Object.defineProperty(clone, "restore", {
      value: () => {
        const index = this._deletions.indexOf(id)
        if (index !== -1) this._deletions.splice(index, 1)
      }
    })

    return clone as Bound<T>
  }
}
