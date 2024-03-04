import { Channel, Snowflake } from "@diacord/api-types"
import { getNewDiffs, removeNull } from "../utils"
import { AManager } from "./AManager"

export class ChannelManager extends AManager<Channel> {
  public override async fetch(id: Snowflake, force: boolean = false) {
    try {
      if (force) throw new Error("Forcing re-fetch")
      return this._binder.getObject(id)
    } catch (err) {
      const res = await this._apiClient.get("Channel", { route: { channelId: id } })
      return this._binder.setObject(id, res)
    }
  }

  public override async saveChanges() {
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
