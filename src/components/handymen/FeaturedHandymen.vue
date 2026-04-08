<template>
  <div class="featured-handymen-page">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="section-title mb-1">Handymen</h3>

      <router-link to="/handymen" class="view-all-link">
            View All
      </router-link>
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

<!-- Card Handyman -->
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
          <div class="card featured-card shadow-sm h-100">
            <div class="card-body p-3">
              <!-- Top Part -->
              <div class="top-section d-flex align-items-start mb-2">
                <div class="profile-photo-wrapper flex-shrink-0 me-4">
                  <img
                    :src="getProfilePhoto(handyman)"
                    :alt="handyman.firstName"
                    class="profile-photo"
                  />
                </div>

                <div class="top-details text-start">
                  <div class="ratings-box mb-1">
                    <div class="rating-value">
                      ⭐ {{ formatRating(handyman.averageRatings) }}
                    </div>
                    <div class="review-count">
                      {{ handyman.totalReviews || 0 }} reviews
                    </div>
                    <div>
                      <span
                        class="availability-badge"
                        :class="getAvailabilityClass(handyman.availabilityStatus)"
                      >
                        {{ handyman.availabilityStatus || "Not specified" }}
                      </span>
                    </div>
                  </div>

                
                </div>
              </div>

              <!-- Bottom Part -->             
              <div class="bottom-section text-start">
                <h5 class="card-name mb-0">
                  {{ handyman.firstName }}
                </h5>
                <div class="skills-wrapper mb-0">
                  <p class="skills-text mb-0">
                    {{ formatSkills(handyman.skills) }}
                  </p>
                </div>

                <p class="city-text mb-2">
                  {{ handyman.city || "Location not available" }}
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
  font-weight: 700;
  font-size: 1rem;
}

.section-subtitle {
  color: #6c757d;
  font-size: 1rem;
  max-width: 700px;
}

.view-all-link {
  color: #ffc107;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
}

.view-all-link:hover {
  text-decoration: underline;
}

.featured-card {
  border-radius: 10px;
  /*border: .5px, solid, #6c757d;*/
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 1rem 2rem rgba(0, 62, 134, 0.08);
}

.profile-photo-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ffffff;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-name {
  color: #003e86;
  font-weight: 600;
  font-size: 1rem;
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
  color: #003e86;
  font-size: 1rem;
  font-weight: 500;

}

.availability-badge {
  display: inline-block;
  padding: 0.1rem 0.4rem;
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
  /*border-top: 1px solid rgba(0, 62, 134, 0.08);*/
  padding-top: .9rem;
}

.rating-value {
  color: #003e86;
  font-weight: 600;
  font-size: 1rem;
}

.review-count {
  color: #6c757d;
  font-size: 0.9rem;
  padding-left: 4px;
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