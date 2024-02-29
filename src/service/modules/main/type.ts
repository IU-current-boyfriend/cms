export interface IQueryInfo {
  offset?: number;
  size?: number;
  name?: string;
  realname?: string;
  cellphone?: string | number;
  enable?: number;
  createAt?: string;
  updateAt?: string;
}

export interface IUserListResponseData {
  code: number;
  data: {
    totalCount: number;
    list: IUserInfo[];
  };
}

export interface IUserInfo {
  id?: number;
  name?: string;
  realname?: string;
  cellphone?: string | number;
  enable?: number;
  roldId?: number;
  createAt?: string;
  updateAt?: string;
}

export interface IDeparementQueryInfo {
  size: number;
  offset: number;
}

export interface IRoleQueryInfo extends IDeparementQueryInfo {}

export interface IDeparementResponseInfo {
  code: number;
  data: {
    totalCount: number;
    list: any[];
  };
}

export interface IRoleResponseInfo extends IDeparementResponseInfo {}
