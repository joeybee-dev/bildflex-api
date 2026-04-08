<template>
  <div id="top" class="home-page">
    <section class="hero-section d-flex align-items-center">
      <div class="hero-overlay"></div>

      <div class="container position-relative hero-content">
        <div class="row justify-content-center text-center">
          <div class="col-12 col-lg-10">
            <p class="hero-label mb-2">TRUSTED CONSTRUCTION NETWORK</p>
            <h1 class="hero-title mb-3">Find construction experts near you</h1>
            <p class="hero-subtitle mx-auto mb-4">
              Connect with trusted architects, engineers, handymen, contractors, and suppliers for your projects.
            </p>

            <div class="search-wrapper shadow-lg">
              <div class="row g-2">
                <div class="col-12 col-md-5">
                  <input
                    v-model="search.service"
                    type="text"
                    class="form-control search-input"
                    placeholder="What services are you looking for?"
                  />
                </div>

                <div class="col-12 col-md-4">
                  <input
                    v-model="search.location"
                    type="text"
                    class="form-control search-input"
                    placeholder="Enter city or province..."
                  />
                </div>

                <div class="col-12 col-md-3">
                  <button class="btn w-100 search-btn" @click="handleSearch">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div
              class="join-provider-wrapper mt-5"
              role="button"
              tabindex="0"
              @click="goToJoinPage"
              @keydown.enter.prevent="goToJoinPage"
              @keydown.space.prevent="goToJoinPage"
            >
              <span class="join-provider-link">
                Join as Service Provider for FREE now!
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>

<!-- PROVIDERS SELECTION -->
    <section class="services-section py-5">
      <div class="container">
        <div class="text-start mb-4">
          <h2 class="section-title">Explore Services</h2>
          <p class="section-subtitle">
            Find the right expert for your project needs
          </p>
        </div>

        
        <div class="row g-4">

          <!-- Handymen -->
          <div class="col-12 col-sm-6 col-lg-3">
            <router-link to="/handymen" class="text-decoration-none">
              <div class="card border-0 shadow-sm h-100 highlight-card text-center clickable-card">
                <div class="card-body p-4">
                  <div class="icon-circle mx-auto mb-3">
                    <span class="material-symbols-outlined">construction</span>
                  </div>
                  <h5 class="service-card-title fw-bold mb-2">Handymen</h5>
                  <p class="service-card-text mb-0">
                    Skilled repair and maintenance professionals for home and site work.
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Designers -->
          <div class="col-12 col-sm-6 col-lg-3">
            <router-link to="/designers" class="text-decoration-none">
              <div class="card border-0 shadow-sm h-100 highlight-card text-center clickable-card">
                <div class="card-body p-4">
                  <div class="icon-circle mx-auto mb-3">
                    <span class="material-symbols-outlined">draw</span>
                  </div>
                  <h5 class="service-card-title fw-bold mb-2">Designers</h5>
                  <p class="service-card-text mb-0">
                    Expert architects and engineers delivering creative plans, layouts, and design concepts.
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Contractors -->
          <div class="col-12 col-sm-6 col-lg-3">
            <router-link to="/contractors" class="text-decoration-none">
              <div class="card border-0 shadow-sm h-100 highlight-card text-center clickable-card">
                <div class="card-body p-4">
                  <div class="icon-circle mx-auto mb-3">
                    <span class="material-symbols-outlined">engineering</span>
                  </div>
                  <h5 class="service-card-title fw-bold mb-2">Contractors</h5>
                  <p class="service-card-text mb-0">
                    Trusted builders for residential, commercial, and industrial projects.
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Suppliers -->
          <div class="col-12 col-sm-6 col-lg-3">
            <router-link to="/suppliers" class="text-decoration-none">
              <div class="card border-0 shadow-sm h-100 highlight-card text-center clickable-card">
                <div class="card-body p-4">
                  <div class="icon-circle mx-auto mb-3">
                    <span class="material-symbols-outlined">inventory_2</span>
                  </div>
                  <h5 class="service-card-title fw-bold mb-2">Suppliers</h5>
                  <p class="service-card-text mb-0">
                    Reliable sources for materials, equipment, and construction supplies.
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>

      </div>
    </section>

<!-- FEATURED PROVIDERS -->
    <section class="featured-section py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h2 class="section-title mb-1">Featured Providers</h2>
            <p class="section-subtitle mb-0">
              Explore trusted handymen, architects, engineers, contractors, and suppliers for your project needs.
            </p>
          </div>
        </div>

        <div class="featured-group mb-4">
          <FeaturedHandymen />
        </div>

        <div class="featured-group mb-4">
          <FeaturedDesigners />
        </div>

        <div class="featured-group mb-4">
          <FeaturedContractors />
        </div>

        <div class="featured-group mb-4">
          <FeaturedSuppliers />
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import FeaturedHandymen from "@/components/handymen/FeaturedHandymen.vue"
import FeaturedDesigners from "@/components/designers/FeaturedDesigners.vue"
import FeaturedContractors from "@/components/contractors/FeaturedContractors.vue"
import FeaturedSuppliers from "@/components/suppliers/FeaturedSuppliers.vue"

const router = useRouter();

const search = reactive({
  service: "",
  location: ""
});



const handleSearch = () => {
  router.push({
    path: "/search",
    query: {
      service: search.service,
      location: search.location
    }
  });
};

const goToJoinPage = () => {
  router.push("/join-bildflex");
};

</script>

<style scoped>
.home-page {
  background-color: #f4f6f8;
}

.hero-section {
  min-height: 92vh;
  position: relative;
  background-image: url("@/assets/images/background-img.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(0, 62, 134, 0.5), rgba(0, 62, 134, 0.6)),
    rgba(0, 0, 0, 0.1);
}

.hero-content {
  z-index: 2;
}

.hero-label {
  color: #ffc107;
  font-weight: 700;
  letter-spacing: 1.5px;
  font-size: 0.9rem;
}

.hero-title {
  color: #ffffff;
  font-size: 2.3rem;
  font-weight: 800;
  line-height: 1.2;
}

.hero-subtitle {
  color: #f4f6f8;
  max-width: 760px;
  font-size: 1.05rem;
}

.search-wrapper {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 193, 7, 0.35);
  border-radius: 18px;
  padding: 0.75rem;
  max-width: 980px;
  margin: 0 auto;
}

.search-input {
  min-height: 54px;
  border-radius: 10px;
  border: 1px solid #ffc107;
  background-color: #ffffff;
  color: #003e86;
}

.search-input:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.2);
}

.search-btn {
  min-height: 54px;
  border-radius: 10px;
  font-weight: 700;
  background-color: #ffc107;
  color: #003e86;
  border: 2px solid #ffc107;
  transition: all 0.25s ease;
}

.search-btn:hover {
  background-color: #ffffff;
  color: #003e86;
  border-color: #ffc107;
}

.join-provider-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.85rem 1.4rem;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  background-color: rgba(255, 193, 7, 0.08);
}

.join-provider-wrapper:hover {
  background-color: #ffc107;
  transform: translateY(-2px);
}

.join-provider-wrapper:hover .join-provider-link {
  color: #003e86;
  border-bottom-color: #003e86;
}

.join-provider-link {
  display: inline-block;
  color: #ffc107;
  font-weight: 700;
  padding-bottom: 1px;
  transition: all 0.25s ease;
}

.services-section {
  background-color: #f4f6f8;
}

.featured-section {
  background-color: #ffffff;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #003e86;
}

.section-subtitle {
  font-size: .85rem;
  color: #6c757d;
}

.highlight-card,
.expert-card {
  border-radius: 18px;
  border: 1px solid rgba(0, 62, 134, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.highlight-card:hover,
.expert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 1rem 2rem rgba(0, 62, 134, 0.08);
}

.service-card-title {
  color: #003e86;
}

.service-card-text,
.expert-description {
  color: #6c757d;
}

.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #003e86;
  color: #ffc107;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffc107;
}

.icon-circle .material-symbols-outlined {
  font-size: 32px;
}

.view-all-btn {
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.25s ease;
  background-color: transparent;
  color: #003e86;
  border: 1px solid #ffc107;
}

.view-all-btn:hover {
  background-color: #ffc107;
  color: #003e86;
}

.expert-image {
  height: 220px;
  object-fit: cover;
}

.expert-badge {
  background-color: #ffc107;
  color: #003e86;
  font-weight: 700;
}

.expert-location {
  color: #6c757d;
}

@media (max-width: 991.98px) {
  .hero-section {
    min-height: auto;
    padding: 5rem 0;
  }

  .hero-title {
    font-size: 1.95rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 767.98px) {
  .hero-title {
    font-size: 1.7rem;
  }

  .search-wrapper {
    padding: 0.85rem;
  }

  .expert-image {
    height: 200px;
  }

  .join-provider-wrapper {
    width: 100%;
    padding: 0.9rem 1rem;
  }
}
</style>