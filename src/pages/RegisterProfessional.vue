<template>
  <div class="auth-page d-flex align-items-center justify-content-center">
    <div class="auth-card card border-0 shadow-lg">
      <div class="card-body p-4 p-md-5">
        <h1 class="text-center mb-4">Professional Register</h1>

        <form @submit.prevent="registerProfessional">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <select id="title" v-model="title" class="form-select" required>
              <option disabled value="">Select title</option>
              <option>Engr.</option>
              <option>Arch.</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              class="form-control"
              placeholder="Enter first name"
              required
            />
          </div>

          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              class="form-control"
              placeholder="Enter last name"
              required
            />
          </div>

          <div class="mb-3">
            <label for="profession" class="form-label">Profession</label>
            <input
              id="profession"
              v-model="profession"
              type="text"
              class="form-control"
              placeholder="Enter profession"
              required
            />
          </div>

          <div class="mb-3">
            <label for="location" class="form-label">Location</label>
            <input
              id="location"
              v-model="location"
              type="text"
              class="form-control"
              placeholder="City, Province"
              required
            />
          </div>

          <div class="mb-3">
            <label for="country" class="form-label">Country</label>
            <input
              id="country"
              v-model="country"
              type="text"
              class="form-control"
              placeholder="Enter country"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="mobileNo" class="form-label">Mobile Number</label>
            <input
              id="mobileNo"
              v-model="mobileNo"
              type="text"
              class="form-control"
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="form-control"
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            :disabled="!isActive || loading"
            type="submit"
            class="btn w-100"
            :class="isActive ? 'btn-primary' : 'btn-secondary'"
          >
            {{ loading ? "Registering..." : "Register as Professional" }}
          </button>

          <p class="text-center mt-4 mb-0">
            Already have an account?
            <router-link to="/login-prof">Login here</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";
import { useUserStore } from "@/stores/user";

const notyf = new Notyf();
const router = useRouter();
const userStore = useUserStore();

const title = ref("");
const firstName = ref("");
const lastName = ref("");
const profession = ref("");
const location = ref("");
const country = ref("");
const email = ref("");
const mobileNo = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);

const isActive = computed(() => {
  return (
    title.value.trim() !== "" &&
    firstName.value.trim() !== "" &&
    lastName.value.trim() !== "" &&
    profession.value.trim() !== "" &&
    location.value.trim() !== "" &&
    country.value.trim() !== "" &&
    email.value.trim() !== "" &&
    mobileNo.value.trim() !== "" &&
    password.value.trim() !== "" &&
    confirmPassword.value.trim() !== ""
  );
});

function registerProfessional() {
  if (password.value !== confirmPassword.value) {
    notyf.error("Passwords do not match.");
    return;
  }

  loading.value = true;

  axios.post("http://localhost:4000/professionals/register", {
    title: title.value,
    firstName: firstName.value,
    lastName: lastName.value,
    profession: profession.value,
    location: location.value,
    country: country.value,
    email: email.value,
    mobileNo: mobileNo.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  })
  .then(response => {
    console.log(response.data);

    notyf.success("Professional registration successful");

    title.value = "";
    firstName.value = "";
    lastName.value = "";
    profession.value = "";
    location.value = "";
    country.value = "";
    email.value = "";
    mobileNo.value = "";
    password.value = "";
    confirmPassword.value = "";

    router.push("/login-prof");
  })
  .catch(error => {
    console.error(error);
    notyf.error(
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Professional registration failed."
    );
  })
  .finally(() => {
    loading.value = false;
  });
}

onMounted(() => {
  if (userStore.user.id) {
    router.push("/professionals");
  }
});
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1f1f1f, #2c2c2c, #3a3a3a);
  padding: 2rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 460px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(6px);
  transform: translateY(-10px);
}

h1 {
  font-weight: 700;
  color: #212529;
}

.form-control,
.form-select {
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
}

.btn {
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-weight: 600;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>