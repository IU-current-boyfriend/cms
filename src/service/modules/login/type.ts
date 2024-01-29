export interface ILoginActionParams {
  name: string;
  password: string;
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
