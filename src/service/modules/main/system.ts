import { systemRequest } from "@/service";
import type {
  IQueryInfo,
  IUserListResponseData,
  IDeparementQueryInfo,
  IRoleQueryInfo
} from "./type";

/**
 * 获取用户列表数据
 */

export const getUserListDataApi = (queryInfo: IQueryInfo) => {
  return systemRequest.request<IUserListResponseData>({
    url: "/users/list",
    mock: false,
    method: "POST",
    data: queryInfo
  });
};

/**
 * 新建用户
 *
 */
export const newUserDataApi = (userInfo: any) => {
  return systemRequest.request({
    url: "/users",
    method: "POST",
    mock: false,
    data: userInfo
  });
};

/**
 * 编辑用户
 *
 */
export const editUserDataApi = (id: number, userInfo: any) => {
  return systemRequest.request({
    url: `/users/${id}`,
    method: "PATCH",
    mock: false,
    data: userInfo
  });
};

/**
 * 删除用户
 *
 */
export const deleteUserDataApi = (id: number) => {
  return systemRequest.request({
    url: `/users/${id}`,
    method: "DELETE",
    mock: false
  });
};

/**
 * 获取部门的信息
 *
 */
export const getDepartmentDataApi = (queryInfo: IDeparementQueryInfo) => {
  return systemRequest.request({
    url: "/department/list",
    mock: false,
    method: "POST",
    data: queryInfo
  });
};

/**
 * 获取角色的信息
 *
 */
export const getRoleDataApi = (queryInfo: IRoleQueryInfo) => {
  return systemRequest.request({
    url: "/role/list",
    mock: false,
    method: "POST",
    data: queryInfo
  });
};
