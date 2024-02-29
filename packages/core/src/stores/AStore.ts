import IStore from "./IStore"

export default class AStore<T extends object> implements IStore<T> {
  protected _items: Record<string, T> = {}

  public get(id: string) {
    if (this._items[id]) return this._items[id]
    else return null
  }

  public set(id: string, item: T) {
    this._items[id] = item
  }

  public remove(id: string) {
    delete this._items[id]
  }

  public clear() {
    this._items = {}
  }
}
