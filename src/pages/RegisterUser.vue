<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card auth-card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <div class="text-center mb-4">
                <h2 class="fw-bold mb-2">Create User Account</h2>
                <p class="text-muted mb-0">
                  Register your account to connect with professionals.
                </p>
              </div>

              <form @submit.prevent="registerUser">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label class="form-label">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="form-control"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Last Name</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      class="form-control"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Gender</label>
                    <select v-model="form.gender" class="form-select" required>
                      <option disabled value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Birth Year</label>
                    <input
                      v-model.number="form.birthYear"
                      type="number"
                      class="form-control"
                      min="1900"
                      :max="currentYear"
                      placeholder="Enter birth year"
                    />
                  </div>

                  <div class="col-12 col-md-6">
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
                    <label class="form-label">Mobile Number</label>
                    <input
                      v-model="form.mobileNo"
                      type="text"
                      class="form-control"
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="form-label">City</label>
                    <input
                      v-model="form.city"
                      type="text"
                      class="form-control"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="form-label">Province</label>
                    <input
                      v-model="form.province"
                      type="text"
                      class="form-control"
                      placeholder="Enter province"
                    />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="form-label">Country</label>
                    <input
                      v-model="form.country"
                      type="text"
                      class="form-control"
                      placeholder="Enter country"
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Bio</label>
                    <textarea
                      v-model="form.bio"
                      rows="4"
                      class="form-control"
                      placeholder="Write a short bio"
                    ></textarea>
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Password</label>
                    <input
                      v-model="form.password"
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <div class="col-12 col-md-6">
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
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);
const confirmPassword = ref("");
const currentYear = new Date().getFullYear();

const form = reactive({
  firstName: "",
  lastName: "",
  gender: "",
  birthYear: null,
  email: "",
  mobileNo: "",
  city: "",
  province: "",
  country: "Philippines",
  bio: "",
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
      lastName: form.lastName,
      gender: form.gender,
      birthYear: form.birthYear,
      email: form.email,
      mobileNo: form.mobileNo,
      city: form.city,
      province: form.province,
      country: form.country || "Philippines",
      bio: form.bio,
      password: form.password
    };

    const response = await axios.post(
      "http://localhost:4000/users/register-user",
      payload
    );

    notyf.success(response.data.message || "User registered successfully.");
    router.push("/login-user");
  } catch (err) {
    console.error("Register user error:", err);
    notyf.error(err.response?.data?.error || "Failed to register user.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1b1f24 0%, #111418 100%);
}

.auth-card {
  border-radius: 20px;
}

.form-control,
.form-select {
  min-height: 46px;
  border-radius: 12px;
}

textarea.form-control {
  min-height: unset;
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