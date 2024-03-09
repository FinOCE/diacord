import { Channel, ChannelType, Requests, Snowflake } from "@diacord/api-types"
import { getNewDiffs, removeNull } from "../utils"
import { AManager } from "./AManager"

export class ChannelManager extends AManager<Channel, Requests["PostChannel"][0]["body"]> {
  public async create(guildId: Snowflake, body: Requests["PostChannel"][0]["body"]) {
    // Generate a random ID that isn't currently in use
    let id: string
    while (true) {
      id = "mock-" + Math.ceil(Math.random() * 8).toString()

      try {
        this._binder.getObject(id)
      } catch (err) {
        break
      }
    }

    // Create mock channel
    const mock = {
      id,
      type: body.type ?? ChannelType.GUILD_TEXT,
      guild_id: guildId,
      position: body.position ?? undefined,
      permission_overwrites: body.permission_overwrites ?? undefined,
      name: body.name,
      topic: body.topic,
      nsfw: body.nsfw ?? undefined,
      bitrate: body.bitrate ?? undefined,
      user_limit: body.user_limit ?? undefined,
      rate_limit_per_user: body.rate_limit_per_user ?? undefined,
      parent_id: body.parent_id,
      rtc_region: body.rtc_region,
      video_quality_mode: body.video_quality_mode ?? undefined,
      default_auto_archive_duration: body.default_auto_archive_duration ?? undefined,
      available_tags: body.available_tags,
      default_reaction_emoji: body.default_reaction_emoji,
      default_thread_rate_limit_per_user: body.default_thread_rate_limit_per_user ?? undefined,
      default_sort_order: body.default_sort_order,
      default_forum_layout: body.default_forum_layout
    }

    return this._binder.createObject(id, mock, body)
  }

  public async fetchAll(guildId: Snowflake) {
    const res = await this._apiClient.get("GuildChannels", { route: { guildId } })
    return res.map(channel => this._binder.setObject(channel.id, channel))
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

  public override async saveChanges(throwOnError: boolean = false) {
    // Handle deletions
    for (const channelId of this._binder.deletions) {
      try {
        await this._apiClient.delete("Channel", { route: { channelId } })
      } catch (err) {
        console.error(err)
        if (throwOnError) throw err
      }
    }

    // Handle additions
    for (const mockId of Object.keys(this._binder.additions)) {
      if (this._binder.deletions.some(id => id === mockId)) continue

      const body = this._binder.additions[mockId]
      const mock = this._binder.getObject(mockId)

      try {
        const item = await this._apiClient.post("Channel", { route: { guildId: mock.guild_id! }, body })
        this._binder.setObject(item.id, item)
        this._binder.createLink(mockId, item.id)
      } catch (err) {
        console.error(err)
        if (throwOnError) throw err
      }
    }

    // Handle modifications
    for (const channelId of Object.keys(this._binder.modifications)) {
      if (this._binder.deletions.some(id => id === channelId)) continue

      let updated = getNewDiffs(this._binder.modifications[channelId])
      const body = removeNull(updated, "name")
      if (Object.keys(updated).length === 0) continue

      try {
        await this._apiClient.patch("Channel", { route: { channelId }, body })
      } catch (err) {
        console.error(err)
        if (throwOnError) throw err
      }
    }
  }
}
