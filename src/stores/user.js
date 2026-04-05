import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";

export const useUserStore = defineStore("user", () => { 
  const user = ref({
    id: localStorage.getItem("userId") || null,
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    email: localStorage.getItem("email") || "",
    isAdmin: localStorage.getItem("isAdmin") === "true",
    userType: localStorage.getItem("userType") || null
  });

  const bootstrapped = ref(false);
  const loading = ref(false);

  const isLoggedIn = computed(() => !!user.value.id);
  const fullName = computed(() =>
    `${user.value.firstName || ""} ${user.value.lastName || ""}`.trim()
  );

  function setUser(userData = {}) {
    user.value = {
      id: userData._id || userData.id || null,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      isAdmin:
        userData.isAdmin === true ||
          userData.userType === "admin",
      userType: 
      userData.userType || (userData.isAdmin === true ? "admin" : "user")
    };

    if (user.value.id) {
      localStorage.setItem("userId", user.value.id);
    } else {
      localStorage.removeItem("userId");
    }

    localStorage.setItem("firstName", user.value.firstName || "");
    localStorage.setItem("lastName", user.value.lastName || "");
    localStorage.setItem("email", user.value.email || "");
    localStorage.setItem("isAdmin", String(user.value.isAdmin));

    if (user.value.userType) {
      localStorage.setItem("userType", user.value.userType);
    } else {
      localStorage.removeItem("userType");
    }
  }

  function unsetUser() {
    user.value = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      isAdmin: false,
      userType: null
    };

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
  }

  async function bootstrapAuth() {
    bootstrapped.value = false;
    loading.value = true;

    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    const designerToken = localStorage.getItem("designerToken");
    const handymanToken = localStorage.getItem("handymanToken");
    const contractorToken = localStorage.getItem("contractorToken");
    const supplierToken = localStorage.getItem("supplierToken");

    try {
      if (userType === "designer" && designerToken) {
        const response = await api.get("/designers/details");
        if (response.data?.designer?._id) {
          setUser({
            ...response.data.designer,
            userType: "designer",
            isAdmin: false
          });
        } else {
          unsetUser();
        }
      } else if (userType === "handyman" && handymanToken) {
        const response = await api.get("/handymen/details");
        if (response.data?.handyman?._id) {
          setUser({
            ...response.data.handyman,
            userType: "handyman",
            isAdmin: false
          });
        } else {
          unsetUser();
        }
      } else if (userType === "contractor" && contractorToken) {
        const response = await api.get("/contractors/details");
        if (response.data?.contractor?._id) {
          setUser({
            ...response.data.contractor,
            userType: "contractor",
            isAdmin: false
          });
        } else {
          unsetUser();
        }
      } else if (userType === "supplier" && supplierToken) {
        const response = await api.get("/suppliers/details");
        if (response.data?.supplier?._id) {
          setUser({
            ...response.data.supplier,
            userType: "supplier",
            isAdmin: false
          });
        } else {
          unsetUser();
        }
      } else if ((userType === "user" || userType === "admin" || !userType) && token) {
        const response = await api.get("/users/details");
        if (response.data?.user?._id) {
          setUser({
            ...response.data.user,
            userType:
              response.data.user.userType ||
              (response.data.user.isAdmin === true ? "admin" : "user"),
            isAdmin:
              response.data.user.isAdmin === true ||
              response.data.user.userType === "admin"
          });
        } else {
          unsetUser();
        }
      } else {
        unsetUser();
      }
    } catch (error) {
      console.error("Bootstrap auth failed:", error);
      unsetUser();
    } finally {
      bootstrapped.value = true;
      loading.value = false;
    }
  }

  function logout() {
    unsetUser();
  }

  return {
    user,
    bootstrapped,
    loading,
    isLoggedIn,
    fullName,
    setUser,
    unsetUser,
    bootstrapAuth,
    logout
  };
});