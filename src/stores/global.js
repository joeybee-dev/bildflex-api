import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import api from "../api";

export const useGlobalStore = defineStore("global", () => {
  /* =========================
     USER STATE
  ========================== */
  const user = reactive({
    token: localStorage.getItem("token"),
    email: null,
    isAdmin: null,
    firstName: null,
    lastName: null,
    mobileNo: null,
    _id: null,
  });

  const bootstrapped = ref(false);

    async function setUser(token) {
      // logout
      if (!token) {
        localStorage.removeItem("token");
        user.token = null;
        user.email = null;
        user.isAdmin = null;
        user.firstName = null;
        user.lastName = null;
        user.mobileNo = null;
        user._id = null;
        return;
      }

      // ✅ persist token
        localStorage.setItem("token", token);
        user.token = token;

        // ✅ load details immediately
        await fetchUserDetails();
      }

  async function fetchUserDetails() {
      if (!user.token) return;

      try {
        const res = await api.get("/users/details"); // returns { user: {...} }
        const u = res.data?.user;

        user._id = u?._id ?? null;
        user.email = u?.email ?? null;
        user.isAdmin = u?.isAdmin ?? false;
        user.firstName = u?.firstName ?? null;
        user.lastName = u?.lastName ?? null;
        user.mobileNo = u?.mobileNo ?? null;
      } catch (err) {
        // ✅ token invalid/expired -> clear
        await setUser(null);
      }
    }

    // ✅ run once on app startup so refresh keeps session
    async function bootstrapAuth() {
      if (bootstrapped.value) return;
      bootstrapped.value = true;

      const token = localStorage.getItem("token");
      if (!token) return;

      user.token = token;
      await fetchUserDetails();
    }

  async function setUser(token) {
    // Clear user
    if (!token) {
      localStorage.removeItem("token");
      user.token = null;
      user.email = null;
      user.isAdmin = null;
      user.firstName = null;
      user.lastName = null;
      return;
    }

    // Save token first so api.js interceptor can attach it
    localStorage.setItem("token", token);
    user.token = token;

    try {
      // api.js interceptor will now send Authorization: Bearer <token>
      const res = await api.get("/users/details");
      user.email = res.data?.user?.email ?? null;
      user.isAdmin = res.data?.user?.isAdmin ?? null;
      user.firstName = res.data?.user?.firstName ?? null;
      user.lastName = res.data?.user?.lastName ?? null;
    } catch (error) {
      console.error("Error fetching user details:", error);

      // If token is bad, clean up to prevent stuck state
      localStorage.removeItem("token");
      user.token = null;
      user.email = null;
      user.isAdmin = null;
      user.firstName = null;
      user.lastName = null;
    }
  }


  
  async function initAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      // ensure clean state
      await setUser(null);
      return;
    }
    // re-fetch /users/details to restore email/isAdmin after refresh
    await setUser(token);
  }



  /* =========================
     PRODUCT STATE
  ========================== */
  const activeProducts = ref([]);
  const loadingProducts = ref(false);

  async function fetchActiveProducts() {
    try {
      loadingProducts.value = true;
      const res = await api.get("/products/active");
      activeProducts.value = res.data;
    } catch (error) {
      console.error("Error fetching active products:", error);
    } finally {
      loadingProducts.value = false;
    }
  }

  return {
    user,
    setUser,
    fetchUserDetails,
    bootstrapAuth,
    bootstrapped,
    initAuth,
    activeProducts,
    loadingProducts,
    fetchActiveProducts,
  };
});