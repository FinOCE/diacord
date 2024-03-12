import { GuildTextChannel as TGuildTextChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class GuildTextChannel extends AChannel<TGuildTextChannel>()({
  guild_id: "guildId",
  last_message_id: "lastMessageId",
  last_pin_timestamp: "lastPinTimestamp",
  parent_id: "parentId",
  permission_overwrites: "permissionOverwrites",
  rate_limit_per_user: "rateLimitPerUser"
} as const) {}
