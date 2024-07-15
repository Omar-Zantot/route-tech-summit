export type allCustomer = ICustomer[];

export interface ICustomer {
  id: string;
  name: string;
}

export interface IChartData extends ICustomer {
  date: string;
  amount: number;
}
