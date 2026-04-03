<template>
  <div class="page-wrapper py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 class="page-title mb-1">My Handyman Profile</h2>
          <p class="page-subtitle mb-0">View your profile information.</p>
        </div>

        <router-link to="/" class="btn btn-outline-primary custom-outline-btn">
          Back to Home
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-warning" role="status"></div>
        <p class="mt-3 text-muted">Loading profile...</p>
      </div>

      <div v-else-if="handyman" class="card profile-card shadow-sm border-0">
        <div class="profile-header text-center">
          <img
            :src="handyman.profilePhoto || defaultPhoto"
            alt="Handyman Profile"
            class="profile-photo"
          />
          <h3 class="profile-name mt-3 mb-1">{{ handyman.fullName || fullName }}</h3>
          <p class="profile-specialty mb-0">{{ handyman.specialty }}</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="info-box">
                <label>Email</label>
                <p>{{ handyman.email || "N/A" }}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="info-box">
                <label>Mobile Number</label>
                <p>{{ handyman.mobileNumber || "N/A" }}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="info-box">
                <label>Gender</label>
                <p>{{ handyman.gender || "N/A" }}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="info-box">
                <label>Birth Year</label>
                <p>{{ handyman.birthYear || "N/A" }}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="info-box">
                <label>City</label>
                <p>{{ handyman.city || "N/A" }}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="info-box">
                <label>Province</label>
                <p>{{ handyman.province || "N/A" }}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="info-box">
                <label>Country</label>
                <p>{{ handyman.country || "Philippines" }}</p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="info-box">
                <label>Subscription Plan</label>
                <p class="text-capitalize">{{ handyman.subscriptionPlan || "basic" }}</p>
              </div>
            </div>

            <div class="col-12">
              <div class="info-box">
                <label>Services Offered</label>
                <p>{{ handyman.servicesOffered || "No services description yet." }}</p>
              </div>
            </div>
          </div>

          <div v-if="handyman.workPhotos?.length" class="mt-4">
            <h5 class="section-title mb-3">Work Photos</h5>
            <div class="row g-3">
              <div
                v-for="(photo, index) in handyman.workPhotos"
                :key="index"
                class="col-6 col-md-4 col-lg-3"
              >
                <img :src="photo" alt="Work Photo" class="work-photo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-warning">
        Failed to load handyman profile.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const handyman = ref(null);
const loading = ref(false);
const notyf = new Notyf();

const defaultPhoto = "/src/assets/images/default-male.jpg";

const fullName = computed(() => {
  if (!handyman.value) return "";
  return `${handyman.value.firstName || ""} ${handyman.value.lastName || ""}`.trim();
});

const fetchHandymanProfile = async () => {
  try {
    loading.value = true;
    const response = await api.get("/handymen/details-handyman");
    handyman.value = response.data?.handyman || null;
  } catch (error) {
    console.error("Error fetching handyman profile:", error);
    notyf.error(error?.response?.data?.error || "Failed to load handyman profile.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchHandymanProfile();
});
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #f4f6f8;
}

.page-title {
  color: #003e86;
  font-weight: 800;
}

.page-subtitle {
  color: #6c757d;
}

.profile-card {
  border-radius: 20px;
  overflow: hidden;
}

.profile-header {
  background: #003e86;
  border-bottom: 4px solid #ffc107;
  padding: 2rem 1.5rem;
}

.profile-photo {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #ffffff;
  background: #fff;
}

.profile-name {
  color: #ffc107;
  font-weight: 800;
}

.profile-specialty {
  color: #f8f9fa;
  font-weight: 500;
}

.info-box {
  background: #f8fafc;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 14px;
  padding: 1rem;
  height: 100%;
}

.info-box label {
  display: block;
  color: #003e86;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.info-box p {
  margin: 0;
  color: #495057;
}

.section-title {
  color: #003e86;
  font-weight: 700;
}

.work-photo {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid rgba(0, 62, 134, 0.08);
}

.custom-outline-btn {
  border-color: #003e86;
  color: #003e86;
  font-weight: 700;
}

.custom-outline-btn:hover {
  background: #003e86;
  color: #fff;
}
</style>