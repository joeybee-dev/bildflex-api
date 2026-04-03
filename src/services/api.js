import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const AUTH_ROUTES = [
  "/users/login",
  "/designers/login",
  "/handymen/login",
  "/contractors/login",
  "/suppliers/login",
  "/users/register",
  "/designers/register",
  "/handymen/register",
  "/contractors/register",
  "/suppliers/register",
  "/forgot-password",
  "/reset-password"
];

const AUTH_PAGES = [
  "/login-user",
  "/login-designer",
  "/login-handyman",
  "/login-contractor",
  "/login-supplier",
  "/register-user",
  "/register-designer",
  "/register-handyman",
  "/register-contractor",
  "/register-supplier",
  "/forgot-password-user",
  "/forgot-password-designer",
  "/forgot-password-handyman",
  "/forgot-password-contractor",
  "/forgot-password-supplier"
];

api.interceptors.request.use(
  (config) => {
    const userType = localStorage.getItem("userType");

    let token = null;

    switch (userType) {
      case "designer":
        token = localStorage.getItem("designerToken");
        break;
      case "handyman":
        token = localStorage.getItem("handymanToken");
        break;
      case "contractor":
        token = localStorage.getItem("contractorToken");
        break;
      case "supplier":
        token = localStorage.getItem("supplierToken");
        break;
      default:
        token = localStorage.getItem("token");
    }

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
    const currentPath = window.location.pathname;

    const isAuthRequest = AUTH_ROUTES.some((route) => requestUrl.includes(route));
    const isAuthPage =
      AUTH_PAGES.includes(currentPath) ||
      currentPath.startsWith("/reset-password-user/") ||
      currentPath.startsWith("/reset-password-designer/") ||
      currentPath.startsWith("/reset-password-handyman/") ||
      currentPath.startsWith("/reset-password-contractor/") ||
      currentPath.startsWith("/reset-password-supplier/");

    if ((status === 401 || status === 403) && !isAuthRequest && !isAuthPage) {
      localStorage.removeItem("token");
      localStorage.removeItem("designerToken");
      localStorage.removeItem("handymanToken");
      localStorage.removeItem("contractorToken");
      localStorage.removeItem("supplierToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("userType");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;