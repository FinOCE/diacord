import { keys } from "../utils"
import { ABinder } from "./ABinder"
import { Channel } from "@diacord/api-types"

export class ChannelBinder extends ABinder<Channel> {
  public readonly keys = keys<Channel>()(
    "id",
    "type",
    "guild_id",
    "position",
    "permission_overwrites",
    "name",
    "topic",
    "nsfw",
    "last_message_id",
    "bitrate",
    "user_limit",
    "rate_limit_per_user",
    "recipients",
    "icon",
    "owner_id",
    "application_id",
    "managed",
    "parent_id",
    "last_pin_timestamp",
    "rtc_region",
    "video_quality_mode",
    "message_count",
    "member_count",
    "thread_metadata",
    "member",
    "default_auto_archive_duration",
    "permissions",
    "flags",
    "total_messages_sent",
    "available_tags",
    "applied_tags",
    "default_reaction_emoji",
    "default_thread_rate_limit_per_user",
    "default_sort_order",
    "default_forum_layout"
  )
}
