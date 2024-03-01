import { Action, RouteData } from "../utils/routes"

export default interface IApiClient {
  get<K extends Action<"Get">>(route: K, data: RouteData[`Get${K}`][0]): Promise<RouteData[`Get${K}`][1]>

  post<K extends Action<"Post">>(route: K, data: RouteData[`Post${K}`][0]): Promise<RouteData[`Post${K}`][1]>

  put<K extends Action<"Put">>(route: K, data: RouteData[`Put${K}`][0]): Promise<RouteData[`Put${K}`][1]>

  patch<K extends Action<"Patch">>(route: K, data: RouteData[`Patch${K}`][0]): Promise<RouteData[`Patch}${K}`][1]>

  delete<K extends Action<"Delete">>(route: K, data: RouteData[`Delete${K}`][0]): Promise<RouteData[`Delete${K}`][1]>
}
