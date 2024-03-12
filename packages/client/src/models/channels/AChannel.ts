import { Channel as TChannel } from "@diacord/api-types"
import { Bound } from "@diacord/core"
import { Rename } from "../../types/Rename"

export interface IBound<T extends TChannel, R extends Partial<Record<keyof T, string>>> {
  new (data: Bound<T>): Rename<T, R> & { inspect(): T }
}

export function AChannel<T extends TChannel>() {
  const ctor = class {
    protected _data: Bound<T>

    public constructor(data: Bound<T>) {
      this._data = data
    }

    /**
     * Access the inner data the class represents.
     * @returns The underlying data of the channel
     */
    public inspect() {
      return structuredClone(this._data)
    }
  }

  return function <R extends Partial<Record<keyof T, string>>>(renames: R) {
    const c = ctor as new (data: Bound<T>) => Record<string, any>

    for (let key of Object.keys(ctor.prototype.inspect())) {
      key = key in renames ? renames[key as keyof R]! : key

      Object.defineProperty(c.prototype, key, {
        get: function () {
          return this._data[key]
        },
        set: function (val: any) {
          this._data[key] = val
        }
      })
    }

    return c as IBound<T, typeof renames>
  }
}
