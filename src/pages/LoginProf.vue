<template>
  <div class="auth-page d-flex align-items-center justify-content-center">
    <div class="auth-card card border-0 shadow-lg">
      <div class="card-body p-4 p-md-5">
        <h1 class="text-center mb-4">Professional Login</h1>

        <form @submit.prevent="loginProfessional">
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

          <button
            :disabled="!isActive || loading"
            type="submit"
            class="btn w-100"
            :class="isActive ? 'btn-primary' : 'btn-secondary'"
          >
            {{ loading ? "Logging in..." : "Login as Professional" }}
          </button>

          <p class="text-center mt-4 mb-0">
            Don’t have an account yet?
            <router-link to="/register-professional">Register here</router-link>
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

const email = ref("");
const password = ref("");
const loading = ref(false);

const isActive = computed(() => {
  return email.value.trim() !== "" && password.value.trim() !== "";
});

function loginProfessional() {
  loading.value = true;

  axios.post("http://localhost:4000/professionals/login", {
    email: email.value,
    password: password.value
  })
  .then(response => {
    if (response.data.access) {
      localStorage.removeItem("token");
      localStorage.setItem("professionalToken", response.data.access);
      localStorage.setItem("userType", "professional");

      retrieveProfessionalDetails(response.data.access);

      email.value = "";
      password.value = "";

      notyf.success("Professional login successful");
    } else {
      loading.value = false;
      notyf.error("Login failed. No access token returned.");
    }
  })
  .catch(error => {
    console.error(error);
    loading.value = false;
    notyf.error(
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Professional login failed."
    );
  });
}

function retrieveProfessionalDetails(token) {
  axios.get("http://localhost:4000/professionals/my/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    const profile = response.data.profile;

    userStore.setUser({
      id: profile._id,
      isAdmin: false,
      userType: "professional"
    });

    router.push("/professionals");
  })
  .catch(error => {
    console.error("Failed to retrieve professional details:", error);
    notyf.error("Could not fetch professional profile.");
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
  max-width: 430px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(6px);
  transform: translateY(-10px);
}

h1 {
  font-weight: 700;
  color: #212529;
}

.form-control {
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