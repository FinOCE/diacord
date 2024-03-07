import { Snowflake } from "./Api"
import {
  Channel,
  ChannelType,
  DefaultReaction,
  ForumLayoutType,
  ForumTag,
  SortOrderType,
  VideoQualityMode
} from "./Channel"
import { int } from "./Global"
import { PermissionOverwrite } from "./Permission"

export type RouteParams<T extends Record<string, string>> = {
  route: T
}

export type QueryParams<T extends Record<string, string>> = {
  query: T
}

export type Body<T> = {
  body: T
}

export type Headers<T extends Record<string, string>> = {
  headers: T
}

export type Requests = {
  PostChannel: [PostChannelRequest, PostChannelResponse]
  GetChannel: [GetChannelRequest, GetChannelResponse]
  PatchChannel: [PatchChannelRequest, PatchChannelResponse]
  DeleteChannel: [DeleteChannelRequest, DeleteChannelResponse]
  GetGuildChannels: [GetGuildChannelsRequest, GetGuildChannelsResponse]
}

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-channel
 */
type PostChannelResponse = Channel
type PostChannelRequest = PostChannelRouteParams & PostChannelBody
type PostChannelRouteParams = RouteParams<{
  guildId: Snowflake
}>
type PostChannelBody = Body<{
  name: string
  type?: ChannelType
  topic?: string | null
  bitrate?: int | null
  user_limit?: int | null
  rate_limit_per_user?: int | null
  position?: int | null
  permission_overwrites?: PermissionOverwrite[] | null // TODO: ** condition
  parent_id?: Snowflake | null
  nsfw?: boolean | null
  rtc_region?: string | null | null
  video_quality_mode?: VideoQualityMode | null
  default_auto_archive_duration?: int | null
  default_reaction_emoji?: DefaultReaction | null
  available_tags?: ForumTag[]
  default_sort_order?: SortOrderType | null
  default_forum_layout?: ForumLayoutType
  default_thread_rate_limit_per_user?: int | null
}>

/**
 * https://discord.com/developers/docs/resources/channel#get-channel
 */
type GetChannelResponse = Channel
type GetChannelRequest = GetChannelRouteParams
type GetChannelRouteParams = RouteParams<{
  channelId: Snowflake
}>

/**
 * https://discord.com/developers/docs/resources/channel#modify-channel
 */
type PatchChannelResponse = Channel
type PatchChannelRequest = PatchChannelRouteParams & PatchChannelBody
type PatchChannelRouteParams = RouteParams<{
  channelId: Snowflake
}>
type PatchChannelBody = PatchChannelBodyGroupDm | PatchChannelBodyChannel | PatchChannelBodyThread
type PatchChannelBodyGroupDm = Body<{
  name?: string
  icon?: BinaryData
}>
type PatchChannelBodyChannel = Body<{
  name?: string
  type?: ChannelType
  position?: int | null
  topic?: string | null
  nsfw?: boolean | null
  rate_limit_per_user?: int | null
  bitrate?: int | null
  user_limit?: int | null
  permission_overwrites?: PermissionOverwrite[] | null // TODO: ** condition
  parent_id?: Snowflake | null
  rtc_region?: string | null | null
  video_quality_mode?: VideoQualityMode | null
  default_auto_archive_duration?: int | null
  flags?: int
  available_tags?: ForumTag[]
  default_reaction_emoji?: DefaultReaction | null
  default_thread_rate_limit_per_user?: int
  default_sort_order?: SortOrderType | null
  default_forum_layout?: ForumLayoutType
}>
type PatchChannelBodyThread = Body<{
  name?: string
  archived?: boolean
  auto_archive_duration?: int
  locked?: boolean
  invitable?: boolean
  rate_limit_per_user?: int
  flags?: int
  applied_tags?: Snowflake[]
}>

/**
 * https://discord.com/developers/docs/resources/channel#deleteclose-channel
 */
type DeleteChannelResponse = Channel
type DeleteChannelRequest = DeleteChannelRouteParams
type DeleteChannelRouteParams = RouteParams<{
  channelId: Snowflake
}>

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-channels
 */
type GetGuildChannelsResponse = Channel[]
type GetGuildChannelsRequest = GetGuildChannelsRouteParams
type GetGuildChannelsRouteParams = RouteParams<{
  guildId: Snowflake
}>
