<script setup>
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import Navbar from "./components/Navbar.vue";

const userStore = useUserStore();

onBeforeMount(async () => {
  await userStore.bootstrapAuth();
});
</script>

<template>
  <Navbar />
  <RouterView v-if="userStore.bootstrapped" />
</template>