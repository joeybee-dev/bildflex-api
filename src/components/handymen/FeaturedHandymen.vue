<template>
  <div class="featured-handymen-page">
    <div class="mb-4">
      <h3 class="section-title mb-1">Handymen</h3>
    <!--   <p class="section-subtitle mb-0">
        Featured handymen for repair, maintenance, and installation services.
      </p> -->
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="text-muted mt-3 mb-0">Loading featured handymen...</p>
    </div>

    <div
      v-else-if="featuredHandymen.length === 0"
      class="empty-state text-center py-5"
    >
      <h4 class="mb-2">No featured handymen found</h4>
      <p class="text-muted mb-0">
        Please check back later for updated featured professionals.
      </p>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="handyman in featuredHandymen.slice(0, 4)"
        :key="handyman._id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <router-link
          :to="`/handymen/${handyman._id}`"
          class="text-decoration-none"
        >
          <div class="card featured-card border-0 shadow-sm h-100">
            <div class="card-body p-4 text-center">
              <div class="profile-photo-wrapper mx-auto mb-3">
                <img
                  :src="getProfilePhoto(handyman)"
                  :alt="handyman.firstName || 'Handyman'"
                  class="profile-photo"
                />
              </div>

              <h5 class="card-title mb-1">
                {{ handyman.firstName || "Unnamed Handyman" }}
              </h5>

              <p class="city-text mb-2">
                {{ handyman.city || "Location not available" }}
              </p>

              <div class="mb-3">
                <span
                  class="availability-badge"
                  :class="getAvailabilityClass(handyman.availabilityStatus)"
                >
                  {{ handyman.availabilityStatus || "Not specified" }}
                </span>
              </div>

              <div class="skills-wrapper mb-3">
                <p class="label-text mb-1">Skills</p>
                <p class="skills-text mb-0">
                  {{ formatSkills(handyman.skills) }}
                </p>
              </div>

              <div class="ratings-box">
                <div class="rating-value">
                  ⭐ {{ formatRating(handyman.averageRatings) }}
                </div>
                <div class="review-count">
                  {{ handyman.totalReviews || 0 }} reviews
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();

const loading = ref(false);
const featuredHandymen = ref([]);

const getProfilePhoto = (handyman) => {
  if (handyman.profilePhoto) return handyman.profilePhoto;
  if (handyman.gender === "Female") return "/src/assets/images/default-female.jpg";
  return "/src/assets/images/default-male.jpg";
};

const formatSkills = (skills) => {
  if (!skills) return "No skills listed";

  if (Array.isArray(skills)) {
    return skills.length ? skills.join(", ") : "No skills listed";
  }

  return String(skills).trim() || "No skills listed";
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

const fetchFeaturedHandymen = async () => {
  try {
    loading.value = true;

    const response = await api.get("/handymen/featured");
    const data =
      response.data?.handymen ||
      response.data?.featuredHandymen ||
      response.data ||
      [];

    featuredHandymen.value = Array.isArray(data)
      ? data.filter((item) => item.isFeatured === true)
      : [];
  } catch (error) {
    console.error("Fetch featured handymen error:", error);
    notyf.error(
      error.response?.data?.error || "Failed to load featured handymen."
    );
  } finally {
    loading.value = false;
  }
};

onMounted(fetchFeaturedHandymen);
</script>

<style scoped>
.featured-handymen-page {
  min-height: auto;
}

.section-title {
  color: #003e86;
  font-weight: 800;
  font-size: 1.8rem;
}

.section-subtitle {
  color: #6c757d;
  font-size: 1rem;
  max-width: 700px;
}

.featured-card {
  border-radius: 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 1rem 2rem rgba(0, 62, 134, 0.08);
}

.profile-photo-wrapper {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ffc107;
  background-color: #ffffff;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  color: #003e86;
  font-weight: 800;
}

.city-text {
  color: #6c757d;
  font-size: 0.95rem;
}

.label-text {
  color: #003e86;
  font-weight: 700;
  font-size: 0.9rem;
}

.skills-text {
  color: #6c757d;
  font-size: 0.95rem;
  line-height: 1.5;
  min-height: 48px;
}

.availability-badge {
  display: inline-block;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.availability-badge.available {
  background-color: rgba(25, 135, 84, 0.12);
  color: #198754;
}

.availability-badge.busy {
  background-color: rgba(255, 193, 7, 0.18);
  color: #9a6700;
}

.availability-badge.offline {
  background-color: rgba(108, 117, 125, 0.14);
  color: #6c757d;
}

.availability-badge.default {
  background-color: rgba(0, 62, 134, 0.08);
  color: #003e86;
}

.ratings-box {
  border-top: 1px solid rgba(0, 62, 134, 0.08);
  padding-top: 1rem;
}

.rating-value {
  color: #003e86;
  font-weight: 800;
  font-size: 1rem;
}

.review-count {
  color: #6c757d;
  font-size: 0.9rem;
}

.empty-state {
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 62, 134, 0.08);
}

@media (max-width: 767.98px) {
  .section-title {
    font-size: 1.5rem;
  }
}
</style>