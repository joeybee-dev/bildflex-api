// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/main.css";
import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { useGlobalStore } from "./stores/global";

import App from "./App.vue";

// PAGES
import Home from "./pages/Home.vue";
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import Logout from "./pages/Logout.vue";
import ActiveProducts from "./pages/ActiveProducts.vue";
import AdminDashboard from "./pages/AdminDashboard.vue";
import Cart from "./pages/Cart.vue";
import Checkout from "./pages/Checkout.vue";
import UserOrders from "./pages/UserOrders.vue";
import MyOrders from "./pages/MyOrders.vue";

// COMPONENTS
import ProductDetails from "./components/ProductDetails.vue";
import CreateProduct from "./components/CreateProduct.vue";
import EditProduct from "./components/EditProduct.vue";

const notyf = new Notyf();
const pinia = createPinia();

// --- ROUTES ---
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/register", name: "Register", component: Register },
  { path: "/login", name: "Login", component: Login },
  { path: "/logout", name: "Logout", component: Logout },

  { path: "/active-products", name: "ActiveProducts", component: ActiveProducts },
  { path: "/product/:id", name: "ProductDetails", component: ProductDetails },

  // ✅ require login for cart/checkout/my-orders
  { path: "/cart", name: "Cart", component: Cart, meta: { requiresAuth: true } },
  { path: "/checkout", name: "Checkout", component: Checkout, meta: { requiresAuth: true } },
  { path: "/my-orders", name: "MyOrders", component: MyOrders, meta: { requiresAuth: true } },

  {
    path: "/create-product",
    name: "CreateProduct",
    component: CreateProduct,
    meta: { requiresAdmin: true },
  },
  {
    path: "/edit-product/:id",
    name: "EditProduct",
    component: EditProduct,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAdmin: true },
  },

  // ✅ protect admin orders too
  {
    path: "/admin/orders",
    name: "UserOrders",
    component: UserOrders,
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let authBootstrapped = false;

// --- GLOBAL NAV GUARD ---
router.beforeEach(async (to, from, next) => {
  const store = useGlobalStore(pinia);

  // ✅ Bootstrap auth once (rehydrate user after refresh)
  if (!authBootstrapped) {
    authBootstrapped = true;

    // If your store has initAuth(), use it; otherwise you can remove this try block.
    if (typeof store.initAuth === "function") {
      try {
        await store.initAuth();
      } catch (e) {
        console.error("initAuth error:", e);
      }
    }

    if (store.user.token && store.user.isAdmin === null) {
      try {
        await store.setUser(store.user.token);
      } catch (e) {
        console.error("setUser bootstrap error:", e);
      }
    }
  }

  // ✅ requiresAuth protection (with redirect)
  if (to.meta.requiresAuth) {
    if (!store.user.token) {
      notyf.error("Please login first.");
      return next({ name: "Login", query: { redirect: to.fullPath } });
    }
  }

  // ✅ requiresAdmin protection (with redirect)
  if (to.meta.requiresAdmin) {
    if (!store.user.token) {
      notyf.error("Please login first.");
      return next({ name: "Login", query: { redirect: to.fullPath } });
    }
    if (!store.user.isAdmin) {
      notyf.error("Access denied. Admins only.");
      return next({ name: "Home" });
    }
  }

  return next();
});

// --- APP INIT ---
createApp(App).use(pinia).use(router).mount("#app");