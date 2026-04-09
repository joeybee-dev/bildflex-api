<template>
  <div class="auth-page py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-start">
              <h2 class="auth-title mb-1">Register as Supplier</h2>
              <p class="auth-subtitle mb-0">
                Create your supplier account and showcase your products.
              </p>
            </div>

            <div class="card-body p-4 p-md-4">
              <form @submit.prevent="registerSupplier">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label class="form-label">Business Name</label>
                    <input
                      v-model.trim="form.businessName"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Category</label>
                    <input
                      v-model.trim="form.category"
                      type="text"
                      class="form-control"
                      placeholder="e.g. Electrical Supplies"
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Email</label>
                    <input
                      v-model.trim="form.email"
                      type="email"
                      class="form-control"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">City</label>
                    <input
                      v-model.trim="form.city"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">About Us</label>
                    <textarea
                      v-model.trim="form.aboutBusiness"
                      class="form-control textarea-control"
                    ></textarea>
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Password</label>
                    <input
                      v-model="form.password"
                      type="password"
                      class="form-control"
                      required
                      minlength="8"
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Confirm Password</label>
                    <input
                      v-model="form.confirmPassword"
                      type="password"
                      class="form-control"
                      required
                      minlength="8"
                    />
                  </div>
                </div>

                <div class="d-grid mt-4">
                  <button
                    type="submit"
                    class="btn login-btn"
                    :disabled="loading"
                  >
                    {{ loading ? "Registering..." : "Register Supplier" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
                Already have an account?
                <router-link to="/supplier/login" class="auth-link">
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
import "@/assets/auth-shared.css";
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
  category: "",
  city: "",
  aboutBusiness: "",
  password: "",
  confirmPassword: ""
});

const registerSupplier = async () => {
  if (form.password !== form.confirmPassword) {
    notyf.error("Passwords do not match.");
    return;
  }

  try {
    loading.value = true;
    const payload = { ...form };
    delete payload.confirmPassword;

    const response = await api.post("/suppliers/register", payload);
    notyf.success(response.data?.message || "Supplier registered successfully.");
    router.push("/supplier/login");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to register supplier.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
</style>