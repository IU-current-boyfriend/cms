export interface ISearchConfig {
  pageName: String;
  formItems: ISearchFormItems[];
}

export interface ISearchFormItems {
  type: string;
  span: number;
  label: string;
  prop?: string;
  initialValue?: string | number;
  separator?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}
