import type { IUserInfo } from "@/service/modules/main/type";

export interface ISystemStoreState {
  userListData: IUserInfo[];
  usersTotalCount: number;
}

export interface IMainStoreState {
  entireDepartments: any[];
  entireRoles: any[];
}
