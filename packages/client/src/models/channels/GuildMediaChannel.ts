import { GuildMediaChannel as TGuildMediaChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class GuildMediaChannel extends AChannel<TGuildMediaChannel>()({
  applied_tags: "appliedTags",
  available_tags: "availableTags",
  default_reaction_emoji: "defaultReactionEmoji",
  default_sort_order: "defaultSortOrder",
  guild_id: "guildId",
  last_message_id: "lastMessageId",
  last_pin_timestamp: "lastPinTimestamp",
  parent_id: "parentId",
  permission_overwrites: "permissionOverwrites",
  rate_limit_per_user: "rateLimitPerUser"
} as const) {}
