import {
  DmChannel,
  DmGroupChannel,
  GuildAnnouncementChannel,
  GuildForumChannel,
  GuildMediaChannel,
  GuildStageChannel,
  GuildTextChannel,
  GuildVoiceChannel,
  ThreadAnnouncementChannel,
  ThreadPrivateChannel,
  ThreadPublicChannel
} from "@diacord/api-types"
import { Intersection } from "../types/Intersection"

export type BaseChannel = Intersection<
  [
    DmChannel,
    DmGroupChannel,
    GuildAnnouncementChannel,
    GuildForumChannel,
    GuildMediaChannel,
    GuildStageChannel,
    GuildTextChannel,
    GuildVoiceChannel,
    ThreadAnnouncementChannel,
    ThreadPrivateChannel,
    ThreadPublicChannel
  ]
>

export type DmBasedChannel = Intersection<[DmChannel, DmGroupChannel]>

export type GuildBasedChannel = Intersection<
  [
    GuildAnnouncementChannel,
    GuildForumChannel,
    GuildMediaChannel,
    GuildStageChannel,
    GuildTextChannel,
    GuildVoiceChannel,
    ThreadAnnouncementChannel,
    ThreadPrivateChannel,
    ThreadPublicChannel
  ]
>

export type TextBasedChannel = Intersection<
  [GuildAnnouncementChannel, GuildTextChannel, ThreadAnnouncementChannel, ThreadPrivateChannel, ThreadPublicChannel]
>

export type VoiceBasedChannel = Intersection<[GuildStageChannel, GuildVoiceChannel]>

export type ThreadBasedChannel = Intersection<[ThreadAnnouncementChannel, ThreadPrivateChannel, ThreadPublicChannel]>

export type PostBasedChannel = Intersection<[GuildForumChannel, GuildMediaChannel]>
