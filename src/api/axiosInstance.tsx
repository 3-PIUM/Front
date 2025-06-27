import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    const lang = localStorage.getItem("language");

    config.params = config.params || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (lang === "한국어") {
      config.params.lang = "kr";
    } else if (lang === "English") {
      config.params.lang = "en";
    } else if (lang === "日本語") {
      config.params.lang = "jp";
    } else {
      config.params.lang = "kr";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
