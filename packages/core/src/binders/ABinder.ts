import IStore from "../stores/IStore"
import IBinder from "./IBinder"

export default abstract class ABinder<T extends object> implements IBinder<T> {
  protected _store: IStore<T>

  public abstract keys: (keyof T)[]

  public constructor(store: IStore<T>) {
    this._store = store
  }

  public getObject(id: string) {
    const model = this._store.get(id)
    if (!model) throw new Error("Binder could not find instance of model")
    return model
  }

  public setObject(id: string, item: T) {
    this._store.set(id, item)
  }

  public getValue<K extends keyof T>(id: string, key: K) {
    return this.getObject(id)[key]
  }

  public setValue<K extends keyof T>(id: string, key: K, value: T[K]) {
    const model = this.getObject(id)
    model[key] = value
    this._store.set(id, model)
  }

  public bind(id: string, item: T) {
    const clone = structuredClone(item)
    this.setObject(id, item)

    this.keys.forEach(key =>
      Object.defineProperty(clone, key, {
        get: () => this.getValue(id, key),
        set: (v: T[keyof T]) => this.setValue(id, key, v)
      })
    )

    return clone
  }
}
