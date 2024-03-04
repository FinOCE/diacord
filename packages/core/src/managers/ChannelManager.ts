import { Channel, Snowflake } from "@diacord/api-types"
import { IApiClient } from "../api"
import { ChannelBinder } from "../binders"
import { getNewDiffs, removeNull } from "../utils"
import { Bound } from "../binders"

export class ChannelManager {
  private readonly _apiClient: IApiClient
  private readonly _binder: ChannelBinder

  public constructor(apiClient: IApiClient, binder: ChannelBinder) {
    this._apiClient = apiClient
    this._binder = binder
  }

  public async fetch(id: Snowflake, force: boolean = false) {
    let channel: Bound<Channel>
    try {
      channel = this._binder.getObject(id)
    } catch (err) {
      const res = await this._apiClient.get("Channel", { route: { channelId: id } })
      this._binder.setObject(id, res)
      channel = this._binder.getObject(id)
    }

    return channel
  }

  public async saveChanges() {
    for (const channelId of this._binder.deletions) {
      await this._apiClient.delete("Channel", { route: { channelId } })
    }

    for (const channelId of Object.keys(this._binder.modifications)) {
      if (this._binder.deletions.some(d => d === channelId)) continue

      let updated = getNewDiffs(this._binder.modifications[channelId])
      const body = removeNull(updated, "name")

      await this._apiClient.patch("Channel", { route: { channelId }, body })
    }
  }
}
