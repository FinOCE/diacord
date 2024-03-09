import { Bound } from "../binders"

export interface IManager<T extends object> {
  fetch(id: string, force?: boolean): Promise<Bound<T>>

  track(id: string): Bound<T>

  saveChanges(throwOnError?: boolean): Promise<void>
}
