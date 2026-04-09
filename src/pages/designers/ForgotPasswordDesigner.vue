<template>
  <AuthCardWrapper
    title="Forgot Password"
    subtitle="Enter your email address and we will send you a password reset link."
    textAlign="start"
  >
    <form @submit.prevent="submitForgotPassword">
      <div class="row g-3">
        <div class="col-12">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            class="form-control"
            placeholder="Enter your email"
            required
            autocomplete="email"
          />
        </div>
      </div>

      <div class="d-grid mt-4">
        <button
          type="submit"
          class="btn auth-btn"
          :disabled="loading"
        >
          {{ loading ? "Sending..." : "Send Reset Link" }}
        </button>
      </div>
    </form>

    <div
      v-if="message"
      class="alert alert-success mt-4 mb-0"
      role="alert"
    >
      {{ message }}
    </div>

    <div
      v-if="errorMessage"
      class="alert alert-danger mt-4 mb-0"
      role="alert"
    >
      {{ errorMessage }}
    </div>

    <p class="text-center auth-footer-text mt-4 mb-0">
      Remember your password?
      <router-link to="/designer/login" class="auth-link">
        Login here
      </router-link>
    </p>
  </AuthCardWrapper>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";
import AuthCardWrapper from "@/components/AuthCardWrapper.vue";

const notyf = new Notyf();
const loading = ref(false);
const message = ref("");
const errorMessage = ref("");

const form = reactive({
  email: ""
});

const submitForgotPassword = async () => {
  message.value = "";
  errorMessage.value = "";

  try {
    loading.value = true;

    const response = await api.post("/designer/forgot-password", {
      email: form.email
    });

    message.value =
      response.data?.message || "Password reset link sent successfully.";
    notyf.success(message.value);
    form.email = "";
  } catch (err) {
    console.error("Forgot password error:", err);
    errorMessage.value =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Failed to send reset link.";
    notyf.error(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.alert {
  border-radius: 12px;
  font-size: 0.94rem;
}
</style>