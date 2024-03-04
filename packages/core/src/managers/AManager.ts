import { Snowflake } from "@diacord/api-types"
import { IApiClient } from "../api"
import { Bound, IBinder } from "../binders"
import { IManager } from "./IManager"

export abstract class AManager<T extends object> implements IManager<T> {
  protected readonly _apiClient: IApiClient
  protected readonly _binder: IBinder<T>

  public constructor(apiClient: IApiClient, binder: IBinder<T>) {
    this._apiClient = apiClient
    this._binder = binder
  }

  public abstract fetch(id: Snowflake, force?: boolean): Promise<Bound<T>>

  public track(id: Snowflake) {
    return this._binder.track(id)
  }

  public abstract saveChanges(): Promise<void>
}
