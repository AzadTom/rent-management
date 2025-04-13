import { IAllUsers, IUserResponse } from "@/types/types";
import axios from "axios";

const APIURL =
  "https://script.google.com/macros/s/AKfycbyv1CzG3V0oxzRvYja1DnygXHlgfn6EnrF6MSheQGSUHbEzzOoHpqnORkPR3ef76QvQ/exec";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(APIURL);
    return response.data as IAllUsers;
  } catch (err) {
    console.log(err);
  }
};

export const getAllDataByUser = async (username: string) => {
  try {
    const response = await axios.get(`${APIURL}?allDataByUser=${username}`);
    return response.data as IUserResponse;
  } catch (err) {
    console.log(err);
  }
};

type RentData = {
  serial?: number;
  payment?: number;
  rent?: number;
  waterbill?: number;
  previous_month_bijli_unit?: number;
  current_month_bijli_unit?: number;
  bijli_unit?: number;
  bijli_unit_price?: number;
  due?: number;
  month?: string;
  year?: number;
};

export const sendToGoogleSheet = async (sheetName: string, data: RentData) => {
  const payload = {
    sheetName,
    data,
  };

  try {
    const response = await fetch(APIURL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

type DeleteRow={

  serial:number;
  delete:boolean;
}


export const deleteFromGoogleSheet = async (sheetName: string, data:DeleteRow) => {
  const payload = {
    sheetName,
    data,
  };

  try {
    const response = await fetch(APIURL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};