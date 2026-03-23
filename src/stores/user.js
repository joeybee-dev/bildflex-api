import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    id: localStorage.getItem("userId") || null,
    isAdmin: localStorage.getItem("isAdmin") === "true",
    userType: localStorage.getItem("userType") || null
  });

  function setUser(userData) {
    user.value.id = userData.id;
    user.value.isAdmin = userData.isAdmin ?? false;
    user.value.userType = userData.userType || "user";

    localStorage.setItem("userId", user.value.id);
    localStorage.setItem("isAdmin", user.value.isAdmin);
    localStorage.setItem("userType", user.value.userType);
  }

  function unsetUser() {
    user.value.id = null;
    user.value.isAdmin = false;
    user.value.userType = null;

    localStorage.removeItem("token");
    localStorage.removeItem("professionalToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userType");
  }

  return { user, setUser, unsetUser };
});