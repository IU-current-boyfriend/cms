import { loginRequest } from "@/service";
import type {
  ILoginActionParams,
  ILoginActionResponseData,
  ILoginUserInfoResponseData,
  ILoginUserMenuResponseData
} from "./type";

// 用户登录的接口
export const loginActionApi = (params: ILoginActionParams) => {
  return loginRequest.request<ILoginActionResponseData>({
    url: "/login",
    mock: false,
    method: "POST",
    data: params
  });
};

// 登录时获取用户个人信息的接口,注意get请求的方式
export const getLoginUserInfoApi = (id: number) => {
  return loginRequest.request<ILoginUserInfoResponseData>({
    url: `/users/${id}`,
    mock: false,
    method: "GET"
  });
};

// 根据角色id查询菜单栏的接口
export const getMenuByRoleIdApi = (roleId: number) => {
  return loginRequest.request<ILoginUserMenuResponseData>({
    url: `/role/${roleId}/menu`,
    mock: false,
    method: "GET"
  });
};
