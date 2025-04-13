export interface IAllUsers {
  data: IUser[];
}

export interface IUser {
  name: string;
  id: number;
}

export interface IUserResponse {
  data: IUserInfo[];
}

export interface IUserInfo {
  serial: number;
  payment: number;
  rent: number;
  waterbill: number;
  previous_month_bijli_unit: number;
  current_month_bijli_unit: number;
  bijli_unit: number;
  bijli_unit_price: number;
  due: number;
  month: string;
  year: number;
}
