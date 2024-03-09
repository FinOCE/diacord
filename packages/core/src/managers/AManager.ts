import { IApiClient } from "../api"
import { Bound, IBinder } from "../binders"
import { IManager } from "./IManager"

export abstract class AManager<T extends object, B extends object> implements IManager<T> {
  protected readonly _apiClient: IApiClient
  protected readonly _binder: IBinder<T, B>

  public constructor(apiClient: IApiClient, binder: IBinder<T, B>) {
    this._apiClient = apiClient
    this._binder = binder
  }

  public abstract fetch(id: string, force?: boolean): Promise<Bound<T>>

  public track(id: string) {
    return this._binder.track(id)
  }

  public abstract saveChanges(throwOnError?: boolean): Promise<void>
}
