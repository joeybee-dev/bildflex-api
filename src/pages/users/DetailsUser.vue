<template>
  <div class="details-page py-4 py-md-5 bg-light min-vh-100">
    <div class="container">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
      >
        <h2 class="fw-bold mb-0 text-center text-md-start">
          {{ isAdminViewingOtherUser ? "User Details (Read Only)" : "User Details" }}
        </h2>

        <div class="d-grid d-md-flex gap-2 action-buttons">
          <router-link
            v-if="canEditProfile"
            to="/edit-user"
            class="btn btn-primary"
          >
            Edit Profile
          </router-link>

          <router-link
            v-if="loggedInUser?.isAdmin"
            to="/all-users"
            class="btn btn-dark"
          >
            Manage Users
          </router-link>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border" role="status"></div>
      </div>

      <div
        v-else-if="user"
        class="card border-0 shadow-sm rounded-4 overflow-hidden"
      >
        <div class="card-body p-3 p-sm-4 p-md-5">
          <div class="row g-4 g-lg-5 align-items-start">
            <div class="col-12 col-lg-4 text-center">
              <img
                :src="profileImage"
                alt="User Profile"
                class="profile-photo rounded-circle shadow-sm border"
              />

              <h4 class="fw-bold mt-3 mb-1 text-break">
                {{ user.fullName || user.firstName }}
              </h4>

              <p class="text-muted mb-2 text-break user-email">
                {{ user.email }}
              </p>

              <span
                v-if="isAdminViewingOtherUser"
                class="badge bg-secondary px-3 py-2"
              >
                Read Only
              </span>
            </div>

            <div class="col-12 col-lg-8">
              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <label class="text-muted small d-block mb-1">First Name</label>
                  <div class="fw-semibold text-break">{{ user.firstName || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="text-muted small d-block mb-1">Last Name</label>
                  <div class="fw-semibold text-break">{{ user.lastName || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="text-muted small d-block mb-1">Gender</label>
                  <div class="fw-semibold">{{ user.gender || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="text-muted small d-block mb-1">Birth Year</label>
                  <div class="fw-semibold">{{ user.birthYear || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="text-muted small d-block mb-1">Mobile No</label>
                  <div class="fw-semibold text-break">{{ user.mobileNo || "-" }}</div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">City</label>
                  <div class="fw-semibold text-break">{{ user.city || "-" }}</div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Province</label>
                  <div class="fw-semibold text-break">{{ user.province || "-" }}</div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Country</label>
                  <div class="fw-semibold text-break">{{ user.country || "-" }}</div>
                </div>

                <div class="col-12">
                  <label class="text-muted small d-block mb-1">Bio</label>
                  <div class="fw-semibold bio-text">
                    {{ user.bio || "No bio added yet." }}
                  </div>
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12">
                  <hr />
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Role</label>
                  <div class="fw-semibold">
                    {{ user.isAdmin ? "Admin" : "User" }}
                  </div>
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Account Status</label>
                  <div class="fw-semibold text-capitalize">
                    {{ user.accountStatus || "-" }}
                  </div>
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Active</label>
                  <div class="fw-semibold">
                    {{ user.isActive ? "Yes" : "No" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-danger">
        Failed to load user details.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

import defaultMale from "@/assets/images/default-male.jpg";
import defaultFemale from "@/assets/images/default-female.jpg";

const route = useRoute();
const notyf = new Notyf();

const loading = ref(false);
const user = ref(null);
const loggedInUser = ref(null);

const viewedUserId = computed(() => route.params.userId || null);

const isAdminViewingOtherUser = computed(() => {
  return (
    loggedInUser.value?.isAdmin &&
    viewedUserId.value &&
    user.value &&
    loggedInUser.value._id !== user.value._id
  );
});

const canEditProfile = computed(() => {
  return (
    user.value &&
    loggedInUser.value &&
    loggedInUser.value._id === user.value._id
  );
});

const profileImage = computed(() => {
  if (user.value?.profilePhoto) return user.value.profilePhoto;
  if (user.value?.gender === "Male") return defaultMale;
  if (user.value?.gender === "Female") return defaultFemale;
  return defaultMale;
});

const fetchLoggedInUser = async () => {
  const response = await api.get("/users/details-user");
  loggedInUser.value = response.data.user;
};

const fetchViewedUser = async () => {
  if (viewedUserId.value) {
    const response = await api.get(`/users/specific-user/${viewedUserId.value}`);
    user.value = response.data.user;
  } else {
    const response = await api.get("/users/details-user");
    user.value = response.data.user;
  }
};

const fetchPageData = async () => {
  try {
    loading.value = true;
    await fetchLoggedInUser();
    await fetchViewedUser();
  } catch (err) {
    console.error("Fetch user details error:", err);
    notyf.error(err.response?.data?.error || "Failed to fetch user details.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPageData();
});
</script>

<style scoped>
.details-page {
  overflow-x: hidden;
}

.action-buttons .btn {
  min-width: 140px;
}

.profile-photo {
  width: 140px;
  height: 140px;
  object-fit: cover;
}

.user-email,
.bio-text {
  word-break: break-word;
  overflow-wrap: anywhere;
}

@media (min-width: 576px) {
  .profile-photo {
    width: 180px;
    height: 180px;
  }
}

@media (min-width: 768px) {
  .profile-photo {
    width: 220px;
    height: 220px;
  }
}

@media (min-width: 992px) {
  .profile-photo {
    width: 260px;
    height: 260px;
  }
}
</style>