import axios from "axios";

const urlBase = import.meta.env.VITE_APP_API_BASE_URL;
const username = import.meta.env.VITE_APP_API_USERNAME;
const password = import.meta.env.VITE_APP_API_PASSWORD;

const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

export const axiosInstance = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
    Authorization: basicAuth,
  },
});
