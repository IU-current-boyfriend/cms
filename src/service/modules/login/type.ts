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
  id: number;
  name: string;
  token: string;
}

export interface ILoginActionRememberStatus {
  rememberStatus: boolean;
}
