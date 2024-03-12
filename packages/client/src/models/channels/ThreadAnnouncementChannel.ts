import { ThreadAnnouncementChannel as TThreadAnnouncementChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class ThreadAnnouncementChannel extends AChannel<TThreadAnnouncementChannel>()({
  default_auto_archive_duration: "defaultAutoArchiveDuration",
  default_thread_rate_limit_per_user: "defaultThreadRateLimitPerUser",
  guild_id: "guildId",
  last_message_id: "lastMessageId",
  member_count: "memberCount",
  message_count: "messageCount",
  owner_id: "ownerId",
  parent_id: "parentId",
  permission_overwrites: "permissionOverwrites",
  rate_limit_per_user: "rateLimitPerUser",
  thread_metadata: "threadMetadata",
  total_messages_sent: "totalMessagesSent"
} as const) {}
