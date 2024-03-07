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

//#region SPECIFIC CHANNELS, NEED TO VERIFY
export type DmChannel = Pick<Channel, "id" | "type" | "last_message_id" | "recipients" | "last_pin_timestamp"> & {
  type: ChannelType.DM
}

export type DmGroupChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "name"
  | "last_message_id"
  | "recipients"
  | "icon"
  | "owner_id"
  | "application_id"
  | "managed"
  | "last_pin_timestamp"
> & { type: ChannelType.GROUP_DM }

export type GuildAnnouncementChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "position"
  | "permission_overwrites"
  | "name"
  | "topic"
  | "last_message_id"
  | "parent_id"
  | "last_pin_timestamp"
  | "permissions"
> & { type: ChannelType.GUILD_ANNOUNCEMENT }

export type GuildCategoryChannel = Pick<
  Channel,
  "id" | "type" | "guild_id" | "position" | "permission_overwrites" | "name" | "permissions"
> & {
  type: ChannelType.GUILD_CATEGORY
}

export type GuildForumChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "position"
  | "permission_overwrites"
  | "name"
  | "topic"
  | "last_message_id"
  | "rate_limit_per_user"
  | "parent_id"
  | "last_pin_timestamp"
  | "permissions"
  | "flags"
  | "available_tags"
  | "applied_tags"
  | "default_reaction_emoji"
  | "default_sort_order"
  | "default_forum_layout"
> & {
  type: ChannelType.GUILD_FORUM
}

export type GuildMediaChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "position"
  | "permission_overwrites"
  | "name"
  | "topic"
  | "last_message_id"
  | "rate_limit_per_user"
  | "parent_id"
  | "last_pin_timestamp"
  | "permissions"
  | "flags"
  | "available_tags"
  | "applied_tags"
  | "default_reaction_emoji"
  | "default_sort_order"
> & {
  type: ChannelType.GUILD_MEDIA
}

export type GuildStageChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "position"
  | "permission_overwrites"
  | "name"
  | "topic"
  | "bitrate"
  | "user_limit"
  | "parent_id"
  | "rtc_region"
  | "video_quality_mode"
  | "permissions"
> & {
  type: ChannelType.GUILD_STAGE_VOICE
}

export type GuildTextChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "position"
  | "permission_overwrites"
  | "name"
  | "topic"
  | "nsfw"
  | "last_message_id"
  | "rate_limit_per_user"
  | "parent_id"
  | "last_pin_timestamp"
  | "permissions"
> & {
  type: ChannelType.GUILD_TEXT
}

export type GuildVoiceChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "position"
  | "permission_overwrites"
  | "name"
  | "topic"
  | "bitrate"
  | "user_limit"
  | "parent_id"
  | "rtc_region"
  | "video_quality_mode"
  | "permissions"
> & {
  type: ChannelType.GUILD_VOICE
}

export type ThreadAnnouncementChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "permission_overwrites"
  | "name"
  | "last_message_id"
  | "rate_limit_per_user"
  | "owner_id"
  | "parent_id"
  | "message_count"
  | "member_count"
  | "thread_metadata"
  | "member"
  | "default_auto_archive_duration"
  | "permissions"
  | "total_messages_sent"
  | "default_thread_rate_limit_per_user"
> & {
  type: ChannelType.ANNOUNCEMENT_THREAD
}

export type ThreadPrivateChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "permission_overwrites"
  | "name"
  | "last_message_id"
  | "rate_limit_per_user"
  | "owner_id"
  | "parent_id"
  | "message_count"
  | "member_count"
  | "thread_metadata"
  | "member"
  | "default_auto_archive_duration"
  | "permissions"
  | "total_messages_sent"
  | "default_thread_rate_limit_per_user"
> & {
  type: ChannelType.PRIVATE_THREAD
}

export type ThreadPublicChannel = Pick<
  Channel,
  | "id"
  | "type"
  | "guild_id"
  | "permission_overwrites"
  | "name"
  | "last_message_id"
  | "rate_limit_per_user"
  | "owner_id"
  | "parent_id"
  | "message_count"
  | "member_count"
  | "thread_metadata"
  | "member"
  | "default_auto_archive_duration"
  | "permissions"
  | "total_messages_sent"
  | "default_thread_rate_limit_per_user"
> & {
  type: ChannelType.PUBLIC_THREAD
}

// TODO: Check if "last_message_id" is present in voice/stage channels (because the inner text channel). Should also
//       double check other possible text channel params

// TODO: Check if "bitrate" is present in DM and guild DM channels (as well as other VC params like "rtc_region",
//       "video_quality_mode")

// TODO: Confirm "user_limit" is on stage channels, and check if in DM and guild DM channels

// TODO: Check if messages can be pinned in threads (probably not, if so they need "last_pin_timestamp") and also media
//       and forum channels (these two assumed yes)

// TODO: Check if "default_auto_archive_duration" is in forum and media channels

//#endregion

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
