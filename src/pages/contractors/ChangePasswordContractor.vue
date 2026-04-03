<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Change Password</h2>
              <p class="auth-subtitle mb-0">Update your contractor password.</p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="changePassword">
                <div class="mb-3">
                  <label class="form-label">Current Password</label>
                  <input v-model="form.currentPassword" type="password" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">New Password</label>
                  <input v-model="form.newPassword" type="password" class="form-control" required minlength="8" />
                </div>

                <div class="mb-3">
                  <label class="form-label">Confirm New Password</label>
                  <input v-model="form.confirmPassword" type="password" class="form-control" required minlength="8" />
                </div>

                <div class="d-grid gap-2">
                  <button class="btn login-btn" type="submit" :disabled="loading">
                    {{ loading ? "Updating..." : "Change Password" }}
                  </button>
                  <router-link to="/contractor/profile" class="btn btn-outline-secondary custom-outline-btn">Cancel</router-link>
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);

const form = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
});

const changePassword = async () => {
  if (form.newPassword !== form.confirmPassword) {
    notyf.error("New password and confirmation do not match.");
    return;
  }

  try {
    loading.value = true;
    const response = await api.patch("/contractors/change-password", form);
    notyf.success(response.data?.message || "Password changed successfully.");
    router.push("/contractor/profile");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to change password.");
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
.form-control:focus { border-color: #ffc107; box-shadow: 0 0 0 .2rem rgba(255,193,7,.18); }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.custom-outline-btn { min-height: 50px; border-radius: 12px; font-weight: 700; }
</style>