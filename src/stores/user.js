import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    id: localStorage.getItem("userId") || null,
    isAdmin: localStorage.getItem("isAdmin") === "true",
    userType: localStorage.getItem("userType") || null
  });

  const bootstrapped = ref(false);

  const isLoggedIn = computed(() => !!user.value.id);

  function setUser(userData) {
    user.value = {
      id: userData.id || null,
      isAdmin: userData.isAdmin ?? false,
      userType: userData.userType || null
    };

    if (user.value.id) {
      localStorage.setItem("userId", user.value.id);
    } else {
      localStorage.removeItem("userId");
    }

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
      isAdmin: false,
      userType: null
    };

    localStorage.removeItem("token");
    localStorage.removeItem("professionalToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userType");
  }

  async function bootstrapAuth() {
    bootstrapped.value = false;

    const token = localStorage.getItem("token");
    const professionalToken = localStorage.getItem("professionalToken");
    const userType = localStorage.getItem("userType");

    try {
      if (userType === "professional" && professionalToken) {
        const response = await api.get("/professionals/my/profile");

        if (response.data?.profile?._id) {
          setUser({
            id: response.data.profile._id,
            isAdmin: false,
            userType: "professional"
          });
        } else {
          unsetUser();
        }
      } else if (userType === "user" && token) {
        const response = await api.get("/users/details-user");

        if (response.data?.user?._id) {
          setUser({
            id: response.data.user._id,
            isAdmin: response.data.user.isAdmin ?? false,
            userType: "user"
          });
        } else {
          unsetUser();
        }
      } else {
        user.value = {
          id: null,
          isAdmin: false,
          userType: null
        };

        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userType");
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      unsetUser();
    } finally {
      bootstrapped.value = true;
    }
  }

  return {
    user,
    bootstrapped,
    isLoggedIn,
    setUser,
    unsetUser,
    bootstrapAuth
  };
});