import { DmGroupChannel as TDmGroupChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class DmGroupChannel extends AChannel<TDmGroupChannel>()({
  application_id: "applicationId",
  last_message_id: "lastMessageId",
  last_pin_timestamp: "lastPinTimestamp",
  owner_id: "ownerId"
} as const) {}
