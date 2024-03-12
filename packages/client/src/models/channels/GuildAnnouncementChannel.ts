import { GuildAnnouncementChannel as TGuildAnnouncementChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class GuildAnnouncementChannel extends AChannel<TGuildAnnouncementChannel>()({
  guild_id: "guildId",
  last_message_id: "lastMessageId",
  last_pin_timestamp: "lastPinTimestamp",
  permission_overwrites: "permissionOverwrites",
  parent_id: "parentId"
} as const) {}
