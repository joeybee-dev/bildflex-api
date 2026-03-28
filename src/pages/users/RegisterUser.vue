re<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <h2 class="fw-bold mb-2">Create User Account</h2>
              </div>

              <form @submit.prevent="registerUser">
                <div class="mb-3">
                  <label class="form-label">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="form-control"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Gender</label>
                  <select v-model="form.gender" class="form-select" required>
                    <option disabled value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">City</label>
                  <input
                    v-model="form.city"
                    type="text"
                    class="form-control"
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Country</label>
                  <input
                    v-model="form.country"
                    type="text"
                    class="form-control"
                    placeholder="Enter country"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div class="mb-4">
                  <label class="form-label">Confirm Password</label>
                  <input
                    v-model="confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="Confirm password"
                    required
                  />
                </div>

                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    {{ loading ? "Creating account..." : "Register" }}
                  </button>
                </div>
              </form>

              <p class="text-center text-muted mt-4 mb-0">
                Already have an account?
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);
const confirmPassword = ref("");

const form = reactive({
  firstName: "",
  gender: "",
  email: "",
  city: "",
  country: "Philippines",
  password: ""
});

const registerUser = async () => {
  try {
    if (form.password !== confirmPassword.value) {
      notyf.error("Passwords do not match.");
      return;
    }

    loading.value = true;

    const payload = {
      firstName: form.firstName,
      gender: form.gender,
      email: form.email,
      city: form.city,
      country: form.country || "Philippines",
      password: form.password
    };

    const response = await api.post("/users/register-user", payload);

    notyf.success(response.data.message || "User registered successfully.");
    router.push("/login-user");
  } catch (err) {
    console.error("Register user error:", err);
    console.error("Register user response:", err.response?.data);
    notyf.error(err.response?.data?.error || "Failed to register user.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.auth-card {
  border-radius: 20px;
}

.form-control,
.form-select {
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