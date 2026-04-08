<template>
  <div class="auth-page py-4">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-start">
          <h2 class="auth-title mb-0">Handyman Profile</h2>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning" role="status"></div>
        </div>

        <div v-else class="row g-0 gy-4 align-items-start">
          <!-- Left Side -->
          <div class="left-column col-12 col-lg-4">
            <div class="profile-side-card h-100">
              <div class="d-flex align-items-center justify-content-center gap-4 mb-4">
                <div class="profile-photo-wrapper flex-shrink-0 mt-2">
                  <img
                    :src="handyman.profilePhoto || fallbackImage"
                    class="profile-image-lg"
                    alt="Handyman"
                  />
                </div>

                <div class="text-start">
                  <div class="rating-value">
                    ⭐ {{ formatRating(handyman.averageRatings) }}
                  </div>

                  <div class="review-count mb-2">
                    {{ handyman.totalReviews || 0 }} reviews
                  </div>

                  <div class="handyman-fullname mb-2">
                    {{ handyman.firstName || "" }} {{ handyman.lastName || "" }}
                  </div>

                  <span
                    class="availability-badge"
                    :class="getAvailabilityClass(handyman.availabilityStatus)"
                  >
                    {{ handyman.availabilityStatus || "Not specified" }}
                  </span>
                </div>
              </div>

              <div class="d-grid mb-4">
                <button class="btn contact-btn">Message</button>
              </div>

              <div class="skills-text mb-1">
                {{ formatSkills(handyman.skills) }}
              </div>

              <div class="handyman-city mb-3">
                {{ handyman.city || "-" }}
              </div>

              <label class="label-services">My Services</label>

              <p class="services-text mb-0">
                {{ limitWords(handyman.aboutMe || handyman.aboutBusiness || "-", 70) }}
              </p>
            </div>
          </div>

          <!-- Right Side -->
          <div class="right-column col-12 col-lg-8">
            <div class="work-side-card h-100">
              <div
                v-if="handyman.workPhotos && handyman.workPhotos.length"
                id="workPhotosCarousel"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner rounded-4 overflow-hidden">
                  <div
                    v-for="(photo, index) in handyman.workPhotos"
                    :key="index"
                    class="carousel-item"
                    :class="{ active: index === 0 }"
                  >
                    <img
                      :src="photo"
                      class="d-block w-100 work-photo"
                      alt="Work Photo"
                    />
                  </div>
                </div>

                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#workPhotosCarousel"
                  data-bs-slide="prev"
                >
                  <span class="carousel-control-prev-icon"></span>
                </button>

                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#workPhotosCarousel"
                  data-bs-slide="next"
                >
                  <span class="carousel-control-next-icon"></span>
                </button>
              </div>

              <div v-else class="empty-work-photos text-center py-5">
                <p class="mb-0 text-muted">No work photos available</p>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const route = useRoute();
const notyf = new Notyf();
const loading = ref(false);
const fallbackImage = "/default-handyman-male.png";
const handyman = reactive({});

const fetchHandyman = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/handymen/${route.params.id}`);
    Object.assign(handyman, response.data?.handyman || response.data || {});
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load handyman details.");
  } finally {
    loading.value = false;
  }
};

const limitWords = (text, maxWords = 70) => {
  const value = String(text || "").trim();
  if (!value) return "-";

  const words = value.split(/\s+/);
  if (words.length <= maxWords) return value;

  return words.slice(0, maxWords).join(" ") + "...";
};

const formatRating = (rating) => {
  const parsed = Number(rating);
  return Number.isNaN(parsed) ? "0.0" : parsed.toFixed(1);
};

const formatSkills = (skills) => {
  if (!skills) return "No skills listed";
  if (Array.isArray(skills)) return skills.length ? skills.join(", ") : "No skills listed";
  return String(skills).trim() || "No skills listed";
};

const getAvailabilityClass = (status) => {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("available")) return "available";
  if (normalized.includes("busy")) return "busy";
  if (normalized.includes("offline")) return "offline";
  return "default";
};

onMounted(fetchHandyman);
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-color: #f4f6f8;
}

.auth-card {
  border-radius: 15px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.auth-header {
  border-bottom: 2px solid #ffc107;
  padding: 1.5rem;
}

.auth-title {
  color: #003e86;
  font-weight: 700;
  font-size: 1.3rem;
}

.profile-side-card,
.work-side-card {
  background: #fff;
  padding: 1.25rem;
}

.profile-side-card {
  position: sticky;
  top: 1rem;
}

.profile-image-lg {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #fff;
  background: #fff;
}

.availability-badge {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  border-radius: 5px;
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

.rating-value {
  color: #003e86;
  font-weight: 700;
  font-size: 1rem;
}

.review-count {
  color: #6c757d;
  font-size: 0.92rem;
  padding-left: 4px;
}

.contact-btn {
  min-height: 46px;
  border-radius: 10px;
  font-weight: 700;
  background-color: #003e86;
  color: #fff;
  border: 1px solid #003e86;
}

.contact-btn:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.label-services {
  font-size: .9rem;
  font-weight: 600;
  color: #003e86;
  margin-bottom: 0.2rem;
}

.handyman-fullname {
  color: #495057;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  padding-left: 4px;
}

.skills-text {
  color: #003e86;
  font-size: 1rem;
  font-weight: 700;
}

.handyman-city,
.services-text {
  color: #495057;
  font-size: 0.85rem;
  line-height: 1.6;
}

.work-photo {
  width: 100%;
  height: 520px;
  object-fit: cover;
  background: #f4f6f8;
}

.empty-work-photos {
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(0, 62, 134, 0.15);
  border-radius: 10px;
  background: #f8f9fa;
}

@media (max-width: 991.98px) {
  .work-photo,
  .empty-work-photos {
    height: 320px;
    min-height: 320px;
  }
}
</style>