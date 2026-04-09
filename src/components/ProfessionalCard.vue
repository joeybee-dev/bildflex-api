<template>
  <router-link
    :to="getProtectedRoute(detailsRouteName, professional._id)"
    class="text-decoration-none"
  >
    <div :class="['card shadow-sm h-100', cardClass]">
      <div class="card-body p-3">
        <div class="top-section d-flex align-items-start mb-2">
          <div class="profile-photo-wrapper flex-shrink-0 me-4">
            <img
              :src="getProfilePhoto(professional)"
              :alt="displayName"
              class="profile-photo"
            />
          </div>

          <div class="top-details text-start">
            <div class="ratings-box mb-1">
              <div class="rating-value">
                ⭐ {{ formatRating(professional.averageRatings) }}
              </div>
              <div class="review-count">
                {{ professional.totalReviews || 0 }} reviews
              </div>
              <div>
                <span
                  class="availability-badge"
                  :class="getAvailabilityClass(professional.availabilityStatus)"
                >
                  {{ professional.availabilityStatus || "Not specified" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom-section text-start">
          <h5 class="card-name mb-0">
            {{ displayName }}
          </h5>

          <div class="skills-wrapper mb-0">
            <p class="skills-text mb-0">
              {{ formatSkills(displaySkills) }}
            </p>
          </div>

          <p class="city-text mb-2">
            {{ professional.city || "Location not available" }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import "@/assets/professional-card-shared.css";
import useFeaturedCardRoute from "@/composables/useFeaturedCardRoute";

const props = defineProps({
  professional: {
    type: Object,
    required: true
  },
  detailsRouteName: {
    type: String,
    required: true
  },
   fallbackMalePhoto: {
    type: String,
    default: "/default-male.jpg"
  },
  fallbackFemalePhoto: {
    type: String,
    default: "/default-female.jpg"
  },
  cardClass: {
    type: String,
    default: "active-card"
  },
  nameKey: {
    type: String,
    default: "firstName"
  },
  skillsKey: {
    type: String,
    default: "skills"
  },
  emptyName: {
    type: String,
    default: "Unnamed Professional"
  },
  emptySkills: {
    type: String,
    default: "No skills listed"
  }
});

const { getProtectedRoute } = useFeaturedCardRoute();

const displayName = computed(() => {
  return props.professional?.[props.nameKey] || props.emptyName;
});

const displaySkills = computed(() => {
  return props.professional?.[props.skillsKey];
});

const getProfilePhoto = (professional) => {
  if (professional?.profilePhoto) return professional.profilePhoto;

  const gender = String(professional?.gender || "").toLowerCase();

  if (gender === "female") return props.fallbackFemalePhoto;
  return props.fallbackMalePhoto;
};

const formatSkills = (skills) => {
  if (!skills) return props.emptySkills;

  if (Array.isArray(skills)) {
    return skills.length ? skills.join(", ") : props.emptySkills;
  }

  return String(skills).trim() || props.emptySkills;
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
</script>

<style scoped>
</style>