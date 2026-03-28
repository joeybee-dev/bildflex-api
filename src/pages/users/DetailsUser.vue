<template>
  <div class="details-page py-4 py-md-5">
    <div class="container">
      <div
        class="page-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
      >
        <div>
          <h2 class="page-title mb-1">
            {{ isAdminViewingOtherUser ? "User Details (Read Only)" : "User Details" }}
          </h2>
          <p class="page-subtitle mb-0">
            View account information and profile details.
          </p>
        </div>

        <div class="d-grid d-md-flex gap-2 action-buttons">
          <router-link
            v-if="canEditProfile"
            to="/edit-user"
            class="btn action-btn-primary"
          >
            Edit Profile
          </router-link>

          <router-link
            v-if="loggedInUser?.isAdmin"
            to="/all-users"
            class="btn action-btn-secondary"
          >
            Manage Users
          </router-link>
        </div>
      </div>

      <div v-if="loading" class="loading-card text-center py-5 shadow-sm">
        <div class="spinner-border brand-spinner" role="status"></div>
        <p class="mt-3 mb-0 loading-text">Loading user details...</p>
      </div>

      <div
        v-else-if="user"
        class="card details-card border-0 shadow-sm overflow-hidden"
      >
        <div class="details-header"></div>

        <div class="card-body p-3 p-sm-4 p-md-5">
          <div class="row g-4 g-lg-5 align-items-start">
            <div class="col-12 col-lg-4 text-center">
              <img
                :src="profileImage"
                alt="User Profile"
                class="profile-photo rounded-circle shadow-sm"
              />

              <h4 class="profile-name mt-3 mb-1 text-break">
                {{ user.fullName || user.firstName }}
              </h4>

              <p class="profile-email mb-2 text-break">
                {{ user.email }}
              </p>

              <span
                v-if="isAdminViewingOtherUser"
                class="status-badge px-3 py-2"
              >
                Read Only
              </span>
            </div>

            <div class="col-12 col-lg-8">
              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <label class="field-label d-block mb-1">First Name</label>
                  <div class="field-value text-break">{{ user.firstName || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="field-label d-block mb-1">Last Name</label>
                  <div class="field-value text-break">{{ user.lastName || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="field-label d-block mb-1">Gender</label>
                  <div class="field-value">{{ user.gender || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="field-label d-block mb-1">Birth Year</label>
                  <div class="field-value">{{ user.birthYear || "-" }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <label class="field-label d-block mb-1">Mobile No</label>
                  <div class="field-value text-break">{{ user.mobileNo || "-" }}</div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="field-label d-block mb-1">City</label>
                  <div class="field-value text-break">{{ user.city || "-" }}</div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="field-label d-block mb-1">Province</label>
                  <div class="field-value text-break">{{ user.province || "-" }}</div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="field-label d-block mb-1">Country</label>
                  <div class="field-value text-break">{{ user.country || "-" }}</div>
                </div>

                <div class="col-12">
                  <label class="field-label d-block mb-1">Bio</label>
                  <div class="field-value bio-box">
                    {{ user.bio || "No bio added yet." }}
                  </div>
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12">
                  <hr class="section-divider" />
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12 col-md-4">
                  <label class="field-label d-block mb-1">Role</label>
                  <div class="field-value">
                    {{ user.isAdmin ? "Admin" : "User" }}
                  </div>
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12 col-md-4">
                  <label class="field-label d-block mb-1">Account Status</label>
                  <div class="field-value text-capitalize">
                    {{ user.accountStatus || "-" }}
                  </div>
                </div>

                <div v-if="loggedInUser?.isAdmin" class="col-12 col-md-4">
                  <label class="field-label d-block mb-1">Active</label>
                  <div class="field-value">
                    {{ user.isActive ? "Yes" : "No" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="error-box shadow-sm">
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
  min-height: 100vh;
  background-color: #f4f6f8;
  overflow-x: hidden;
}

.page-header {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-left: 4px solid #ffc107;
  border-radius: 18px;
  padding: 1.25rem 1.25rem;
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

.action-buttons .btn {
  min-width: 150px;
  min-height: 46px;
  border-radius: 12px;
  font-weight: 700;
}

.action-btn-primary {
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
}

.action-btn-primary:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.action-btn-secondary {
  background-color: transparent;
  color: #003e86;
  border: 1px solid #ffc107;
}

.action-btn-secondary:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.loading-card,
.error-box {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-radius: 18px;
}

.loading-card {
  padding: 2rem;
}

.brand-spinner {
  color: #003e86;
}

.loading-text {
  color: #6c757d;
}

.details-card {
  border-radius: 22px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.details-header {
  height: 14px;
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
}

.profile-photo {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border: 4px solid #ffc107;
  background-color: #ffffff;
}

.profile-name {
  color: #003e86;
  font-weight: 800;
}

.profile-email,
.bio-text {
  word-break: break-word;
  overflow-wrap: anywhere;
}

.profile-email {
  color: #6c757d;
}

.status-badge {
  display: inline-block;
  border-radius: 999px;
  background-color: #ffc107;
  color: #003e86;
  font-weight: 700;
  font-size: 0.9rem;
}

.field-label {
  color: #6c757d;
  font-size: 0.83rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.field-value {
  color: #003e86;
  font-weight: 600;
  background-color: #f8f9fb;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 12px;
  padding: 0.8rem 0.95rem;
}

.bio-box {
  min-height: 88px;
  white-space: pre-line;
}

.section-divider {
  border-color: rgba(0, 62, 134, 0.12);
  opacity: 1;
  margin: 0.5rem 0;
}

.error-box {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  padding: 1rem 1.25rem;
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

@media (max-width: 767.98px) {
  .page-header {
    padding: 1rem;
  }

  .action-buttons .btn {
    width: 100%;
  }
}
</style>