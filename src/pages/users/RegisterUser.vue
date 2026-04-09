<template>
  <div class="auth-page py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-start">
              <h2 class="auth-title mb-1">Register as Guest</h2>
              <p class="auth-subtitle mb-0">
                Create your account and start connecting with trusted construction experts.
              </p>
            </div>

            <div class="card-body p-4 p-md-4">
              <form @submit.prevent="registerUser">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label for="firstName" class="form-label">First Name</label>
                    <input
                      id="firstName"
                      v-model.trim="form.firstName"
                      type="text"
                      class="form-control"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label for="gender" class="form-label">Gender</label>
                    <select
                      id="gender"
                      v-model="form.gender"
                      class="form-select"
                      required
                    >
                      <option disabled value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>

                  <div class="col-12 col-md-6">
                    <label for="email" class="form-label">Email</label>
                    <input
                      id="email"
                      v-model.trim="form.email"
                      type="email"
                      class="form-control"
                      placeholder="Enter email"
                      required
                      autocomplete="email"
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label for="city" class="form-label">City</label>
                    <input
                      id="city"
                      v-model.trim="form.city"
                      type="text"
                      class="form-control"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label for="password" class="form-label">Password</label>
                    <input
                      id="password"
                      v-model="form.password"
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      required
                      minlength="8"
                      autocomplete="new-password"
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      v-model="form.confirmPassword"
                      type="password"
                      class="form-control"
                      placeholder="Confirm password"
                      required
                      minlength="8"
                      autocomplete="new-password"
                    />
                  </div>
                </div>

                <div class="d-grid mt-4">
                  <button
                    type="submit"
                    class="btn auth-btn"
                    :disabled="loading"
                  >
                    {{ loading ? "Registering..." : "Register" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
                Already have an account?
                <router-link to="/login" class="auth-link">
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
  firstName: "",
  lastName: "",
  gender: "",
  birthYear: "",
  email: "",
  mobileNumber: "",
  city: "",
  province: "",
  country: "Philippines",
  aboutMe: "",
  password: "",
  confirmPassword: ""
});

const registerUser = async () => {
  try {
    if (form.password !== form.confirmPassword) {
      notyf.error("Passwords do not match.");
      return;
    }

    loading.value = true;

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      birthYear: form.birthYear || undefined,
      email: form.email,
      mobileNumber: form.mobileNumber,
      city: form.city,
      province: form.province,
      country: form.country || "Philippines",
      aboutMe: form.aboutMe,
      password: form.password
    };

    const response = await api.post("/users/register", payload);

    notyf.success(response.data?.message || "User registered successfully.");
    router.push("/login");
  } catch (err) {
    console.error("Register user error:", err);
    notyf.error(
      err.response?.data?.error || err.message || "Failed to register user."
    );
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
</style>