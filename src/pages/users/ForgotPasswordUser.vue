<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Forgot Password</h2>
              <p class="auth-subtitle mb-0">
                Enter your email to receive a reset link.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="submitForgotPassword">
                <div class="mb-4">
                  <label for="email" class="form-label">Email</label>
                  <input
                    id="email"
                    v-model.trim="email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn submit-btn"
                    :disabled="loading"
                  >
                    {{ loading ? "Submitting..." : "Send Reset Link" }}
                  </button>
                </div>
              </form>

              <div v-if="resetLink" class="reset-box mt-4">
                <div class="reset-title mb-2">Reset link generated:</div>
                <a :href="resetLink" class="reset-link text-break">
                  {{ resetLink }}
                </a>
              </div>

              <p class="text-center auth-footer-text mt-4 mb-0">
                Remember your password?
                <router-link to="/login-user" class="auth-link">
                  Login here
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
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);
const email = ref("");
const resetLink = ref("");

const submitForgotPassword = async () => {
  try {
    loading.value = true;
    resetLink.value = "";

    const response = await api.post("/users/forgot-password-user", {
      email: email.value
    });

    resetLink.value = response.data?.resetLink || "";
    notyf.success(
      response.data?.message || "If the email is registered, a reset link has been sent."
    );
  } catch (err) {
    console.error("Forgot password error:", err);
    notyf.error(err.response?.data?.error || "Failed to process request.");
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

.reset-box {
  background-color: #f4f6f8;
  border: 1px solid rgba(0, 62, 134, 0.12);
  border-left: 4px solid #ffc107;
  border-radius: 14px;
  padding: 1rem;
}

.reset-title {
  color: #003e86;
  font-weight: 700;
}

.reset-link {
  color: #003e86;
  text-decoration: none;
  font-weight: 600;
}

.reset-link:hover {
  color: #ffc107;
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