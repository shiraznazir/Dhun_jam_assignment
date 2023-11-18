import axios from "axios";
import { LOGIN_URL, ADMIN_DETAILS_URL } from "./constants";

export const loginAPI = (data) => {
  const promise = axios.post(LOGIN_URL, data);

  return promise.then((response) => response.data);
};

export const adminDetails = (id) => {
  const promise = axios.get(ADMIN_DETAILS_URL + `${id}`);

  return promise.then((response) => response.data);
};

export const editAdminDetails = (id, data) => {
  const promise = axios.put(ADMIN_DETAILS_URL + `${id}`, data);

  return promise.then((response) => response.data);
};
