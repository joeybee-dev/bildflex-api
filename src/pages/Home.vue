<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero-section d-flex align-items-center">
      <div class="hero-overlay"></div>

      <div class="container position-relative hero-content">
        <div class="row align-items-center min-vh-100">
          <div class="col-12 col-lg-7 text-center text-lg-start">
            <p class="hero-label mb-3">Trusted Construction Network</p>

            <h1 class="hero-title mb-3">
              Find construction experts near you
            </h1>

            <p class="hero-text mb-4">
              Connect with reliable engineers, architects, and construction
              specialists for residential, commercial, and industrial projects.
            </p>

            <div class="search-box p-2 p-md-3 mb-4">
              <div class="row g-2 align-items-center">
                <div class="col-12 col-md-5">
                  <input
                    v-model="searchKeyword"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Search profession"
                  />
                </div>

                <div class="col-12 col-md-5">
                  <input
                    v-model="searchLocation"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Enter city or province"
                  />
                </div>

                <div class="col-12 col-md-2">
                  <button
                    class="btn btn-primary btn-lg w-100"
                    @click="goToProfessionals"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div
              class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start"
            >
              <router-link to="/professionals" class="btn btn-primary btn-lg px-4">
                Browse Professionals
              </router-link>

              <router-link
                to="/register-professional"
                class="btn btn-outline-light btn-lg px-4"
              >
                Join as Professional
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROFESSIONALS -->
    <section class="featured-section py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Featured Professionals</h2>
          <p class="section-text">
            Explore skilled professionals ready to support your next project.
          </p>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary mb-3" role="status"></div>
          <p class="mb-0">Loading featured professionals...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger text-center">
          {{ error }}
        </div>

        <div v-else-if="featuredProfessionals.length === 0" class="text-center text-muted py-4">
          No professionals found.
        </div>

        <div v-else class="row g-4">
          <div
            v-for="professional in featuredProfessionals"
            :key="professional._id"
            class="col-12 col-md-6 col-lg-4"
          >
            <router-link
              :to="`/professionals/${professional._id}`"
              class="text-decoration-none text-dark"
            >
              <div class="card professional-card h-100 border-0 shadow-sm">
                <img
                  :src="getProfileImage(professional)"
                  :alt="`${professional.firstName} ${professional.lastName}`"
                  class="card-img-top"
                  style="height: 240px; object-fit: cover;"
                />

                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title mb-0">
                      {{ professional.title }} {{ professional.firstName }} {{ professional.lastName }}
                    </h5>

                    <span
                      v-if="professional.isPremium"
                      class="badge bg-warning text-dark"
                    >
                      Premium
                    </span>
                  </div>

                  <p class="text-primary fw-semibold mb-2">
                    {{ professional.profession }}
                  </p>

                  <p class="text-muted mb-2">
                    <i class="bi bi-geo-alt-fill me-1"></i>
                    {{ professional.location }}, {{ professional.country }}
                  </p>

                  <p class="card-text">
                    {{ professional.pitch || "No pitch provided." }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="text-center mt-5">
          <router-link to="/professionals" class="btn btn-dark btn-lg px-4">
            View All Professionals
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const searchKeyword = ref("");
const searchLocation = ref("");

const featuredProfessionals = ref([]);
const loading = ref(true);
const error = ref("");

const fallbackImage = "https://via.placeholder.com/500x400?text=No+Image";

const getProfileImage = (profile) => {
  if (profile.profileIcon) return profile.profileIcon;

  if (
    profile.portfolioImages &&
    profile.portfolioImages.length > 0 &&
    profile.portfolioImages[0].imageUrl
  ) {
    return profile.portfolioImages[0].imageUrl;
  }

  return fallbackImage;
};

const fetchFeaturedProfessionals = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await axios.get("http://localhost:4000/professionals/profess");

    featuredProfessionals.value = (response.data.profiles || []).slice(0, 3);
  } catch (err) {
    console.error("Error fetching featured professionals:", err);
    error.value =
      err.response?.data?.error || "Failed to load featured professionals.";
  } finally {
    loading.value = false;
  }
};

const goToProfessionals = () => {
  router.push({
    path: "/professionals",
    query: {
      profession: searchKeyword.value,
      location: searchLocation.value
    }
  });
};

onMounted(() => {
  fetchFeaturedProfessionals();
});
</script>

<style scoped>
.home-page {
  background: #f8f9fa;
}

.hero-section {
  position: relative;
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1504307651254-35680f356dfd");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 15, 25, 0.68);
}

.hero-content {
  z-index: 2;
}

.hero-label {
  display: inline-block;
  font-size: 0.95rem;
  font-weight: 700;
  color: #93c5fd;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
}

.hero-text {
  font-size: 1.08rem;
  color: #e5e7eb;
  max-width: 620px;
}

.search-box {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  max-width: 860px;
}

.featured-section {
  background: #f8f9fa;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #212529;
}

.section-text {
  color: #6c757d;
  max-width: 620px;
  margin: 0 auto;
}

.professional-card {
  border-radius: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.professional-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.14);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.card-text {
  color: #555;
}

@media (max-width: 991px) {
  .hero-title {
    font-size: 2.3rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 1.9rem;
  }

  .search-box {
    border-radius: 14px;
  }
}
</style>