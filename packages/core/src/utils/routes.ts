import { Channel, Snowflake } from "@diacord/api-types"

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
 * TODO: Link
 */
type GetChannelResponse = Channel
type GetChannelRequest = GetChannelRouteParams
type GetChannelRouteParams = RouteParams<{
  channelId: Snowflake
}>

const routes: Record<keyof RouteData, string> = {
  GetChannel: "https://discord.com/api/v10/channels/{channelId}"
} as const

export type RouteData = {
  GetChannel: [GetChannelRequest, GetChannelResponse]
}

export type Action<A extends string> = {
  [P in keyof RouteData]: P extends `${A}${infer K}` ? K : never
}[keyof RouteData]

export default routes
