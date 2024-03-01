import { Snowflake } from "@diacord/api-types"
import IApiClient from "../api/IApiClient"
import ChannelBinder from "../binders/ChannelBinder"

export default class ChannelManager {
  private readonly _apiClient: IApiClient
  private readonly _binder: ChannelBinder

  public constructor(apiClient: IApiClient, binder: ChannelBinder) {
    this._apiClient = apiClient
    this._binder = binder
  }

  public async fetch(id: Snowflake) {
    return await this._apiClient.get("Channel", { route: { channelId: id } })
  }
}
