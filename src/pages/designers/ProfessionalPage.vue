<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold">Architects and Engineers</h1>
      <p class="text-muted">Find a construction professionals near you.</p>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary mb-3" role="status"></div>
      <p class="mb-0">Loading professionals...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <div v-else-if="profiles.length === 0" class="text-center text-muted py-5">
      No professionals found.
    </div>

    <div v-else class="row g-4">
      <div
        v-for="profile in profiles"
        :key="profile._id"
        class="col-12 col-md-6 col-lg-3"
      >

      <router-link
        :to="{ name: 'ProfessionalDetailsPage', params: { profileId: profile._id } }"
        class="text-decoration-none text-dark"
      >
        <div class="card h-100 shadow-sm border-1">
          <img
            :src="sampleImage"
            :alt="`${profile.firstName} ${profile.lastName}`"
            class="card-img-top"
            style="height: 250px; object-fit: cover;"
          />

          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0">
                {{ profile.title }} {{ profile.firstName }}
              </h5>

              <span
                v-if="profile.isPremium"
                class="badge bg-warning text-dark ms-2"
              >
                Premium
              </span>
            </div>

            <p class="text-primary fw-semibold mb-2">
              {{ profile.profession }}
            </p>

            <p class="text-muted mb-2">
              <i class="bi bi-geo-alt-fill me-1"></i>
              {{ profile.location }}, {{ profile.country }}
            </p>

            <p class="card-text flex-grow-1">
              {{ profile.pitch || "No pitch provided." }}
            </p>

          </div>
        </div>
      </router-link>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import sampleImage from "@/assets/images/sample-image.png";

const profiles = ref([]);
const loading = ref(true);
const error = ref("");

const fetchProfiles = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await axios.get("http://localhost:4000/professionals/profess");
    profiles.value = response.data.profiles || [];
  } catch (err) {
    console.error("Error fetching professionals:", err);
    error.value = err.response?.data?.error || "Failed to load professional profiles.";
  } finally {
    loading.value = false;
  }
};

const getProfileImage = (profile) => {
  if (profile.profileIcon) return profile.profileIcon;

  if (
    profile.portfolioImages &&
    profile.portfolioImages.length > 0 &&
    profile.portfolioImages[0].imageUrl
  ) {
    return profile.portfolioImages[0].imageUrl;
  }

  return "https://via.placeholder.com/500x400?text=No+Image";
};

onMounted(() => {
  fetchProfiles();
});
</script>

<style scoped>
.card-title {
  font-size: 1.1rem;
}

.card-text {
  font-size: 0.95rem;
  color: #555;
}
</style>