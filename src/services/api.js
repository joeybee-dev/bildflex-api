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
  "/users/forgot-password",
  "/designers/forgot-password",
  "/handymen/forgot-password",
  "/contractors/forgot-password",
  "/suppliers/forgot-password",
  "/users/reset-password",
  "/designers/reset-password",
  "/handymen/reset-password",
  "/contractors/reset-password",
  "/suppliers/reset-password",
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

const RESET_PASSWORD_PAGES = [
  "/reset-password-user/",
  "/reset-password-designer/",
  "/reset-password-handyman/",
  "/reset-password-contractor/",
  "/reset-password-supplier/"
];

const clearAuthStorage = () => {
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
};

const getTokenByUserType = () => {
  const userType = localStorage.getItem("userType");

  switch (userType) {
    case "designer":
      return localStorage.getItem("designerToken");
    case "handyman":
      return localStorage.getItem("handymanToken");
    case "contractor":
      return localStorage.getItem("contractorToken");
    case "supplier":
      return localStorage.getItem("supplierToken");
    case "admin":
    case "user":
    default:
      return localStorage.getItem("token");
  }
};

const isAuthPage = (path) => {
  return (
    AUTH_PAGES.includes(path) ||
    RESET_PASSWORD_PAGES.some((prefix) => path.startsWith(prefix))
  );
};

const isAuthRequest = (url) => {
  return AUTH_ROUTES.some((route) => url.includes(route));
};

api.interceptors.request.use(
  (config) => {
    const token = getTokenByUserType();

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

    const authRequest = isAuthRequest(requestUrl);
    const authPage = isAuthPage(currentPath);

    if ((status === 401 || status === 403) && !authRequest && !authPage) {
      clearAuthStorage();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;