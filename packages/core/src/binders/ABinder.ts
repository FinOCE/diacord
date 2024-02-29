import IStore from "../stores/IStore"
import Diff from "../types/Diff"
import IBinder from "./IBinder"

export default abstract class ABinder<T extends object> implements IBinder<T> {
  protected _store: IStore<T>
  protected _modifications: Record<string, { [K in keyof T]?: Diff<T[K]> }> = {}

  public get modifications() {
    return structuredClone(this._modifications)
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

  protected _bind(id: string, item: T) {
    const clone = structuredClone(item)

    this.keys.forEach(key =>
      Object.defineProperty(clone, key, {
        get: () => this.getValue(id, key),
        set: (v: T[keyof T]) => this.setValue(id, key, v)
      })
    )

    return clone
  }
}
