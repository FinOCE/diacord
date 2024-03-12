import { DmChannel as TDmChannel } from "@diacord/api-types"
import { AChannel } from "./AChannel"

export class DmChannel extends AChannel<TDmChannel>()({
  last_message_id: "lastMessageId",
  last_pin_timestamp: "lastPinTimestamp"
} as const) {}
