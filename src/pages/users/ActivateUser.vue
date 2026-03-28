<template>
  <div class="py-5 bg-light min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
          <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-4 p-md-5 text-center">
              <h2 class="fw-bold mb-3">Activate User</h2>
              <p class="text-muted mb-4">
                Are you sure you want to activate this user?
              </p>

              <div class="d-flex justify-content-center gap-2">
                <router-link to="/all-users" class="btn btn-outline-secondary">
                  Cancel
                </router-link>
                <button
                  class="btn btn-success"
                  :disabled="loading"
                  @click="activateUser"
                >
                  {{ loading ? "Activating..." : "Activate User" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);

const activateUser = async () => {
  try {
    loading.value = true;
    const response = await api.patch(`/users/activate-user/${route.params.userId}`);
    notyf.success(response.data.message || "User activated successfully.");
    router.push("/all-users");
  } catch (err) {
    console.error("Activate user error:", err);
    notyf.error(err.response?.data?.error || "Failed to activate user.");
  } finally {
    loading.value = false;
  }
};
</script>