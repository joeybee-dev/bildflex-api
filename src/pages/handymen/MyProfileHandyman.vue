<template>
  <div class="profile-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <div class="card profile-card border-0 shadow-sm overflow-hidden">
            <div class="profile-header">
              <div
                class="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-between gap-4"
              >
                <div class="d-flex flex-column flex-md-row align-items-center gap-4">
                  <div class="profile-photo-wrapper">
                    <img
                      v-if="handyman.profilePhoto"
                      :src="handyman.profilePhoto"
                      alt="Handyman Profile Photo"
                      class="profile-photo"
                    />
                    <div v-else class="profile-placeholder">
                      <i class="bi bi-person-fill"></i>
                    </div>
                  </div>

                  <div class="text-center text-md-start">
                    <p class="profile-badge mb-2">HANDYMAN PROFILE</p>
                    <h2 class="profile-name mb-1">
                      {{ handyman.fullName || handyman.firstName || "Handyman" }}
                    </h2>
                    <p class="profile-skill mb-2">
                      {{ handyman.skill || "No skill added yet" }}
                    </p>
                    <p class="profile-meta mb-0">
                      <i class="bi bi-geo-alt-fill me-2"></i>
                      {{ formatLocation(handyman) }}
                    </p>
                  </div>
                </div>

                <div class="d-flex flex-column flex-sm-row gap-2">
                  <router-link to="/edit-handyman" class="btn profile-btn-primary">
                    <i class="bi bi-pencil-square me-2"></i>Edit Profile
                  </router-link>
                  <router-link to="/logout-handyman" class="btn profile-btn-outline">
                    <i class="bi bi-box-arrow-right me-2"></i>Logout
                  </router-link>
                </div>
              </div>
            </div>

            <div class="card-body p-4 p-md-5">
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border profile-spinner mb-3" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mb-0">Loading handyman profile...</p>
              </div>

              <div v-else>
                <div class="row g-4">
                  <div class="col-12 col-lg-6">
                    <div class="info-card h-100">
                      <h5 class="section-title mb-3">Basic Information</h5>

                      <div class="info-item">
                        <span class="info-label">First Name</span>
                        <span class="info-value">{{ handyman.firstName || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Last Name</span>
                        <span class="info-value">{{ handyman.lastName || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Full Name</span>
                        <span class="info-value">{{ handyman.fullName || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Gender</span>
                        <span class="info-value">{{ handyman.gender || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Birth Year</span>
                        <span class="info-value">{{ handyman.birthYear || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Member Since</span>
                        <span class="info-value">{{ formatDate(handyman.memberSince) }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-lg-6">
                    <div class="info-card h-100">
                      <h5 class="section-title mb-3">Contact & Location</h5>

                      <div class="info-item">
                        <span class="info-label">Email</span>
                        <span class="info-value text-break">{{ handyman.email || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Mobile Number</span>
                        <span class="info-value">{{ handyman.mobileNumber || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">City</span>
                        <span class="info-value">{{ handyman.city || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Province</span>
                        <span class="info-value">{{ handyman.province || "-" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Country</span>
                        <span class="info-value">{{ handyman.country || "Philippines" }}</span>
                      </div>

                      <div class="info-item">
                        <span class="info-label">Skill</span>
                        <span class="info-value">{{ handyman.skill || "-" }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="info-card">
                      <h5 class="section-title mb-3">Services Offered</h5>
                      <p class="services-text mb-0">
                        {{ handyman.servicesOffered || "No services added yet." }}
                      </p>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="info-card">
                      <div
                        class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mb-3"
                      >
                        <h5 class="section-title mb-0">Work Photos</h5>
                        <router-link
                          to="/edit-handyman"
                          class="upload-link"
                        >
                          Manage Photos
                        </router-link>
                      </div>

                      <div v-if="handyman.workPhotos?.length" class="row g-3">
                        <div
                          v-for="(photo, index) in handyman.workPhotos"
                          :key="index"
                          class="col-6 col-md-4 col-lg-3"
                        >
                          <div class="work-photo-card">
                            <img
                              :src="photo"
                              :alt="`Work photo ${index + 1}`"
                              class="work-photo"
                            />
                          </div>
                        </div>
                      </div>

                      <div v-else class="empty-state">
                        <i class="bi bi-image empty-icon"></i>
                        <p class="mb-0">No work photos uploaded yet.</p>
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="info-card">
                      <h5 class="section-title mb-3">Account Status</h5>

                      <div class="row g-3">
                        <div class="col-12 col-md-6 col-lg-3">
                          <div class="status-box">
                            <span class="status-label">Account Status</span>
                            <span class="status-pill" :class="statusClass(handyman.accountStatus)">
                              {{ handyman.accountStatus || "pending" }}
                            </span>
                          </div>
                        </div>

                        <div class="col-12 col-md-6 col-lg-3">
                          <div class="status-box">
                            <span class="status-label">Subscription</span>
                            <span class="status-value text-capitalize">
                              {{ handyman.subscriptionPlan || "basic" }}
                            </span>
                          </div>
                        </div>

                        <div class="col-12 col-md-6 col-lg-3">
                          <div class="status-box">
                            <span class="status-label">Featured</span>
                            <span class="status-value">
                              {{ handyman.isFeatured ? "Yes" : "No" }}
                            </span>
                          </div>
                        </div>

                        <div class="col-12 col-md-6 col-lg-3">
                          <div class="status-box">
                            <span class="status-label">Active</span>
                            <span class="status-value">
                              {{ handyman.isActive ? "Yes" : "No" }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p v-if="errorMessage" class="text-danger mt-4 mb-0 text-center">
                  {{ errorMessage }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      v-show="showScrollTop"
      class="scroll-top-btn"
      type="button"
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <i class="bi bi-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const router = useRouter();
const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" }
});

const loading = ref(true);
const errorMessage = ref("");
const showScrollTop = ref(false);

const handyman = ref({
  profilePhoto: "",
  firstName: "",
  lastName: "",
  fullName: "",
  gender: "",
  birthYear: "",
  email: "",
  mobileNumber: "",
  city: "",
  province: "",
  country: "Philippines",
  skill: "",
  servicesOffered: "",
  workPhotos: [],
  memberSince: "",
  accountStatus: "pending",
  subscriptionPlan: "basic",
  isFeatured: false,
  isActive: false
});

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 250;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const formatDate = (dateValue) => {
  if (!dateValue) return "-";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const formatLocation = (profile) => {
  const parts = [profile.city, profile.province, profile.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "Location not added";
};

const statusClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "status-active";
    case "pending":
      return "status-pending";
    case "suspended":
    case "blocked":
      return "status-danger";
    case "inactive":
      return "status-inactive";
    default:
      return "status-pending";
  }
};

const fetchHandymanProfile = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const handymanToken = localStorage.getItem("handymanToken");
    const userType = localStorage.getItem("userType");

    if (!handymanToken || userType !== "handyman") {
      notyf.error("Please log in as handyman first.");
      router.replace("/login-handyman");
      return;
    }

    const response = await api.get("/handymen/details-handyman", {
      headers: {
        Authorization: `Bearer ${handymanToken}`
      }
    });

    handyman.value = response.data?.handyman || {};
  } catch (error) {
    console.error("Error fetching handyman profile:", error);

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("handymanToken");
      localStorage.removeItem("handymanData");

      if (localStorage.getItem("userType") === "handyman") {
        localStorage.removeItem("userType");
      }

      notyf.error("Session expired. Please log in again.");
      router.replace("/login-handyman");
      return;
    }

    if (error.response?.status === 404) {
      errorMessage.value = "Handyman profile not found.";
      notyf.error("Handyman profile not found.");
      return;
    }

    errorMessage.value =
      error.response?.data?.error || "Failed to fetch handyman profile.";
    notyf.error(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchHandymanProfile();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f4f6f8;
}

.profile-card {
  border-radius: 24px;
  border: 1px solid rgba(0, 62, 134, 0.1);
  background: #ffffff;
}

.profile-header {
  background: linear-gradient(135deg, #003e86 0%, #0b58b0 100%);
  border-bottom: 3px solid #ffc107;
  padding: 2rem;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 193, 7, 0.16);
  color: #ffc107;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.profile-name {
  color: #ffffff;
  font-weight: 800;
  margin: 0;
}

.profile-skill {
  color: #ffc107;
  font-weight: 700;
  font-size: 1rem;
}

.profile-meta {
  color: #d9e6f7;
  font-size: 0.95rem;
}

.profile-photo-wrapper {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.profile-photo,
.profile-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.85);
  object-fit: cover;
  background: #ffffff;
}

.profile-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #003e86;
  font-size: 3rem;
}

.profile-btn-primary,
.profile-btn-outline {
  min-height: 46px;
  border-radius: 12px;
  font-weight: 700;
  padding: 0.7rem 1.1rem;
  text-decoration: none;
  transition: 0.25s ease;
}

.profile-btn-primary {
  background: #ffc107;
  color: #003e86;
  border: 1px solid #ffc107;
}

.profile-btn-primary:hover {
  background: #ffcd39;
  color: #003e86;
}

.profile-btn-outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.profile-btn-outline:hover {
  background: #ffffff;
  color: #003e86;
}

.info-card {
  height: 100%;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 18px;
  background: #ffffff;
  padding: 1.25rem;
  box-shadow: 0 10px 24px rgba(13, 52, 99, 0.05);
}

.section-title {
  color: #003e86;
  font-weight: 800;
}

.info-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(0, 62, 134, 0.08);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: #5f6f82;
  font-weight: 700;
  min-width: 130px;
}

.info-value {
  color: #003e86;
  font-weight: 600;
  text-align: right;
}

.services-text {
  color: #003e86;
  line-height: 1.7;
}

.work-photo-card {
  border-radius: 16px;
  overflow: hidden;
  background: #eef3f9;
  border: 1px solid rgba(0, 62, 134, 0.08);
  aspect-ratio: 1 / 1;
}

.work-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.empty-state {
  min-height: 180px;
  border: 2px dashed rgba(0, 62, 134, 0.18);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #6b7b8f;
  gap: 0.75rem;
}

.empty-icon {
  font-size: 2rem;
  color: #003e86;
}

.upload-link {
  color: #003e86;
  font-weight: 700;
  text-decoration: none;
}

.upload-link:hover {
  color: #ffc107;
}

.status-box {
  height: 100%;
  padding: 1rem;
  border-radius: 16px;
  background: #f7f9fc;
  border: 1px solid rgba(0, 62, 134, 0.08);
}

.status-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #6b7b8f;
  font-weight: 700;
  font-size: 0.9rem;
}

.status-value {
  color: #003e86;
  font-weight: 800;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  font-weight: 800;
  font-size: 0.85rem;
  text-transform: capitalize;
}

.status-active {
  background: rgba(25, 135, 84, 0.12);
  color: #198754;
}

.status-pending {
  background: rgba(255, 193, 7, 0.15);
  color: #9a6a00;
}

.status-danger {
  background: rgba(220, 53, 69, 0.12);
  color: #dc3545;
}

.status-inactive {
  background: rgba(108, 117, 125, 0.14);
  color: #6c757d;
}

.profile-spinner {
  width: 3rem;
  height: 3rem;
  color: #003e86;
}

.scroll-top-btn {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: #003e86;
  color: #ffffff;
  font-size: 1.1rem;
  box-shadow: 0 10px 24px rgba(0, 62, 134, 0.25);
  z-index: 999;
}

.scroll-top-btn:hover {
  background: #ffc107;
  color: #003e86;
}

@media (max-width: 767.98px) {
  .profile-header {
    padding: 1.5rem 1rem;
  }

  .profile-photo-wrapper {
    width: 96px;
    height: 96px;
  }

  .profile-name {
    font-size: 1.6rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-value {
    text-align: left;
  }
}
</style>