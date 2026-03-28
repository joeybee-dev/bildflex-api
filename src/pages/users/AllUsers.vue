<template>
  <div class="py-5 bg-light min-vh-100">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 class="fw-bold mb-0">All Users</h2>
        <router-link to="/details-user" class="btn btn-outline-secondary">
          Back to Profile
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border" role="status"></div>
      </div>

      <div v-else class="card border-0 shadow-sm rounded-4">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-dark">
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
                  <td colspan="6" class="text-center py-4">No users found.</td>
                </tr>

                <tr
                  v-for="user in users"
                  :key="user._id"
                  class="user-row"
                  @click="goToSpecificUser(user._id)"
                >
                  <td>
                    {{ user.fullName || `${user.firstName} ${user.lastName || ""}`.trim() }}
                  </td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.city || "-" }}</td>
                  <td>
                    <span
                      class="badge text-capitalize"
                      :class="badgeClass(user.accountStatus)"
                    >
                      {{ user.accountStatus }}
                    </span>
                  </td>
                  <td>
                    <span class="badge" :class="user.isAdmin ? 'bg-dark' : 'bg-primary'">
                      {{ user.isAdmin ? "Admin" : "User" }}
                    </span>
                  </td>
                  <td class="text-center">
                    <div class="d-flex justify-content-center gap-2 flex-wrap">
                      <router-link
                        :to="`/archived-user/${user._id}`"
                        class="btn btn-sm btn-warning"
                        @click.stop
                      >
                        Archive
                      </router-link>

                      <router-link
                        :to="`/activate-user/${user._id}`"
                        class="btn btn-sm btn-success"
                        @click.stop
                      >
                        Activate
                      </router-link>

                      <router-link
                        :to="`/delete-user/${user._id}`"
                        class="btn btn-sm btn-danger"
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
  if (status === "active") return "bg-success";
  if (status === "inactive") return "bg-secondary";
  if (status === "archived") return "bg-warning text-dark";
  return "bg-light text-dark";
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
.user-row {
  cursor: pointer;
}

.user-row:hover {
  background-color: #f8f9fa;
}
</style>