import { GuildCategoryChannel as TGuildCategoryChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class GuildCategoryChannel extends AChannel<TGuildCategoryChannel>()({
  guild_id: "guildId",
  permission_overwrites: "permissionOverwrites"
} as const) {}
