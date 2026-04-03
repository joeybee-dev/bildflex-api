<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Login Handyman</h2>
              <p class="auth-subtitle mb-0">
                Access your handyman account securely.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="loginHandyman">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                    autocomplete="email"
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
                    autocomplete="current-password"
                  />
                </div>

                <div class="d-flex justify-content-end mb-4">
                  <router-link to="/forgot-password-handyman" class="auth-link">
                    Forgot password?
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
                Don’t have an account?
                <router-link to="/register-handyman" class="auth-link">
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

const router = useRouter();
const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" }
});

const loading = ref(false);

const form = reactive({
  email: "",
  password: ""
});

const loginHandyman = async () => {
  try {
    loading.value = true;

    const response = await api.post("/handymen/login-handyman", {
      email: form.email,
      password: form.password
    });

    const token = response.data?.access;
    const handyman = response.data?.handyman;

    if (!token) {
      notyf.error("No access token received.");
      return;
    }

    localStorage.setItem("handymanToken", token);
    localStorage.setItem("userType", "handyman");

    if (handyman) {
      localStorage.setItem("handymanData", JSON.stringify(handyman));
    }

    notyf.success(response.data?.message || "Login successful.");
    router.push("/edit-handyman");
  } catch (error) {
    console.error("Login handyman error:", error);
    notyf.error(
      error.response?.data?.error || "Failed to login handyman."
    );
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-color: #f4f6f8;
  display: flex;
  align-items: center;
}

.auth-card {
  border-radius: 20px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.auth-header {
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
  padding: 2rem 1.5rem 1.75rem;
}

.auth-title {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.auth-subtitle {
  color: #f4f6f8;
  font-size: 0.95rem;
}

.form-label {
  color: #003e86;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.form-control {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
  color: #003e86;
  background-color: #ffffff;
}

.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}

.form-control::placeholder {
  color: #9aa4b2;
}

.login-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
  transition: all 0.25s ease;
}

.login-btn:hover:not(:disabled) {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-link {
  color: #003e86;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.25s ease;
}

.auth-link:hover {
  color: #ffc107;
}

.auth-footer-text {
  color: #6c757d;
}

@media (max-width: 767.98px) {
  .auth-page {
    padding-top: 2rem;
    padding-bottom: 2rem;
    align-items: flex-start;
  }

  .auth-header {
    padding: 1.75rem 1rem 1.5rem;
  }

  .auth-title {
    font-size: 1.6rem;
  }
}
</style>