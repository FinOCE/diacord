import {
  Channel,
  ChannelType,
  DefaultReaction,
  ForumLayoutType,
  ForumTag,
  PermissionOverwrite,
  Snowflake,
  SortOrderType,
  VideoQualityMode,
  int
} from "@diacord/api-types"

type RouteParams<T extends Record<string, string>> = {
  route: T
}

type QueryParams<T extends Record<string, string>> = {
  query: T
}

type Body<T> = {
  body: T
}

type Headers<T extends Record<string, string>> = {
  headers: T
}

export type UnknownRouteData = Partial<
  RouteParams<Record<string, string>> &
    QueryParams<Record<string, string>> &
    Body<any> &
    Headers<Record<string, string>>
>

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

export const routes: Record<keyof RouteData, string> = {
  PostChannel: "https://discord.com/api/v10/guilds/{guildId}/channels",
  GetChannel: "https://discord.com/api/v10/channels/{channelId}",
  PatchChannel: "https://discord.com/api/v10/channels/{channelId}",
  DeleteChannel: "https://discord.com/api/v10/channels/{channelId}"
} as const

export type RouteData = {
  PostChannel: [PostChannelRequest, PostChannelResponse]
  GetChannel: [GetChannelRequest, GetChannelResponse]
  PatchChannel: [PatchChannelRequest, PatchChannelResponse]
  DeleteChannel: [DeleteChannelRequest, DeleteChannelResponse]
}

export type Action<A extends string> = {
  [P in keyof RouteData]: P extends `${A}${infer K}` ? K : never
}[keyof RouteData]
