import { Snowflake } from "@diacord/api-types"
import { Bound } from "../binders"

export interface IManager<T> {
  fetch(id: Snowflake, force?: boolean): Promise<Bound<T>>

  track(id: Snowflake): Bound<T>

  saveChanges(): Promise<void>
}
