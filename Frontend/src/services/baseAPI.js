import axios from "axios";
import { setup, authorization } from "../inteceptor";

export const api = axios.create({
  baseURL: process.env.VUE_APP_PORTAL_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000, // request timeout
});
setup(api);
authorization(api);

export const apiFormData = axios.create({
  baseURL: process.env.VUE_APP_PORTAL_URL,
  withCredentials: false,
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
  },
  timeout: 10000, // request timeout
});
setup(apiFormData);
