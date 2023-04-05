import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_HOST } from "@env";

const axiosInstance = axios.create({
  baseURL: API_HOST,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = await SecureStore.getItemAsync("token");
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
