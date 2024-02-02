export interface ILoginActionParams {
  name: string;
  password: string;
  rememeberStatus?: boolean;
}

export interface ILoginActionResponseData {
  code: number;
  data: ILoginActionResponseInternalData;
}

export interface ILoginActionResponseInternalData {
  id?: number;
  name?: string;
  token?: string;
  userInfo?: ILoginUserInfoResponse;
  userMenu?: any[];
}

export interface ILoginActionRememberStatus {
  rememberStatus: boolean;
}

export interface ILoginUserInfoResponse {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt: string;
  updateAt: string;
  role: {
    id: number;
    name: string;
    intro: string;
    createAt: string;
    updateAt: string;
  };
  department: {
    id: number;
    name: string;
    parentId: any;
    createAt: string;
    updateAt: string;
    leader: string;
  };
}
export interface ILoginUserInfoResponseData {
  data?: ILoginUserInfoResponse;
}

export interface ILoginUserMenuResponseDataElement {
  icon: string;
  id: number;
  name: string;
  sort: number;
  type: number;
  url: string;
  parentId?: number;
  children?: ILoginUserMenuResponseDataElement[] | null;
}
export interface ILoginUserMenuResponseData {
  data: ILoginUserMenuResponseDataElement[];
}
