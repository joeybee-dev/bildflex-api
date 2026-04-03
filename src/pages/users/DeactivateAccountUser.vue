<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Deactivate Account</h2>
              <p class="auth-subtitle mb-0">
                This action will deactivate your user account.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <div class="alert alert-warning rounded-4">
                Are you sure you want to deactivate your account? You may need admin or support help to restore access later.
              </div>

              <form @submit.prevent="deactivateAccount">
                <div class="mb-3">
                  <label class="form-label">Enter Your Password</label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div class="d-grid gap-2 mt-4">
                  <button type="submit" class="btn btn-danger deactivate-btn" :disabled="loading">
                    {{ loading ? "Deactivating..." : "Deactivate Account" }}
                  </button>
                  <router-link to="/profile" class="btn btn-outline-secondary custom-outline-btn">
                    Cancel
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);
const password = ref("");

const deactivateAccount = async () => {
  try {
    loading.value = true;

    const response = await api.delete("/users/deactivate-account", {
      data: { password: password.value }
    });

    localStorage.removeItem("token");
    localStorage.removeItem("userType");

    notyf.success(response.data?.message || "Account deactivated successfully.");
    router.push("/");
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.error || "Failed to deactivate account.");
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
  border-bottom: 3px solid #ffc107;
  padding: 2rem 1.5rem 1.75rem;
}

.auth-title {
  color: #003e86;
  font-weight: 800;
}

.auth-subtitle,
.form-label {
  color: #003e86;
}

.form-label {
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.form-control {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
}

.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}

.deactivate-btn,
.custom-outline-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
}
</style>