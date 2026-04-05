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
              Connect with trusted handymen, designers, contractors, and suppliers
              for residential, commercial, and industrial projects.
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
        <div class="text-center mb-5">
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
                    Creative experts for plans, layouts, and design concepts.
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
              Explore trusted handymen, designers, contractors, and suppliers for your project needs.
            </p>
          </div>
        </div>

        <div class="featured-group mb-5">
          <FeaturedHandymen />
        </div>

        <div class="featured-group mb-5">
          <FeaturedDesigners />
        </div>

        <div class="featured-group mb-5">
          <FeaturedContractors />
        </div>

        <div class="featured-group">
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



const featuredExperts = [
  {
    category: "Handyman",
    experts: [
      {
        id: 1,
        name: "Mark Dela Cruz",
        location: "Quezon City",
        description: "General repair specialist for electrical, plumbing, and maintenance work.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        name: "Ramon Perez",
        location: "Pasig City",
        description: "Experienced handyman for home repair, installation, and renovation support.",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        name: "Joel Santos",
        location: "Makati City",
        description: "On-call repair expert for small construction and maintenance jobs.",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        name: "Eric Mendoza",
        location: "Taguig City",
        description: "Reliable service provider for fixtures, carpentry, and repair work.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    category: "Designer",
    experts: [
      {
        id: 5,
        name: "Ar. Camille Reyes",
        location: "Manila",
        description: "Architectural designer specializing in residential and mixed-use spaces.",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 6,
        name: "Engr. Paul Navarro",
        location: "Cebu City",
        description: "Planning and design expert for structural and construction-ready concepts.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 7,
        name: "Ar. Nina Lopez",
        location: "Davao City",
        description: "Interior and building designer for modern residential and office projects.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 8,
        name: "Engr. Carlo Torres",
        location: "Quezon City",
        description: "CAD, drafting, and floorplan specialist for commercial developments.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    category: "Contractor",
    experts: [
      {
        id: 9,
        name: "BuildPro Works",
        location: "Muntinlupa City",
        description: "Full-service contractor for civil, structural, and fit-out works.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 10,
        name: "Prime Construct",
        location: "Caloocan City",
        description: "Construction contractor for residential builds and commercial renovations.",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 11,
        name: "Northline Builders",
        location: "Quezon Province",
        description: "Trusted team for project execution, supervision, and finishing works.",
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 12,
        name: "Metro Civil Group",
        location: "Pasay City",
        description: "Experienced contractor for infrastructure, commercial, and industrial jobs.",
        image: "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    category: "Supplier",
    experts: [
      {
        id: 13,
        name: "Steel & Build Supply",
        location: "Valenzuela City",
        description: "Supplier of structural materials, tools, and project essentials.",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 14,
        name: "Construct Mart",
        location: "Meycauayan",
        description: "One-stop source for construction materials and finishing products.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 15,
        name: "Pro Equip Source",
        location: "Marikina City",
        description: "Equipment, safety gear, and supply solutions for various project sizes.",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 16,
        name: "Builders Choice Depot",
        location: "Bacoor",
        description: "Reliable partner for hardware, cement, paint, and construction supplies.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];
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
    linear-gradient(rgba(0, 62, 134, 0.78), rgba(0, 62, 134, 0.78)),
    rgba(0, 0, 0, 0.2);
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
  border-radius: 12px;
  border: 2px solid #ffc107;
  background-color: #ffffff;
  color: #003e86;
}

.search-input:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.2);
}

.search-btn {
  min-height: 54px;
  border-radius: 12px;
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
  border: 2px solid #ffc107;
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
  text-decoration: none;
  border-bottom: 2px solid #ffc107;
  padding-bottom: 2px;
  transition: all 0.25s ease;
}

.services-section {
  background-color: #f4f6f8;
}

.featured-section {
  background-color: #ffffff;
}

.section-title {
  font-size: 1.9rem;
  font-weight: 800;
  color: #003e86;
}

.section-subtitle {
  font-size: 1rem;
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