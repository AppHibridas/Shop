import axios from "axios";

const urlBase = import.meta.env.VITE_APP_API_BASE_URL;
const username = import.meta.env.VITE_APP_API_USERNAME;
const password = import.meta.env.VITE_APP_API_PASSWORD;


console.log("urlBase", urlBase);
console.log("username", username);
console.log("password", password);

const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
console.log("basicAuth", basicAuth);

export const axiosInstance = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Method": "*",
    "Access-Control-Request-Headers": "*",
    "Authorization": basicAuth,
  },
});

