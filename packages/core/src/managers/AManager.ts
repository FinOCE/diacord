import { Snowflake } from "@diacord/api-types"
import { IApiClient } from "../api"
import { Bound, ChannelBinder } from "../binders"
import { IManager } from "./IManager"

export abstract class AManager<T> implements IManager<T> {
  protected readonly _apiClient: IApiClient
  protected readonly _binder: ChannelBinder

  public constructor(apiClient: IApiClient, binder: ChannelBinder) {
    this._apiClient = apiClient
    this._binder = binder
  }

  public abstract fetch(id: Snowflake, force?: boolean): Promise<Bound<T>>

  public abstract saveChanges(): Promise<void>
}
