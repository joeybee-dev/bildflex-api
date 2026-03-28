<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <h2 class="fw-bold mb-2">Forgot Password</h2>
                <p class="text-muted mb-0">
                  Enter your email to receive a reset link.
                </p>
              </div>

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
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    {{ loading ? "Submitting..." : "Send Reset Link" }}
                  </button>
                </div>
              </form>

              <div v-if="resetLink" class="alert alert-success mt-4 mb-0">
                <div class="fw-semibold mb-2">Reset link generated:</div>
                <a :href="resetLink" class="text-break">{{ resetLink }}</a>
              </div>

              <p class="text-center text-muted mt-4 mb-0">
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

    const response = await api.post("/users/forgot-password", {
      email: email.value
    });

    resetLink.value = response.data?.resetLink || "";
    notyf.success(response.data?.message || "Reset link generated.");
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

.auth-link {
  text-decoration: none;
  font-weight: 600;
}
</style>