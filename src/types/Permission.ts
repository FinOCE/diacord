import { Snowflake } from "./Api"

/**
 * https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure
 */
export type PermissionOverwrite = {
  id: Snowflake
  type: PermissionOverwriteType
  allow: string
  deny: string
}

/**
 * https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure
 */
export enum PermissionOverwriteType {
  ROLE = 0,
  MEMBER = 1
}
