import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const userType = localStorage.getItem("userType");

    const token =
      userType === "professional"
        ? localStorage.getItem("professionalToken")
        : localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isLoginRequest =
      requestUrl.includes("/login-user") ||
      requestUrl.includes("/login-prof");

    if ((status === 401 || status === 403) && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("professionalToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("userType");
    }

    return Promise.reject(error);
  }
);

export default api;