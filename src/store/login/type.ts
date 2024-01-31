import type {
  ILoginUserInfoResponseData,
  ILoginUserMenuResponseData
} from "@/service/modules/login/type";
export interface ILoginStoreState {
  token: string;
  rememberStatus?: boolean;
  userInfo: ILoginUserInfoResponseData;
  userMenu: ILoginUserMenuResponseData;
}
