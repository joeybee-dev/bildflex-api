<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Reset Password</h2>
              <p class="auth-subtitle mb-0">
                Enter your new password to update your account access.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="submitResetPassword">
                <div class="mb-3">
                  <label for="password" class="form-label">New Password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn submit-btn"
                    :disabled="loading"
                  >
                    {{ loading ? "Updating..." : "Reset Password" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
                Back to
                <router-link to="/login-user" class="auth-link">
                  Login
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();
const notyf = new Notyf();

const loading = ref(false);
const password = ref("");
const confirmPassword = ref("");

const submitResetPassword = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      notyf.error("Passwords do not match.");
      return;
    }

    loading.value = true;

    const token = route.params.token || route.query.token;

    const response = await api.post(`/users/reset-password-user/${token}`, {
      password: password.value
    });

    notyf.success(response.data?.message || "Password reset successfully.");
    router.push("/login-user");
  } catch (err) {
    console.error("Reset password error:", err);
    notyf.error(err.response?.data?.error || "Failed to reset password.");
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

.submit-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
  transition: all 0.25s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.submit-btn:disabled {
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