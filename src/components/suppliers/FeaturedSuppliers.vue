<template>
  <div class="featured-professionals-page">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="section-title mb-1">Suppliers</h3>

      <router-link to="/suppliers" class="view-all-link">
        View All
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="text-muted mt-3 mb-0">Loading featured suppliers...</p>
    </div>

    <div
      v-else-if="featuredSuppliers.length === 0"
      class="empty-state text-center py-5"
    >
      <h4 class="mb-2">No featured suppliers found</h4>
      <p class="text-muted mb-0">
        Please check back later for updated featured professionals.
      </p>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="supplier in featuredSuppliers.slice(0, 4)"
        :key="supplier._id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <router-link
          :to="getProtectedRoute('details-supplier', supplier._id)"
          class="text-decoration-none"
        >
          <div class="card featured-card shadow-sm h-100">
            <div class="card-body p-3">
              <div class="top-section d-flex align-items-start mb-2">
                <div class="profile-photo-wrapper flex-shrink-0 me-4">
                  <img
                    :src="getProfilePhoto(supplier)"
                    :alt="supplier.firstName"
                    class="profile-photo"
                  />
                </div>

                <div class="top-details text-start">
                  <div class="ratings-box mb-1">
                    <div class="rating-value">
                      ⭐ {{ formatRating(supplier.averageRatings) }}
                    </div>
                    <div class="review-count">
                      {{ supplier.totalReviews || 0 }} reviews
                    </div>
                    <div>
                      <span
                        class="availability-badge"
                        :class="getAvailabilityClass(supplier.availabilityStatus)"
                      >
                        {{ supplier.availabilityStatus || "Not specified" }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bottom-section text-start">
                <h5 class="card-name mb-0">
                  {{ supplier.firstName }}
                </h5>
                <div class="skills-wrapper mb-0">
                  <p class="skills-text mb-0">
                    {{ formatSkills(supplier.productsOffered || supplier.servicesOffered) }}
                  </p>
                </div>

                <p class="city-text mb-2">
                  {{ supplier.city || "Location not available" }}
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
const featuredSuppliers = ref([]);

const getProfilePhoto = (supplier) => {
  if (supplier.profilePhoto) return supplier.profilePhoto;
  if (supplier.gender === "Female") return "/default-supplier.png";
  return "/default-supplier.png";
};

const formatSkills = (skills) => {
  if (!skills) return "No products listed";

  if (Array.isArray(skills)) {
    return skills.length ? skills.join(", ") : "No products listed";
  }

  return String(skills).trim() || "No products listed";
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

const fetchFeaturedSuppliers = async () => {
  try {
    loading.value = true;

    const response = await api.get("/suppliers/featured");
    const data =
      response.data?.suppliers ||
      response.data?.featuredSuppliers ||
      response.data ||
      [];

    featuredSuppliers.value = Array.isArray(data)
      ? data.filter((item) => item.isFeatured === true)
      : [];
  } catch (error) {
    console.error("Fetch featured suppliers error:", error);
    notyf.error(
      error.response?.data?.error || "Failed to load featured suppliers."
    );
  } finally {
    loading.value = false;
  }
};

onMounted(fetchFeaturedSuppliers);
</script>

<style scoped></style>