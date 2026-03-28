<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <h2 class="fw-bold mb-2">Login User</h2>
                <p class="text-muted mb-0">Access your account securely.</p>
              </div>

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
                  <router-link to="/forgot-password-user" class="forgot-link">
                    Forgot Password?
                  </router-link>
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    {{ loading ? "Logging in..." : "Login" }}
                  </button>
                </div>
              </form>

              <p class="text-center text-muted mt-4 mb-0">
                No account yet?
                <router-link to="/register-user" class="auth-link">
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

    const response = await api.post("/users/login-user", {
      email: form.email,
      password: form.password
    });

    const token = response.data?.access;

    if (!token) {
      throw new Error("No access token returned.");
    }

    localStorage.setItem("token", token);
    localStorage.removeItem("professionalToken");
    localStorage.setItem("userType", "user");

    try {
      const detailsResponse = await api.get("/users/details-user");
      const user = detailsResponse.data?.user;

      userStore.setUser({
        id: user?._id || null,
        isAdmin: user?.isAdmin ?? false,
        userType: "user"
      });
    } catch (detailsError) {
      console.error("Fetch details after login failed:", detailsError);
    }

    notyf.success(response.data?.message || "Logged in successfully.");
    router.push("/");
  } catch (err) {
    console.error("Login user error:", err);
    notyf.error(err.response?.data?.error || err.message || "Failed to login user.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.auth-card {
  border-radius: 20px;
}

.form-control {
  min-height: 46px;
  border-radius: 12px;
}

.btn {
  min-height: 48px;
  border-radius: 12px;
  font-weight: 600;
}

.auth-link,
.forgot-link {
  text-decoration: none;
  font-weight: 600;
}
</style>