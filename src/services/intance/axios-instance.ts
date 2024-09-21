import axios from "axios";

const urlBase = import.meta.env.VITE_APP_API_BASE_URL;
const username = import.meta.env.VITE_APP_API_USERNAME;
const password = import.meta.env.VITE_APP_API_PASSWORD;

const createAxiosInstance = (includeAuth: boolean) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const authString = `${username}:${password}`;
    headers.Authorization = `Basic ${btoa(authString)}`;
  }

  return axios.create({
    baseURL: urlBase,
    headers: headers,
  });
};

export const axiosInstance = (includeAuth: boolean = true) =>
  createAxiosInstance(includeAuth);
