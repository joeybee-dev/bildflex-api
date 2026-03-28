<template>
  <div class="py-5 bg-light min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
          <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-4 p-md-5 text-center">
              <h2 class="fw-bold mb-3 text-danger">Delete User</h2>
              <p class="text-muted mb-4">
                This action cannot be undone. Are you sure you want to delete this user?
              </p>

              <div class="d-flex justify-content-center gap-2">
                <router-link to="/all-users" class="btn btn-outline-secondary">
                  Cancel
                </router-link>
                <button
                  class="btn btn-danger"
                  :disabled="loading"
                  @click="deleteUser"
                >
                  {{ loading ? "Deleting..." : "Delete User" }}
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

const deleteUser = async () => {
  try {
    loading.value = true;
    const response = await api.delete(`/users/delete-user/${route.params.userId}`);
    notyf.success(response.data.message || "User deleted successfully.");
    router.push("/all-users");
  } catch (err) {
    console.error("Delete user error:", err);
    notyf.error(err.response?.data?.error || "Failed to delete user.");
  } finally {
    loading.value = false;
  }
};
</script>