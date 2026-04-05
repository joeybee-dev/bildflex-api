<template>
  <div class="search-page py-5">
    <div class="container">
      <div class="search-hero text-center mb-4">
        <h1 class="page-title mb-2">Search Results</h1>
        <p class="page-subtitle mb-0">
          Find trusted handymen, designers, contractors, and suppliers near you.
        </p>
      </div>

      <div class="card search-card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <div class="row g-3 align-items-end">
            <div class="col-12 col-lg-4">
              <label class="form-label">Service or Keyword</label>
              <input
                v-model.trim="filters.service"
                type="text"
                class="form-control"
                placeholder="What service are you looking for?"
              />
            </div>

            <div class="col-12 col-lg-3">
              <label class="form-label">Location</label>
              <input
                v-model.trim="filters.location"
                type="text"
                class="form-control"
                placeholder="City or province"
              />
            </div>

            <div class="col-12 col-lg-3">
              <label class="form-label">Category</label>
              <select v-model="filters.category" class="form-select">
                <option value="">All Categories</option>
                <option value="handymen">Handymen</option>
                <option value="designers">Designers</option>
                <option value="contractors">Contractors</option>
                <option value="suppliers">Suppliers</option>
              </select>
            </div>

            <div class="col-12 col-lg-2">
              <button class="btn search-btn w-100" @click="handleSearch">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="search-summary d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h2 class="result-title mb-1">Results</h2>
          <p class="result-subtitle mb-0">
            {{ totalResults }} result<span v-if="totalResults !== 1">s</span> found
          </p>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-warning" role="status"></div>
        <p class="text-muted mt-3 mb-0">Searching providers...</p>
      </div>

      <div v-else-if="totalResults === 0" class="empty-state text-center py-5">
        <h4 class="mb-2">No results found</h4>
        <p class="text-muted mb-0">
          Try a different keyword, location, or category.
        </p>
      </div>

      <template v-else>
        <div v-if="showSection('handymen')" class="result-section mb-5">
          <div class="section-header mb-3">
            <h3 class="section-title mb-1">Handymen</h3>
            <p class="section-subtitle mb-0">Repair, maintenance, and installation professionals</p>
          </div>

          <div class="row g-4">
            <div
              v-for="item in filteredHandymen"
              :key="item._id"
              class="col-12 col-sm-6 col-lg-3"
            >
              <router-link :to="`/handymen/${item._id}`" class="text-decoration-none">
                <div class="card result-card border-0 shadow-sm h-100">
                  <div class="card-body p-4 text-center">
                    <div class="profile-photo-wrapper mx-auto mb-3">
                      <img
                        :src="getProfilePhoto(item)"
                        :alt="item.firstName || 'Handyman'"
                        class="profile-photo"
                      />
                    </div>

                    <h5 class="card-title mb-1">{{ item.firstName || "Unnamed Handyman" }}</h5>
                    <p class="city-text mb-2">{{ item.city || "Location not available" }}</p>

                    <div class="mb-3">
                      <span
                        class="availability-badge"
                        :class="getAvailabilityClass(item.availabilityStatus)"
                      >
                        {{ item.availabilityStatus || "Not specified" }}
                      </span>
                    </div>

                    <p class="skills-text mb-3">{{ formatSkills(item.skills) }}</p>

                    <div class="ratings-box">
                      <div class="rating-value">⭐ {{ formatRating(item.averageRatings) }}</div>
                      <div class="review-count">{{ item.totalReviews || 0 }} reviews</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="showSection('designers')" class="result-section mb-5">
          <div class="section-header mb-3">
            <h3 class="section-title mb-1">Designers</h3>
            <p class="section-subtitle mb-0">Planning, drafting, and design professionals</p>
          </div>

          <div class="row g-4">
            <div
              v-for="item in filteredDesigners"
              :key="item._id"
              class="col-12 col-sm-6 col-lg-3"
            >
              <router-link :to="`/designers/${item._id}`" class="text-decoration-none">
                <div class="card result-card border-0 shadow-sm h-100">
                  <div class="card-body p-4 text-center">
                    <div class="profile-photo-wrapper mx-auto mb-3">
                      <img
                        :src="getProfilePhoto(item)"
                        :alt="item.firstName || 'Designer'"
                        class="profile-photo"
                      />
                    </div>

                    <h5 class="card-title mb-1">{{ item.firstName || "Unnamed Designer" }}</h5>
                    <p class="city-text mb-2">{{ item.city || "Location not available" }}</p>

                    <div class="mb-3">
                      <span
                        class="availability-badge"
                        :class="getAvailabilityClass(item.availabilityStatus)"
                      >
                        {{ item.availabilityStatus || "Not specified" }}
                      </span>
                    </div>

                    <p class="skills-text mb-3">{{ formatSkills(item.skills) }}</p>

                    <div class="ratings-box">
                      <div class="rating-value">⭐ {{ formatRating(item.averageRatings) }}</div>
                      <div class="review-count">{{ item.totalReviews || 0 }} reviews</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="showSection('contractors')" class="result-section mb-5">
          <div class="section-header mb-3">
            <h3 class="section-title mb-1">Contractors</h3>
            <p class="section-subtitle mb-0">Construction and project execution professionals</p>
          </div>

          <div class="row g-4">
            <div
              v-for="item in filteredContractors"
              :key="item._id"
              class="col-12 col-sm-6 col-lg-3"
            >
              <router-link :to="`/contractors/${item._id}`" class="text-decoration-none">
                <div class="card result-card border-0 shadow-sm h-100">
                  <div class="card-body p-4 text-center">
                    <div class="profile-photo-wrapper mx-auto mb-3">
                      <img
                        :src="getProfilePhoto(item)"
                        :alt="item.firstName || 'Contractor'"
                        class="profile-photo"
                      />
                    </div>

                    <h5 class="card-title mb-1">{{ item.firstName || "Unnamed Contractor" }}</h5>
                    <p class="city-text mb-2">{{ item.city || "Location not available" }}</p>

                    <div class="mb-3">
                      <span
                        class="availability-badge"
                        :class="getAvailabilityClass(item.availabilityStatus)"
                      >
                        {{ item.availabilityStatus || "Not specified" }}
                      </span>
                    </div>

                    <p class="skills-text mb-3">{{ formatSkills(item.skills) }}</p>

                    <div class="ratings-box">
                      <div class="rating-value">⭐ {{ formatRating(item.averageRatings) }}</div>
                      <div class="review-count">{{ item.totalReviews || 0 }} reviews</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="showSection('suppliers')" class="result-section">
          <div class="section-header mb-3">
            <h3 class="section-title mb-1">Suppliers</h3>
            <p class="section-subtitle mb-0">Materials, equipment, and supply providers</p>
          </div>

          <div class="row g-4">
            <div
              v-for="item in filteredSuppliers"
              :key="item._id"
              class="col-12 col-sm-6 col-lg-3"
            >
              <router-link :to="`/suppliers/${item._id}`" class="text-decoration-none">
                <div class="card result-card border-0 shadow-sm h-100">
                  <div class="card-body p-4 text-center">
                    <div class="profile-photo-wrapper mx-auto mb-3">
                      <img
                        :src="getProfilePhoto(item)"
                        :alt="item.firstName || 'Supplier'"
                        class="profile-photo"
                      />
                    </div>

                    <h5 class="card-title mb-1">{{ item.firstName || "Unnamed Supplier" }}</h5>
                    <p class="city-text mb-2">{{ item.city || "Location not available" }}</p>

                    <div class="mb-3">
                      <span
                        class="availability-badge"
                        :class="getAvailabilityClass(item.availabilityStatus)"
                      >
                        {{ item.availabilityStatus || "Not specified" }}
                      </span>
                    </div>

                    <p class="skills-text mb-3">{{ formatSkills(item.skills) }}</p>

                    <div class="ratings-box">
                      <div class="rating-value">⭐ {{ formatRating(item.averageRatings) }}</div>
                      <div class="review-count">{{ item.totalReviews || 0 }} reviews</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();
const notyf = new Notyf();

const loading = ref(false);

const filters = reactive({
  service: "",
  location: "",
  category: ""
});

const handymen = ref([]);
const designers = ref([]);
const contractors = ref([]);
const suppliers = ref([]);

const getProfilePhoto = (item) => {
  if (item.profilePhoto) return item.profilePhoto;
  if (item.gender === "Female") return "/src/assets/images/default-female.jpg";
  return "/src/assets/images/default-male.jpg";
};

const formatSkills = (skills) => {
  if (!skills) return "No skills listed";
  if (Array.isArray(skills)) return skills.length ? skills.join(", ") : "No skills listed";
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

const normalize = (value) => String(value || "").toLowerCase().trim();

const matchesSearch = (item) => {
  const service = normalize(filters.service);
  const location = normalize(filters.location);

  const searchableSkills = Array.isArray(item.skills)
    ? item.skills.join(" ").toLowerCase()
    : normalize(item.skills);

  const searchableText = [
    item.firstName,
    item.city,
    item.availabilityStatus,
    searchableSkills
  ]
    .join(" ")
    .toLowerCase();

  const locationText = [item.city, item.province, item.country]
    .join(" ")
    .toLowerCase();

  const serviceMatch = !service || searchableText.includes(service);
  const locationMatch = !location || locationText.includes(location);

  return serviceMatch && locationMatch;
};

const filteredHandymen = computed(() => handymen.value.filter(matchesSearch));
const filteredDesigners = computed(() => designers.value.filter(matchesSearch));
const filteredContractors = computed(() => contractors.value.filter(matchesSearch));
const filteredSuppliers = computed(() => suppliers.value.filter(matchesSearch));

const totalResults = computed(() => {
  if (filters.category === "handymen") return filteredHandymen.value.length;
  if (filters.category === "designers") return filteredDesigners.value.length;
  if (filters.category === "contractors") return filteredContractors.value.length;
  if (filters.category === "suppliers") return filteredSuppliers.value.length;

  return (
    filteredHandymen.value.length +
    filteredDesigners.value.length +
    filteredContractors.value.length +
    filteredSuppliers.value.length
  );
});

const showSection = (category) => {
  return !filters.category || filters.category === category;
};

const syncFiltersFromQuery = () => {
  filters.service = route.query.service || "";
  filters.location = route.query.location || "";
  filters.category = route.query.category || "";
};

const handleSearch = () => {
  router.push({
    path: "/search",
    query: {
      service: filters.service || undefined,
      location: filters.location || undefined,
      category: filters.category || undefined
    }
  });
};

const fetchPublicProviders = async () => {
  try {
    loading.value = true;

    const results = await Promise.allSettled([
      api.get("/handymen/active"),
      api.get("/designers/active"),
      api.get("/contractors/active"),
      api.get("/suppliers/active")
    ]);

    handymen.value =
      results[0].status === "fulfilled"
        ? results[0].value.data?.handymen || results[0].value.data || []
        : [];

    designers.value =
      results[1].status === "fulfilled"
        ? results[1].value.data?.designers || results[1].value.data || []
        : [];

    contractors.value =
      results[2].status === "fulfilled"
        ? results[2].value.data?.contractors || results[2].value.data || []
        : [];

    suppliers.value =
      results[3].status === "fulfilled"
        ? results[3].value.data?.suppliers || results[3].value.data || []
        : [];
  } catch (error) {
    console.error("Fetch search providers error:", error);
    notyf.error("Failed to load search results.");
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.query,
  () => {
    syncFiltersFromQuery();
  },
  { immediate: true }
);

onMounted(fetchPublicProviders);
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background-color: #f4f6f8;
}

.search-hero {
  margin-bottom: 2rem;
}

.page-title {
  color: #003e86;
  font-weight: 800;
  font-size: 2rem;
}

.page-subtitle {
  color: #6c757d;
  font-size: 1rem;
}

.search-card {
  border-radius: 20px;
  background-color: #ffffff;
}

.form-label {
  color: #003e86;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.form-control,
.form-select {
  min-height: 50px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
  color: #003e86;
}

.form-control:focus,
.form-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}

.search-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
}

.search-btn:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.result-title {
  color: #003e86;
  font-weight: 800;
  font-size: 1.6rem;
}

.result-subtitle,
.section-subtitle {
  color: #6c757d;
}

.section-title {
  color: #003e86;
  font-weight: 800;
}

.result-card {
  border-radius: 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.result-card:hover {
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

.city-text,
.skills-text,
.review-count {
  color: #6c757d;
}

.skills-text {
  min-height: 48px;
  line-height: 1.5;
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
}

.empty-state {
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 62, 134, 0.08);
}

@media (max-width: 767.98px) {
  .page-title {
    font-size: 1.6rem;
  }

  .result-title {
    font-size: 1.35rem;
  }
}
</style>