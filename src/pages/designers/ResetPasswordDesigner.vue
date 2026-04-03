<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Forgot Password</h2>
              <p class="auth-subtitle mb-0">
                Enter your designer email and we will send a reset link.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="submitForgotPassword">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input v-model.trim="form.email" type="email" class="form-control" required />
                </div>

                <div class="d-grid">
                  <button type="submit" class="btn login-btn" :disabled="loading">
                    {{ loading ? "Sending..." : "Send Reset Link" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
                Back to
                <router-link to="/designer/login" class="auth-link">Login</router-link>
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
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);
const form = reactive({ email: "" });

const submitForgotPassword = async () => {
  try {
    loading.value = true;
    const response = await api.post("/designers/forgot-password", form);
    notyf.success(response.data?.message || "Reset link sent successfully.");
    form.email = "";
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to send reset link.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; display: flex; align-items: center; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; }
.auth-subtitle { color: #003e86; }
.form-label { color: #003e86; font-weight: 700; margin-bottom: .45rem; }
.form-control { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); }
.form-control:focus { border-color: #ffc107; box-shadow: 0 0 0 .2rem rgba(255,193,7,.18); }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.auth-link { color: #003e86; text-decoration: none; font-weight: 700; }
.auth-footer-text { color: #6c757d; }
</style>