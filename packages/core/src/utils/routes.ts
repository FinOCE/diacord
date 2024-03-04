import { Requests } from "@diacord/api-types"

export const routes: Record<keyof Requests, string> = {
  PostChannel: "https://discord.com/api/v10/guilds/{guildId}/channels",
  GetChannel: "https://discord.com/api/v10/channels/{channelId}",
  PatchChannel: "https://discord.com/api/v10/channels/{channelId}",
  DeleteChannel: "https://discord.com/api/v10/channels/{channelId}"
} as const

export type Action<A extends string> = {
  [P in keyof Requests]: P extends `${A}${infer K}` ? K : never
}[keyof Requests]
