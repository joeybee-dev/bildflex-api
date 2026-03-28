<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  userStore.unsetUser();
  router.replace("/login-user");
});
</script>

<template>
  <div class="container py-5 text-center">
    <p>Logging out...</p>
  </div>
</template>