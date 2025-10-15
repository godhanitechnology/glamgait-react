import axios from "axios";
import { ApiURL, userInfo } from "../Variable";

const userData = userInfo();

const axiosInstance = axios.create({
  baseURL: `${ApiURL}`,
  headers: {
    Authorization: `Bearer ${userData?.auth_token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${userData?.auth_token}`;

    const multipartAPIs = [
      "/insertproduct",
      "/updateproduct",
      "/addcategory",
      "/updatecategory",
      "/adddynamicimages",
    ];
    if (multipartAPIs.some((api) => config.url.includes(api))) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data?.status === 403) {
      localStorage.removeItem("GlamGait");
      window.location.href("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
