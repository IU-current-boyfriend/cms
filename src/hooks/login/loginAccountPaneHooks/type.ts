export interface IAccountPaneData {
  name: string;
  password: string;
}

export type TSetAccountPaneDataCallback = (
  accountPaneData: IAccountPaneData
) => void;
