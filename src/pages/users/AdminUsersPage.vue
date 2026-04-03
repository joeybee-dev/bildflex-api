<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">Admin Users</h2>
          <p class="auth-subtitle mb-0">Manage registered user accounts.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div class="mb-4">
            <input
              v-model.trim="search"
              type="text"
              class="form-control"
              placeholder="Search users by name or email"
            />
          </div>

          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else-if="filteredUsers.length === 0" class="empty-state text-center py-5">
            <h5 class="mb-2">No users found</h5>
            <p class="text-muted mb-0">Try another search term.</p>
          </div>

          <div v-else class="table-responsive">
            <table class="table align-middle admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Status</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user._id">
                  <td>{{ user.firstName }} {{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.city || "-" }}</td>
                  <td>{{ user.isActive === false ? "Inactive" : "Active" }}</td>
                  <td class="text-end">
                    <router-link :to="`/admin/users/${user._id}`" class="btn login-btn btn-sm px-3">
                      View
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);
const users = ref([]);
const search = ref("");

const filteredUsers = computed(() => {
  const term = search.value.toLowerCase();
  return users.value.filter((user) =>
    `${user.firstName || ""} ${user.lastName || ""} ${user.email || ""}`
      .toLowerCase()
      .includes(term)
  );
});

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await api.get("/admin/users");
    users.value = response.data?.users || [];
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.error || "Failed to load users.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; }
.auth-subtitle { color: #003e86; }
.form-control { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); color: #003e86; background-color: #fff; }
.form-control:focus { border-color: #ffc107; box-shadow: 0 0 0 .2rem rgba(255,193,7,.18); }
.admin-table thead th { color: #003e86; font-weight: 800; border-bottom: 2px solid rgba(0,62,134,.12); }
.admin-table tbody td { color: #495057; vertical-align: middle; }
.login-btn { min-height: 42px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.empty-state h5 { color: #003e86; font-weight: 800; }
</style>