import { IStore } from "../stores"
import { Diff } from "../utils"
import { Bound, IBinder } from "./IBinder"

export abstract class ABinder<T extends object, B extends object> implements IBinder<T, B> {
  protected _store: IStore<T>
  protected _additions: Record<string, B> = {}
  protected _links: Record<string, string> = {}
  protected _modifications: Record<string, { [K in keyof T]?: Diff<T[K]> }> = {}
  protected _deletions: string[] = []

  public get additions() {
    return structuredClone(this._additions)
  }

  public get links() {
    return structuredClone(this._links)
  }

  public get modifications() {
    const modifications: Record<string, { [K in keyof T]?: Diff<T[K]> }> = {}

    for (const id of Object.keys(this._modifications)) {
      const linkId = id in Object.keys(this._links) ? this._links[id] : id
      modifications[linkId ?? id] = this._modifications[id]
    }

    return modifications
  }

  public get deletions() {
    const deletions: string[] = []

    for (const id of this._deletions) {
      const linkId = id in Object.keys(this._links) ? this._links[id] : id
      deletions.push(linkId)
    }

    return deletions
  }

  public abstract keys: (keyof T)[]

  public constructor(store: IStore<T>) {
    this._store = store
  }

  public createObject(id: string, item: T, body: B) {
    this._additions[id] = body
    return this.setObject(id, item)
  }

  public createLink(mockId: string, realId: string) {
    this._links[mockId] = realId
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
    return this.getObject(id)[key]
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
    return this.setObject(id, { id } as T)
  }

  protected _bind(id: string, item: T) {
    const clone = Object.assign(structuredClone(item), {
      delete: () => {
        if (!this._deletions.some(d => d === id)) this._deletions.push(id)
      },
      restore: () => {
        const index = this._deletions.indexOf(id)
        if (index !== -1) this._deletions.splice(index, 1)
      }
    })

    this.keys.forEach(key =>
      Object.defineProperty(clone, key, {
        get: () => this.getValue(id, key),
        set: (v: T[keyof T]) => {
          if (!this._deletions.some(d => d === id)) this.setValue(id, key, v)
          else throw new Error("Cannot set value on item marked for deletion")
        }
      })
    )

    return clone as Bound<T>
  }
}
