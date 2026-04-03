<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Deactivate Account</h2>
              <p class="auth-subtitle mb-0">This will deactivate your supplier account.</p>
            </div>

            <div class="card-body p-4 p-md-5">
              <div class="alert alert-warning rounded-4">
                Are you sure you want to deactivate your supplier account?
              </div>

              <form @submit.prevent="deactivateAccount">
                <div class="mb-3">
                  <label class="form-label">Enter Your Password</label>
                  <input v-model="password" type="password" class="form-control" required />
                </div>

                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-danger custom-danger-btn" :disabled="loading">
                    {{ loading ? "Deactivating..." : "Deactivate Account" }}
                  </button>
                  <router-link to="/supplier/profile" class="btn btn-outline-secondary custom-outline-btn">Cancel</router-link>
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
import { useUserStore } from "@/stores/user";
import { Notyf } from "notyf";
import api from "@/services/api";

const router = useRouter();
const userStore = useUserStore();
const notyf = new Notyf();
const loading = ref(false);
const password = ref("");

const deactivateAccount = async () => {
  try {
    loading.value = true;
    const response = await api.delete("/suppliers/deactivate-account", {
      data: { password: password.value }
    });

    userStore.logout();
    notyf.success(response.data?.message || "Account deactivated successfully.");
    router.push("/supplier/login");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to deactivate supplier account.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; display: flex; align-items: center; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title,.form-label { color: #003e86; }
.auth-title { font-weight: 800; }
.auth-subtitle { color: #003e86; }
.form-label { font-weight: 700; margin-bottom: .45rem; }
.form-control { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); }
.custom-danger-btn,.custom-outline-btn { min-height: 50px; border-radius: 12px; font-weight: 700; }
</style>