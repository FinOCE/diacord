import { Requests } from "@diacord/api-types"
import { Action } from "../utils"

export interface IApiClient {
  get<K extends Action<"Get">>(route: K, data: Requests[`Get${K}`][0]): Promise<Requests[`Get${K}`][1]>

  post<K extends Action<"Post">>(route: K, data: Requests[`Post${K}`][0]): Promise<Requests[`Post${K}`][1]>

  put<K extends Action<"Put">>(route: K, data: Requests[`Put${K}`][0]): Promise<Requests[`Put${K}`][1]>

  patch<K extends Action<"Patch">>(route: K, data: Requests[`Patch${K}`][0]): Promise<Requests[`Patch${K}`][1]>

  delete<K extends Action<"Delete">>(route: K, data: Requests[`Delete${K}`][0]): Promise<Requests[`Delete${K}`][1]>
}
