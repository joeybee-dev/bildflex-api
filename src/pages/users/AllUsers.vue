<template>
  <div class="users-page py-4 py-md-5">
    <div class="container">
      <div
        class="page-header d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"
      >
        <div>
          <h2 class="page-title mb-1">All Users</h2>
          <p class="page-subtitle mb-0">
            Manage user accounts, roles, and account status.
          </p>
        </div>

        <router-link to="/details-user" class="btn action-btn-secondary">
          Back to Profile
        </router-link>
      </div>

      <div v-if="loading" class="loading-card text-center py-5 shadow-sm">
        <div class="spinner-border brand-spinner" role="status"></div>
        <p class="mt-3 mb-0 loading-text">Loading users...</p>
      </div>

      <div v-else class="card users-card border-0 shadow-sm overflow-hidden">
        <div class="users-header"></div>

        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table align-middle mb-0 users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-if="users.length === 0">
                  <td colspan="6" class="text-center py-4 empty-state">
                    No users found.
                  </td>
                </tr>

                <tr
                  v-for="user in users"
                  :key="user._id"
                  class="user-row"
                  @click="goToSpecificUser(user._id)"
                >
                  <td class="fw-semibold text-break">
                    {{ user.fullName || `${user.firstName} ${user.lastName || ""}`.trim() }}
                  </td>

                  <td class="text-break">{{ user.email }}</td>

                  <td>{{ user.city || "-" }}</td>

                  <td>
                    <span class="status-badge text-capitalize" :class="badgeClass(user.accountStatus)">
                      {{ user.accountStatus || "-" }}
                    </span>
                  </td>

                  <td>
                    <span class="role-badge" :class="user.isAdmin ? 'role-admin' : 'role-user'">
                      {{ user.isAdmin ? "Admin" : "User" }}
                    </span>
                  </td>

                  <td class="text-center">
                    <div class="d-flex justify-content-center gap-2 flex-wrap">
                      <router-link
                        :to="`/archived-user/${user._id}`"
                        class="btn btn-sm table-btn btn-archive"
                        @click.stop
                      >
                        Archive
                      </router-link>

                      <router-link
                        :to="`/activate-user/${user._id}`"
                        class="btn btn-sm table-btn btn-activate"
                        @click.stop
                      >
                        Activate
                      </router-link>

                      <router-link
                        :to="`/delete-user/${user._id}`"
                        class="btn btn-sm table-btn btn-delete"
                        @click.stop
                      >
                        Delete
                      </router-link>
                    </div>
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);
const users = ref([]);

const badgeClass = (status) => {
  if (status === "active") return "status-active";
  if (status === "inactive") return "status-inactive";
  if (status === "archived") return "status-archived";
  return "status-default";
};

const goToSpecificUser = (userId) => {
  router.push(`/specific-user/${userId}`);
};

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await api.get("/users/all-users");
    users.value = response.data.users || [];
  } catch (err) {
    console.error("Fetch all users error:", err);
    notyf.error(err.response?.data?.error || "Failed to fetch users.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.users-page {
  min-height: 100vh;
  background-color: #f4f6f8;
}

.page-header {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-left: 4px solid #ffc107;
  border-radius: 18px;
  padding: 1.25rem;
}

.page-title {
  color: #003e86;
  font-weight: 800;
  margin: 0;
}

.page-subtitle {
  color: #6c757d;
  font-size: 0.96rem;
}

.users-card {
  border-radius: 22px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.users-header {
  height: 14px;
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
}

.loading-card {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-radius: 18px;
}

.brand-spinner {
  color: #003e86;
}

.loading-text {
  color: #6c757d;
}

.users-table thead th {
  background-color: #003e86;
  color: #ffffff;
  font-weight: 700;
  border-bottom: 2px solid #ffc107;
  white-space: nowrap;
  padding: 1rem 1rem;
}

.users-table tbody td {
  padding: 1rem;
  vertical-align: middle;
  border-color: rgba(0, 62, 134, 0.08);
  color: #003e86;
}

.user-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-row:hover {
  background-color: #f8f9fb;
}

.empty-state {
  color: #6c757d;
}

.status-badge,
.role-badge {
  display: inline-block;
  padding: 0.38rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.status-active {
  background-color: #d1e7dd;
  color: #0f5132;
}

.status-inactive {
  background-color: #e2e3e5;
  color: #41464b;
}

.status-archived {
  background-color: #fff3cd;
  color: #664d03;
}

.status-default {
  background-color: #f8f9fa;
  color: #212529;
}

.role-admin {
  background-color: #003e86;
  color: #ffffff;
}

.role-user {
  background-color: #ffc107;
  color: #003e86;
}

.table-btn {
  min-width: 88px;
  border-radius: 10px;
  font-weight: 700;
  transition: all 0.25s ease;
}

.btn-archive {
  background-color: #ffc107;
  color: #003e86;
  border: 1px solid #ffc107;
}

.btn-archive:hover {
  background-color: #e0aa00;
  color: #003e86;
  border-color: #e0aa00;
}

.btn-activate {
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
}

.btn-activate:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.btn-delete {
  background-color: #dc3545;
  color: #ffffff;
  border: 1px solid #dc3545;
}

.btn-delete:hover {
  background-color: #bb2d3b;
  color: #ffffff;
  border-color: #bb2d3b;
}

.action-btn-secondary {
  min-width: 150px;
  min-height: 46px;
  border-radius: 12px;
  font-weight: 700;
  background-color: transparent;
  color: #003e86;
  border: 1px solid #ffc107;
}

.action-btn-secondary:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

@media (max-width: 767.98px) {
  .page-header {
    padding: 1rem;
  }

  .action-btn-secondary {
    width: 100%;
  }

  .users-table thead th,
  .users-table tbody td {
    padding: 0.85rem 0.75rem;
  }
}
</style>