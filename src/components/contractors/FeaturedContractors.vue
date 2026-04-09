<template>
  <div class="featured-professionals-page">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="section-title mb-1">Contractors</h3>

      <router-link to="/contractors" class="view-all-link">
        View All
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="text-muted mt-3 mb-0">Loading featured contractors...</p>
    </div>

    <div
      v-else-if="featuredContractors.length === 0"
      class="empty-state text-center py-5"
    >
      <h4 class="mb-2">No featured contractors found</h4>
      <p class="text-muted mb-0">
        Please check back later for updated featured professionals.
      </p>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="contractor in featuredContractors.slice(0, 4)"
        :key="contractor._id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <router-link
          :to="getProtectedRoute('details-contractor', contractor._id)"
          class="text-decoration-none"
        >
          <div class="card featured-card shadow-sm h-100">
            <div class="card-body p-3">
              <div class="top-section d-flex align-items-start mb-2">
                <div class="profile-photo-wrapper flex-shrink-0 me-4">
                  <img
                    :src="getProfilePhoto(contractor)"
                    :alt="contractor.firstName"
                    class="profile-photo"
                  />
                </div>

                <div class="top-details text-start">
                  <div class="ratings-box mb-1">
                    <div class="rating-value">
                      ⭐ {{ formatRating(contractor.averageRatings) }}
                    </div>
                    <div class="review-count">
                      {{ contractor.totalReviews || 0 }} reviews
                    </div>
                    <div>
                      <span
                        class="availability-badge"
                        :class="getAvailabilityClass(contractor.availabilityStatus)"
                      >
                        {{ contractor.availabilityStatus || "Not specified" }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bottom-section text-start">
                <h5 class="card-name mb-0">
                  {{ contractor.firstName }}
                </h5>
                <div class="skills-wrapper mb-0">
                  <p class="skills-text mb-0">
                    {{ formatSkills(contractor.skills || contractor.servicesOffered) }}
                  </p>
                </div>

                <p class="city-text mb-2">
                  {{ contractor.city || "Location not available" }}
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/professional-card-shared.css";
import { onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";
import useFeaturedCardRoute from "@/composables/useFeaturedCardRoute";

const notyf = new Notyf();
const { getProtectedRoute } = useFeaturedCardRoute();

const loading = ref(false);
const featuredContractors = ref([]);

const getProfilePhoto = (contractor) => {
  if (contractor.profilePhoto) return contractor.profilePhoto;
  if (contractor.gender === "Female") return "/default-contractor.png";
  return "/default-contractor.png";
};

const formatSkills = (skills) => {
  if (!skills) return "No services listed";

  if (Array.isArray(skills)) {
    return skills.length ? skills.join(", ") : "No services listed";
  }

  return String(skills).trim() || "No services listed";
};

const formatRating = (rating) => {
  const parsed = Number(rating);
  return Number.isNaN(parsed) ? "0.0" : parsed.toFixed(1);
};

const getAvailabilityClass = (status) => {
  const normalized = String(status || "").toLowerCase();

  if (normalized.includes("available")) return "available";
  if (normalized.includes("busy")) return "busy";
  if (normalized.includes("offline")) return "offline";

  return "default";
};

const fetchFeaturedContractors = async () => {
  try {
    loading.value = true;

    const response = await api.get("/contractors/featured");
    const data =
      response.data?.contractors ||
      response.data?.featuredContractors ||
      response.data ||
      [];

    featuredContractors.value = Array.isArray(data)
      ? data.filter((item) => item.isFeatured === true)
      : [];
  } catch (error) {
    console.error("Fetch featured contractors error:", error);
    notyf.error(
      error.response?.data?.error || "Failed to load featured contractors."
    );
  } finally {
    loading.value = false;
  }
};

onMounted(fetchFeaturedContractors);
</script>

<style scoped></style>