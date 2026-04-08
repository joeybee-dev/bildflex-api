<template>
  <router-link
    :to="`/designers/${designer._id}`"
    class="text-decoration-none"
  >
    <div class="card featured-card shadow-sm h-100">
      <div class="card-body p-3">
        <!-- Top Part -->
        <div class="top-section d-flex align-items-start mb-2">
          <div class="profile-photo-wrapper flex-shrink-0 me-4">
            <img
              :src="getProfilePhoto(designer)"
              :alt="designer.firstName || 'Designer'"
              class="profile-photo"
            />
          </div>

          <div class="top-details text-start">
            <div class="ratings-box mb-1">
              <div class="rating-value">
                ⭐ {{ formatRating(designer.averageRatings) }}
              </div>
              <div class="review-count">
                {{ designer.totalReviews || 0 }} reviews
              </div>
              <div>
                <span
                  class="availability-badge"
                  :class="getAvailabilityClass(designer.availabilityStatus)"
                >
                  {{ designer.availabilityStatus || "Not specified" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Part -->
        <div class="bottom-section text-start">
          <h5 class="card-name mb-0">
            {{ designer.firstName || "Unnamed Designer" }}
          </h5>

          <div class="skills-wrapper mb-0">
            <p class="skills-text mb-0">
              {{ formatSkills(designer.skills) }}
            </p>
          </div>

          <p class="city-text mb-2">
            {{ designer.city || "Location not available" }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  designer: {
    type: Object,
    required: true
  }
});

const getProfilePhoto = (designer) => {
  if (designer.profilePhoto) return designer.profilePhoto;
  if (designer.gender === "Female") return "/src/assets/images/default-female.jpg";
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
</script>

<style scoped>
.featured-card {
  border-radius: 10px;
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
  padding-top: 0.9rem;
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
</style>