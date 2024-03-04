import { Bound } from "../binders"

export interface IManager<T> {
  fetch(id: string, force?: boolean): Promise<Bound<T>>

  track(id: string): Bound<T>

  saveChanges(): Promise<void>
}
