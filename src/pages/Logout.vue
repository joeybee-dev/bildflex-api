<template>
  <div class="container mt-5 text-center" style="max-width: 500px;">
    <h1 class="my-4">Logging out...</h1>
    <p class="text-muted">You are being signed out.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const notyf = new Notyf();

onMounted(() => {
  // remove token from localStorage
  localStorage.removeItem('token');

  // reset user data in Pinia store
  userStore.setUser({
    id: null,
    isAdmin: false
  });

  notyf.success('Logged out successfully');

  // redirect to login page
  router.push('/');
});
</script>