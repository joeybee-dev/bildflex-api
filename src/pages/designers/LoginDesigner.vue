<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Login Designer</h2>
              <p class="auth-subtitle mb-0">Access your designer account securely.</p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="loginDesigner">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input v-model.trim="form.email" type="email" class="form-control" required />
                </div>

                <div class="mb-2">
                  <label class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control" required />
                </div>

                <div class="text-end mb-4">
                  <router-link to="/designer/forgot-password" class="auth-link">
                    Forgot Password?
                  </router-link>
                </div>

                <div class="d-grid">
                  <button type="submit" class="btn login-btn" :disabled="loading">
                    {{ loading ? "Logging in..." : "Login" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
                No account yet?
                <router-link to="/designer/register" class="auth-link">Register here</router-link>
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
import { useUserStore } from "@/stores/user";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const router = useRouter();
const userStore = useUserStore();
const notyf = new Notyf();
const loading = ref(false);

const form = reactive({
  email: "",
  password: ""
});

const loginDesigner = async () => {
  try {
    loading.value = true;
    const response = await api.post("/designers/login", form);

    const token = response.data?.access;
    const designer = response.data?.designer;

    if (!token) throw new Error("No access token returned.");

    localStorage.setItem("designerToken", token);
    localStorage.setItem("userType", "designer");

    if (designer) {
      userStore.setUser({
        ...designer,
        userType: "designer",
        isAdmin: false
      });
    }

    notyf.success("Logged in successfully.");
    router.push("/designer/profile");
  } catch (err) {
    notyf.error(err.response?.data?.error || err.message || "Failed to login designer.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; display: flex; align-items: center; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; letter-spacing: .3px; }
.auth-subtitle { color: #003e86; font-size: .95rem; }
.form-label { color: #003e86; font-weight: 700; margin-bottom: .45rem; }
.form-control { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); color: #003e86; background: #fff; }
.form-control:focus { border-color: #ffc107; box-shadow: 0 0 0 .2rem rgba(255,193,7,.18); }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; transition: all .25s ease; }
.login-btn:hover:not(:disabled) { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.auth-link { color: #003e86; text-decoration: none; font-weight: 700; }
.auth-link:hover { color: #ffc107; }
.auth-footer-text { color: #6c757d; }
</style>