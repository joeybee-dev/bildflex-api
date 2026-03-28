<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <h2 class="fw-bold mb-2">Reset Password</h2>
                <p class="text-muted mb-0">
                  Enter your new password below.
                </p>
              </div>

              <form @submit.prevent="submitResetPassword">
                <div class="mb-3">
                  <label for="password" class="form-label">New Password</label>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label for="confirmPassword" class="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    {{ loading ? "Resetting..." : "Reset Password" }}
                  </button>
                </div>
              </form>

              <p class="text-center text-muted mt-4 mb-0">
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
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);

const form = reactive({
  password: "",
  confirmPassword: ""
});

const submitResetPassword = async () => {
  try {
    loading.value = true;

    const token = route.params.token;

    const response = await api.post(`/users/reset-password/${token}`, {
      password: form.password,
      confirmPassword: form.confirmPassword
    });

    notyf.success(response.data?.message || "Password reset successful.");
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