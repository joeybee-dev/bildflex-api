<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Register Designer</h2>
              <p class="auth-subtitle mb-0">
                Create your designer account and showcase your design expertise.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="registerDesigner">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label class="form-label">Business Name</label>
                    <input v-model.trim="form.businessName" type="text" class="form-control" required />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Contact Person</label>
                    <input v-model.trim="form.contactPerson" type="text" class="form-control" required />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Email</label>
                    <input v-model.trim="form.email" type="email" class="form-control" required />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Mobile Number</label>
                    <input v-model.trim="form.mobileNumber" type="text" class="form-control" />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Specialization</label>
                    <input v-model.trim="form.specialization" type="text" class="form-control" placeholder="e.g. Interior Design" />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">City</label>
                    <input v-model.trim="form.city" type="text" class="form-control" />
                  </div>

                  <div class="col-12">
                    <label class="form-label">About Business</label>
                    <textarea v-model.trim="form.aboutBusiness" class="form-control textarea-control"></textarea>
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Password</label>
                    <input v-model="form.password" type="password" class="form-control" required minlength="8" />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Confirm Password</label>
                    <input v-model="form.confirmPassword" type="password" class="form-control" required minlength="8" />
                  </div>
                </div>

                <div class="d-grid mt-4">
                  <button type="submit" class="btn login-btn" :disabled="loading">
                    {{ loading ? "Registering..." : "Register Designer" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
                Already have an account?
                <router-link to="/designer/login" class="auth-link">Login here</router-link>
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
const notyf = new Notyf();
const loading = ref(false);

const form = reactive({
  businessName: "",
  contactPerson: "",
  email: "",
  mobileNumber: "",
  specialization: "",
  city: "",
  aboutBusiness: "",
  password: "",
  confirmPassword: ""
});

const registerDesigner = async () => {
  if (form.password !== form.confirmPassword) {
    notyf.error("Passwords do not match.");
    return;
  }

  try {
    loading.value = true;
    const payload = { ...form };
    delete payload.confirmPassword;

    const response = await api.post("/designers/register", payload);
    notyf.success(response.data?.message || "Designer registered successfully.");
    router.push("/designer/login");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to register designer.");
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
.textarea-control { min-height: 120px; padding-top: .85rem; }
.form-control:focus { border-color: #ffc107; box-shadow: 0 0 0 .2rem rgba(255,193,7,.18); }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; transition: all .25s ease; }
.login-btn:hover:not(:disabled) { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.auth-link { color: #003e86; text-decoration: none; font-weight: 700; }
.auth-link:hover { color: #ffc107; }
.auth-footer-text { color: #6c757d; }
</style>