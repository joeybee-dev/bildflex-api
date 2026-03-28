<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Create User Account</h2>
              <p class="auth-subtitle mb-0">
                Join bildflex and connect with trusted construction experts.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="registerUser">
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="form-control"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Gender</label>
                    <select v-model="form.gender" class="form-select" required>
                      <option disabled value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div class="col-12">
                    <label class="form-label">Email</label>
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">City</label>
                    <input
                      v-model="form.city"
                      type="text"
                      class="form-control"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Country</label>
                    <input
                      v-model="form.country"
                      type="text"
                      class="form-control"
                      placeholder="Enter country"
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Password</label>
                    <input
                      v-model="form.password"
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Confirm Password</label>
                    <input
                      v-model="confirmPassword"
                      type="password"
                      class="form-control"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>

                <div class="d-grid mt-4">
                  <button
                    type="submit"
                    class="btn register-btn"
                    :disabled="loading"
                  >
                    {{ loading ? "Creating account..." : "Register" }}
                  </button>
                </div>
              </form>

              <p class="text-center auth-footer-text mt-4 mb-0">
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
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
  padding: 2rem 1.5rem 1.75rem;
}

.auth-title {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.auth-subtitle {
  color: #f4f6f8;
  font-size: 0.95rem;
}

.form-label {
  color: #003e86;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.form-control,
.form-select {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
  color: #003e86;
  background-color: #ffffff;
}

.form-control:focus,
.form-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}

.form-control::placeholder {
  color: #9aa4b2;
}

.register-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
  transition: all 0.25s ease;
}

.register-btn:hover:not(:disabled) {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-link {
  color: #003e86;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.25s ease;
}

.auth-link:hover {
  color: #ffc107;
}

.auth-footer-text {
  color: #6c757d;
}

@media (max-width: 767.98px) {
  .auth-page {
    padding-top: 2rem;
    padding-bottom: 2rem;
    align-items: flex-start;
  }

  .auth-header {
    padding: 1.75rem 1rem 1.5rem;
  }

  .auth-title {
    font-size: 1.6rem;
  }
}
</style>