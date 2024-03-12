import { GuildForumChannel as TGuildForumChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class GuildForumChannel extends AChannel<TGuildForumChannel>()({
  applied_tags: "appliedTags",
  available_tags: "availableTags",
  default_forum_layout: "defaultForumLayout",
  default_reaction_emoji: "defaultReactionEmoji",
  default_sort_order: "defaultSortOrder",
  guild_id: "guildId",
  last_message_id: "lastMessageId",
  last_pin_timestamp: "lastPinTimestamp",
  parent_id: "parentId",
  permission_overwrites: "permissionOverwrites",
  rate_limit_per_user: "rateLimitPerUser"
} as const) {}
