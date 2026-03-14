<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm p-4">
          <h3 class="text-center mb-4">Login</h3>

          <form @submit.prevent="loginUser">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>

            <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
              {{ isLoading ? "Logging in..." : "Login" }}
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import api from "../api";
import { useGlobalStore } from "../stores/global";

const router = useRouter();
const store = useGlobalStore();
const notyf = new Notyf();

const email = ref("");
const password = ref("");
const isLoading = ref(false);

const loginUser = async () => {
  try {
    isLoading.value = true;

    // Backend: returns { access: token }
    const res = await api.post("/users/login", {
      email: email.value,
      password: password.value,
    });

    const token = res.data?.access;
    if (!token) throw new Error("No token returned by server.");

    // IMPORTANT: store.setUser() handles localStorage + /users/details
    await store.setUser(token);

    notyf.success("Login successful");

    // Redirect based on admin role
    const redirectPath =
      router.currentRoute.value.query.redirect ||
      (store.user.isAdmin ? "/admin" : "/active-products");

    router.push(redirectPath);
  } catch (error) {
    console.error("Login error:", error);

    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Login failed";

    notyf.error(msg);
  } finally {
    isLoading.value = false;
  }
};
</script>