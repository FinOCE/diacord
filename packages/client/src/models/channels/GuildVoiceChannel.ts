import { GuildVoiceChannel as TGuildVoiceChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class GuildVoiceChannel extends AChannel<TGuildVoiceChannel>()({
  guild_id: "guildId",
  parent_id: "parentId",
  permission_overwrites: "permissionOverwrites",
  rtc_region: "rtcRegion",
  user_limit: "userLimit",
  video_quality_mode: "videoQualityMode"
} as const) {}
