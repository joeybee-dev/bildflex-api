<template>
  <div class="auth-page py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-start">
              <h2 class="auth-title mb-1">Guest Login</h2>
              <p class="auth-subtitle mb-0">Welcome to Bildflex!</p>
            </div>

            <div class="card-body p-md-4">
              <form @submit.prevent="loginUser">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                    required
                    autocomplete="email"
                  />
                </div>

                <div class="mb-2">
                  <label for="password" class="form-label">Password</label>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Enter password"
                    required
                    autocomplete="current-password"
                  />
                </div>

                <div class="text-end mb-4">
                  <router-link to="/forgot-password" class="forgot-link">
                    Forgot Password?
                  </router-link>
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn login-btn"
                    :disabled="loading"
                  >
                    {{ loading ? "Logging in..." : "Login" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
                No account yet?
                <router-link to="/register" class="auth-link">
                  Register here
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/auth-shared.css";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
const notyf = new Notyf();
const loading = ref(false);

const form = reactive({
  email: "",
  password: ""
});

const loginUser = async () => {
  try {
    loading.value = true;

    const response = await api.post("/users/login", {
      email: form.email,
      password: form.password
    });

    const token = response.data?.access;
    const user = response.data?.user;

    if (!token) {
      throw new Error("No access token returned.");
    }

    localStorage.setItem("token", token);

    let loggedInUser = null;

    if (user) {
      loggedInUser = {
        id: user._id || null,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        userType: user.userType || (user.isAdmin === true ? "admin" : "user"),
        isAdmin: user.isAdmin === true || user.userType === "admin"
      };
    } else {
      const detailsResponse = await api.get("/users/details");
      const details = detailsResponse.data?.user;

      loggedInUser = {
        id: details?._id || null,
        firstName: details?.firstName || "",
        lastName: details?.lastName || "",
        email: details?.email || "",
        userType:
          details?.userType || (details?.isAdmin === true ? "admin" : "user"),
        isAdmin: details?.isAdmin === true || details?.userType === "admin"
      };
    }

    localStorage.setItem(
      "userType",
      loggedInUser.isAdmin ? "admin" : "user"
    );

    userStore.setUser(loggedInUser);

    notyf.success("Logged in successfully.");

    if (loggedInUser.isAdmin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  } catch (err) {
    console.error("Login user error:", err);
    notyf.error(
      err.response?.data?.error || err.message || "Failed to login user."
    );
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
</style>