<template>
  <div class="professional-details-page py-5">
    <div class="container">
      <div v-if="loading" class="text-center py-5 text-white">
        <div class="spinner-border text-light mb-3" role="status"></div>
        <p class="mb-0">Loading professional details...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>

      <div v-else-if="profile">
        <!-- TOP SECTION -->
        <div class="card floating-card border-0 mb-4">
          <div class="card-body p-4">
            <div class="row g-4 align-items-start">
              <div class="col-12 col-md-4 col-lg-3 text-center">
                <div class="profile-image-wrapper mx-auto mb-3">
                  <img
                    :src="getMainImage(profile)"
                    :alt="fullName"
                    class="img-fluid rounded shadow-sm profile-image"
                  />
                </div>

                <div class="d-flex justify-content-center gap-2 flex-wrap">
                  <span
                    v-if="profile.isPremium"
                    class="badge bg-warning text-dark px-3 py-2"
                  >
                    Premium
                  </span>

                
                </div>
              </div>

              <div class="col-12 col-md-8 col-lg-9">
                <h2 class="mb-3">{{ fullName }}</h2>

                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <p class="mb-1 text-muted">Profession</p>
                    <h6 class="mb-0">{{ profile.profession || "N/A" }}</h6>
                  </div>

                  <div class="col-12 col-md-6">
                    <p class="mb-1 text-muted">Location</p>
                    <h6 class="mb-0">
                      {{ profile.location || "N/A" }}, {{ profile.country || "N/A" }}
                    </h6>
                  </div>

                  <div class="col-12">
                    <p class="mb-1 text-muted">Pitch</p>
                    <p class="mb-0">{{ profile.pitch || "No pitch provided." }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SERVICES -->
        <div class="card floating-card border-0 mb-4">
          <div class="card-body p-4">
            <h4 class="mb-3">Services Offered</h4>
            <p class="mb-0">
              {{ profile.servicesOffered || "No services listed." }}
            </p>
          </div>
        </div>

        <!-- PORTFOLIO -->
        <div class="card floating-card border-0 mb-4">
          <div class="card-body p-4">
            <h4 class="mb-4">Portfolio Images</h4>

            <div
              v-if="profile.portfolioImages && profile.portfolioImages.length > 0"
              class="row g-4"
            >
              <div
                v-for="(image, index) in profile.portfolioImages"
                :key="index"
                class="col-12 col-md-6 col-lg-4"
              >
                <div class="card h-100 portfolio-card border-0">
                  <img
                    :src="image.imageUrl || fallbackImage"
                    :alt="image.caption || `Portfolio ${index + 1}`"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h6 class="mb-2">
                      {{ image.caption || `Project ${index + 1}` }}
                    </h6>
                    <p class="text-muted mb-0 small">
                      {{ image.width || 500 }} x {{ image.height || 400 }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p v-else class="text-muted mb-0">
              No portfolio images available.
            </p>
          </div>
        </div>

        <!-- DETAILS -->
        <div class="card floating-card border-0">
          <div class="card-body p-4">
            <h4 class="mb-3">Profile Details</h4>

            <div class="row g-3">
              <div class="col-12 col-md-6">
                <p class="mb-1 text-muted">Title</p>
                <p class="mb-0">{{ profile.title || "N/A" }}</p>
              </div>

              <div class="col-12 col-md-6">
                <p class="mb-1 text-muted">First Name</p>
                <p class="mb-0">{{ profile.firstName || "N/A" }}</p>
              </div>

              <div class="col-12 col-md-6">
                <p class="mb-1 text-muted">Last Name</p>
                <p class="mb-0">{{ profile.lastName || "N/A" }}</p>
              </div>

              <div class="col-12 col-md-6">
                <p class="mb-1 text-muted">Country</p>
                <p class="mb-0">{{ profile.country || "N/A" }}</p>
              </div>

              <div class="col-12 col-md-6" v-if="profile.createdAt">
                <p class="mb-1 text-muted">Created At</p>
                <p class="mb-0">{{ formatDate(profile.createdAt) }}</p>
              </div>

              <div class="col-12 col-md-6" v-if="profile.updatedAt">
                <p class="mb-1 text-muted">Updated At</p>
                <p class="mb-0">{{ formatDate(profile.updatedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-warning text-center">
        No professional data found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const profile = ref(null);
const loading = ref(true);
const error = ref("");

const fallbackImage = "https://via.placeholder.com/500x400?text=No+Image";

const fullName = computed(() => {
  if (!profile.value) return "";
  return `${profile.value.title || ""} ${profile.value.firstName || ""} ${profile.value.lastName || ""}`
    .replace(/\s+/g, " ")
    .trim();
});

const getMainImage = (profileData) => {
  if (profileData?.profileIcon) return profileData.profileIcon;

  if (
    profileData?.portfolioImages &&
    profileData.portfolioImages.length > 0 &&
    profileData.portfolioImages[0].imageUrl
  ) {
    return profileData.portfolioImages[0].imageUrl;
  }

  return fallbackImage;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString();
};

const fetchProfessionalDetails = async () => {
  try {
    loading.value = true;
    error.value = "";

    const profileId = route.params.profileId;

    if (!profileId) {
      error.value = "Profile ID is missing.";
      profile.value = null;
      return;
    }

    const response = await axios.get(
      `http://localhost:4000/professionals/profess/${profileId}`
    );

    profile.value = response.data.profile;
  } catch (err) {
    console.error("Error fetching professional details:", err);
    error.value =
      err.response?.data?.error || "Failed to load professional details.";
    profile.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProfessionalDetails();
});
</script>

<style scoped>
.professional-details-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1b1f24 0%, #111418 100%);
}

.floating-card {
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.floating-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.34);
}

.portfolio-card {
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
  overflow: hidden;
}

.portfolio-card img {
  height: 220px;
  object-fit: cover;
}

.profile-image-wrapper {
  width: 100%;
  max-width: 280px;
  border-radius: 16px;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  max-width: 280px;
  height: 280px;
  object-fit: cover;
  display: block;
}

.card {
  border-radius: 18px;
}

h2,
h4 {
  font-weight: 700;
  color: #1c1c1c;
}

p {
  color: #555;
}
</style>