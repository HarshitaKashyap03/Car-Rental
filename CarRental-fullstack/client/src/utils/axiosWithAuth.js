import axios from "axios";
import { getAuth } from "@clerk/clerk-react";

const axiosWithAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosWithAuth.interceptors.request.use(
  async (config) => {
    const { getToken } = getAuth();
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosWithAuth;