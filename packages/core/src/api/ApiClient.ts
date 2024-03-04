import { Body, Headers, QueryParams, Requests, RouteParams } from "@diacord/api-types"
import { Action, routes } from "../utils"
import { IApiClient } from "./IApiClient"

type UnknownRequest = Partial<
  RouteParams<Record<string, string>> &
    QueryParams<Record<string, string>> &
    Body<any> &
    Headers<Record<string, string>>
>

export class ApiClient implements IApiClient {
  private _query<A extends string>(method: A) {
    return <K extends Action<A>>(item: K, { route, query, body, headers }: UnknownRequest) => {
      const endpoint = Object.keys(route ?? {}).reduce(
        (endpoint, key) => endpoint.replace(`{${key}}`, route![key]),
        routes[`${method}${item}` as keyof Requests]
      )

      const params = query ? `?${new URLSearchParams(query).toString()}` : ""

      const payload: Record<string, any> = {
        method: method.toUpperCase(),
        body,
        headers
      }

      return <T>() => {
        const res = { endpoint, params, payload } // TODO: Use these to send request
        return res as unknown as Promise<T>
      }
    }
  }

  public async get<K extends Action<"Get">>(item: K, data: Requests[`Get${K}`][0]) {
    return this._query("Get")(item, data)<Requests[`Get${K}`][1]>()
  }

  public async post<K extends Action<"Post">>(item: K, data: Requests[`Post${K}`][0]) {
    return this._query("Post")(item, data)<Requests[`Post${K}`][1]>()
  }

  public async put<K extends Action<"Put">>(item: K, data: Requests[`Put${K}`][0]) {
    return this._query("Put")(item, data)<Requests[`Put${K}`][1]>()
  }

  public async patch<K extends Action<"Patch">>(item: K, data: Requests[`Patch${K}`][0]) {
    return this._query("Patch")(item, data)<Requests[`Patch${K}`][1]>()
  }

  public async delete<K extends Action<"Delete">>(item: K, data: Requests[`Delete${K}`][0]) {
    return this._query("Delete")(item, data)<Requests[`Delete${K}`][1]>()
  }
}
