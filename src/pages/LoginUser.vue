<template>
  <div class="auth-page d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <h2 class="fw-bold mb-2">User Login</h2>
                <p class="text-muted mb-0">Sign in to access your profile.</p>
              </div>

              <form @submit.prevent="loginUser">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div class="d-grid mt-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    {{ loading ? "Signing in..." : "Login" }}
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
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
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

    const response = await axios.post(
      "http://localhost:4000/users/login-user",
      {
        email: form.email,
        password: form.password
      }
    );

    const { access, user } = response.data;

    localStorage.setItem("token", access);
    localStorage.setItem("userType", user.userType || "user");

    if (userStore.setUser) {
      userStore.setUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        isAdmin: user.isAdmin,
        token: access
      });
    }

    notyf.success(response.data.message || "Login successful.");
    router.push("/my-userprofile");
  } catch (err) {
    console.error("Login user error:", err);
    notyf.error(err.response?.data?.error || "Failed to login.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1b1f24 0%, #111418 100%);
}

.auth-card {
  border-radius: 20px;
}

.form-control {
  min-height: 46px;
  border-radius: 12px;
}

.btn {
  min-height: 46px;
  border-radius: 12px;
  font-weight: 600;
}

.auth-link {
  text-decoration: none;
  font-weight: 600;
}
</style>