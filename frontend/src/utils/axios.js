import axios from "axios";
import { useAuthStore } from "../store/useAuth";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

//Interceptors

let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { user, refreshToken, signout } = useAuthStore.getState();
    if (error.response?.status === 401 && !originalRequest._retry && user) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
        } else {
          refreshPromise = refreshToken();
          await refreshPromise;
          refreshPromise = null;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        signout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
