import { Snowflake } from "./Api"
import { ISO8601, int } from "./Global"
import { PermissionOverwrite } from "./Permission"
import { User } from "./User"

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-structure
 */
export type Channel = {
  id: Snowflake
  type: ChannelType
  guild_id?: Snowflake
  position?: int
  permission_overwrites?: PermissionOverwrite[]
  name?: string | null
  topic?: string | null
  nsfw?: boolean
  last_message_id?: Snowflake | null
  bitrate?: int
  user_limit?: int
  rate_limit_per_user?: int
  recipients?: User[]
  icon?: string | null
  owner_id?: Snowflake
  application_id?: Snowflake
  managed?: boolean
  parent_id?: Snowflake | null
  last_pin_timestamp?: ISO8601 | null
  rtc_region?: string | null
  video_quality_mode?: VideoQualityMode
  message_count?: int
  member_count?: int
  thread_metadata?: ThreadMetadata
  member?: ThreadMember
  default_auto_archive_duration?: int
  permissions?: string
  flags?: int
  total_messages_sent?: int
  available_tags?: ForumTag[]
  applied_tags?: Snowflake[]
  default_reaction_emoji?: DefaultReaction | null
  default_thread_rate_limit_per_user?: int
  default_sort_order?: SortOrderType | null
  default_forum_layout?: ForumLayoutType
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-flags
 */
export enum ChannelFlag {
  PINNED = 1 << 1,
  REQUIRE_TAG = 1 << 4,
  HIDE_MEDIA_DOWNLOAD_OPTIONS = 1 << 15
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-structure
 */
export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
  GUILD_MEDIA = 16
}

/**
 * https://discord.com/developers/docs/resources/channel#default-reaction-object-default-reaction-structure
 */
export type DefaultReaction = {
  emoji_id?: Snowflake
  emoji_name?: string
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types
 */
export enum ForumLayoutType {
  NOT_SET = 0,
  LIST_VIEW = 1,
  GALLERY_VIEW = 2
}

/**
 * https://discord.com/developers/docs/resources/channel#forum-tag-object-forum-tag-structure
 */
export type ForumTag = {
  id: Snowflake
  name: string
  moderated: boolean
  emoji_id?: Snowflake
  emoji_name?: string
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types
 */
export enum SortOrderType {
  LATEST_ACTIVITY = 0,
  CREATION_DATE = 1
}

/**
 * https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure
 */
export type ThreadMetadata = {
  archived: boolean
  auto_archive_duration: int
  archived_timestamp: ISO8601
  locked: boolean
  invitable?: boolean
  created_timestamp: ISO8601
}

/**
 * https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure
 */
export type ThreadMember = {
  id?: Snowflake
  user_id?: Snowflake
  join_timestamp: ISO8601
  flags: int
  member?: object // TODO: GuildMember object
}

/**
 * https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes
 */
export enum VideoQualityMode {
  AUTO = 1,
  FULL = 2
}

/**
 * https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure
 */
export type VoiceRegion = {
  id: string
  name: string
  optimal: boolean
  deprecated: boolean
  custom: boolean
}
