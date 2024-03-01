import routes, { Action, RouteData, UnknownRouteData } from "../utils/routes"
import IApiClient from "./IApiClient"

export default class ApiClient implements IApiClient {
  private _query<A extends string>(method: A) {
    return <K extends Action<A>>(item: K, { route, query, body, headers }: UnknownRouteData) => {
      const endpoint = Object.keys(route ?? {}).reduce(
        (endpoint, key) => endpoint.replace(`{${key}}`, route![key]),
        routes[`${method}${item}` as keyof RouteData]
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

  public async get<K extends Action<"Get">>(item: K, data: RouteData[`Get${K}`][0]) {
    return this._query("Get")(item, data)<RouteData[`Get${K}`][1]>()
  }

  public async post<K extends Action<"Post">>(item: K, data: RouteData[`Post${K}`][0]) {
    return this._query("Post")(item, data)<RouteData[`Post${K}`][1]>()
  }

  public async put<K extends Action<"Put">>(item: K, data: RouteData[`Put${K}`][0]) {
    return this._query("Put")(item, data)<RouteData[`Put${K}`][1]>()
  }

  public async patch<K extends Action<"Patch">>(item: K, data: RouteData[`Patch${K}`][0]) {
    return this._query("Patch")(item, data)<RouteData[`Patch${K}`][1]>()
  }

  public async delete<K extends Action<"Delete">>(item: K, data: RouteData[`Delete${K}`][0]) {
    return this._query("Delete")(item, data)<RouteData[`Delete${K}`][1]>()
  }
}
