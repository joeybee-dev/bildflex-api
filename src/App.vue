<script setup>
import { onMounted, watch } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import api from "@/services/api";
import Navbar from "./components/Navbar.vue";

const userStore = useUserStore();

onMounted(async () => {
  const token = localStorage.getItem("token");
  const professionalToken = localStorage.getItem("professionalToken");
  const userType = localStorage.getItem("userType");

  try {
    if (userType === "professional" && professionalToken) {
      const response = await api.get("/professionals/my/profile");

      if (response.data.profile && response.data.profile._id) {
        userStore.setUser({
          id: response.data.profile._id,
          isAdmin: false,
          userType: "professional"
        });
      } else {
        userStore.unsetUser();
      }
    } else if (userType === "user" && token) {
      const response = await api.get("/users/details-user");

      if (response.data.user && response.data.user._id) {
        userStore.setUser({
          id: response.data.user._id,
          isAdmin: response.data.user.isAdmin,
          userType: "user"
        });
      } else {
        userStore.unsetUser();
      }
    } else {
      userStore.unsetUser();
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    userStore.unsetUser();
  }
});

watch(
  () => userStore.user,
  (newUser) => {
    console.log(newUser);
    console.log(localStorage);
  },
  { deep: true }
);
</script>

<template>
  <Navbar />
  <RouterView />
</template>