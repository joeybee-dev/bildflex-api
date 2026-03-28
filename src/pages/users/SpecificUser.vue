<template>
  <div class="details-page py-4 py-md-5 bg-light min-vh-100">
    <div class="container">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
      >
        <div>
          <h2 class="fw-bold mb-1 text-center text-md-start">Specific User</h2>
          <p class="text-muted mb-0 text-center text-md-start">
            Admin read-only view
          </p>
        </div>

        <div class="d-grid d-md-flex gap-2 action-buttons">
          <router-link to="/all-users" class="btn btn-dark">
            Back to All Users
          </router-link>

          <router-link to="/details-user" class="btn btn-outline-secondary">
            Back to Profile
          </router-link>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border" role="status"></div>
      </div>

      <div v-else-if="user" class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="card-body p-3 p-sm-4 p-md-5">
          <div class="row g-4 g-lg-5 align-items-start">
            <div class="col-12 col-lg-4 text-center">
              <img
                :src="profileImage"
                alt="User Profile"
                class="profile-photo rounded-circle shadow-sm border"
              />

              <h4 class="fw-bold mt-3 mb-1 text-break">
                {{ user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "-" }}
              </h4>

              <p class="text-muted mb-2 text-break user-email">
                {{ user.email || "-" }}
              </p>

              <span class="badge bg-secondary px-3 py-2">
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
                  <label class="text-muted small d-block mb-1">Full Name</label>
                  <div class="fw-semibold text-break">{{ user.fullName || "-" }}</div>
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

                <div class="col-12"><hr /></div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Role</label>
                  <div class="fw-semibold">
                    {{ user.isAdmin ? "Admin" : "User" }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">User Type</label>
                  <div class="fw-semibold text-capitalize">
                    {{ user.userType || "-" }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Subscription</label>
                  <div class="fw-semibold text-capitalize">
                    {{ user.subscriptionPlan || "-" }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Account Status</label>
                  <div class="fw-semibold text-capitalize">
                    {{ user.accountStatus || "-" }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Verification Status</label>
                  <div class="fw-semibold text-capitalize">
                    {{ user.verificationStatus || "-" }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Active</label>
                  <div class="fw-semibold">
                    {{ user.isActive ? "Yes" : "No" }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Archived</label>
                  <div class="fw-semibold">
                    {{ user.isArchived ? "Yes" : "No" }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Created</label>
                  <div class="fw-semibold">
                    {{ formatDate(user.createdAt) }}
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="text-muted small d-block mb-1">Updated</label>
                  <div class="fw-semibold">
                    {{ formatDate(user.updatedAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-danger">
        Failed to load specific user details.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

import defaultMale from "@/assets/images/default-male.jpg";
import defaultFemale from "@/assets/images/default-female.jpg";

const route = useRoute();
const router = useRouter();
const notyf = new Notyf();

const loading = ref(false);
const user = ref(null);
const loggedInUser = ref(null);

const profileImage = computed(() => {
  if (user.value?.profilePhoto) return user.value.profilePhoto;
  if (user.value?.gender === "Female") return defaultFemale;
  return defaultMale;
});

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const fetchLoggedInUser = async () => {
  const response = await api.get("/users/details-user");
  loggedInUser.value = response.data.user;

  if (!loggedInUser.value?.isAdmin) {
    notyf.error("Admin access only.");
    router.push("/details-user");
    return false;
  }

  return true;
};

const fetchSpecificUser = async () => {
  const userId = route.params.userId;
  const response = await api.get(`/users/specific-user/${userId}`);
  user.value = response.data.user;
};

const loadPage = async () => {
  try {
    loading.value = true;

    const isAllowed = await fetchLoggedInUser();
    if (!isAllowed) return;

    await fetchSpecificUser();
  } catch (err) {
    console.error("Fetch specific user error:", err);
    notyf.error(err.response?.data?.error || "Failed to fetch specific user.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPage();
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