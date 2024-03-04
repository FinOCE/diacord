import { Channel, Requests, Snowflake } from "@diacord/api-types"
import { getNewDiffs, removeNull } from "../utils"
import { AManager } from "./AManager"

export class ChannelManager extends AManager<Channel> {
  public async create(guildId: Snowflake, body: Requests["PostChannel"][0]["body"]) {
    const res = await this._apiClient.post("Channel", { route: { guildId }, body })
    return this._binder.setObject(res.id, res)

    // TODO: Change to apply operation in saveChanges() rather than instantly
  }

  public override async fetch(channelId: Snowflake, force: boolean = false) {
    try {
      if (force) throw new Error("Forcing re-fetch")
      return this._binder.getObject(channelId)
    } catch (err) {
      const res = await this._apiClient.get("Channel", { route: { channelId } })
      return this._binder.setObject(channelId, res)
    }
  }

  public override async saveChanges() {
    for (const channelId of Object.keys(this._binder.modifications)) {
      let updated = getNewDiffs(this._binder.modifications[channelId])
      const body = removeNull(updated, "name")

      await this._apiClient.patch("Channel", { route: { channelId }, body })
    }

    for (const channelId of this._binder.deletions) {
      await this._apiClient.delete("Channel", { route: { channelId } })
    }
  }
}
