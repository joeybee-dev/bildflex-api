<template>
  <div class="page-wrapper py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="page-title mb-2">Active Handymen</h2>
        <p class="page-subtitle mb-0">
          Browse verified and active handyman service providers.
        </p>
      </div>

      <div class="row justify-content-center mb-4">
        <div class="col-12 col-md-8 col-lg-6">
          <input
            v-model.trim="search"
            type="text"
            class="form-control"
            placeholder="Search handyman by name, city, or specialty"
          />
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-warning" role="status"></div>
        <p class="mt-3 text-muted">Loading active handymen...</p>
      </div>

      <div v-else-if="filteredHandymen.length" class="row g-4">
        <div
          v-for="handyman in filteredHandymen"
          :key="handyman._id"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="card handyman-card h-100 border-0 shadow-sm">
            <img
              :src="handyman.profilePhoto || defaultPhoto"
              class="card-img-top handyman-photo"
              alt="Handyman"
            />

            <div class="card-body d-flex flex-column">
              <span class="badge specialty-badge align-self-start mb-2">
                {{ handyman.specialty || "Handyman" }}
              </span>

              <h5 class="card-title fw-bold mb-1">
                {{ handyman.fullName || `${handyman.firstName || ""} ${handyman.lastName || ""}`.trim() }}
              </h5>

              <p class="text-muted small mb-2">
                {{ handyman.city || "N/A" }}{{ handyman.province ? `, ${handyman.province}` : "" }}
              </p>

              <p class="card-text text-muted flex-grow-1">
                {{ handyman.servicesOffered || "Reliable handyman services available." }}
              </p>

              <router-link
                :to="`/handymen/${handyman._id}`"
                class="btn custom-primary-btn mt-3"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-warning text-center">
        No active handymen found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const handymen = ref([]);
const loading = ref(false);
const search = ref("");
const notyf = new Notyf();

const defaultPhoto = "/src/assets/images/default-male.jpg";

const filteredHandymen = computed(() => {
  const keyword = search.value.toLowerCase();

  if (!keyword) return handymen.value;

  return handymen.value.filter((item) => {
    const fullName = item.fullName || `${item.firstName || ""} ${item.lastName || ""}`.trim();

    return (
      fullName.toLowerCase().includes(keyword) ||
      (item.city || "").toLowerCase().includes(keyword) ||
      (item.specialty || "").toLowerCase().includes(keyword)
    );
  });
});

const fetchActiveHandymen = async () => {
  try {
    loading.value = true;
    const response = await api.get("/handymen/active-handymen");
    handymen.value = response.data?.handymen || [];
  } catch (error) {
    console.error("Error fetching active handymen:", error);
    notyf.error(error?.response?.data?.error || "Failed to load active handymen.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchActiveHandymen();
});
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #f4f6f8;
}

.page-title {
  color: #003e86;
  font-weight: 800;
}

.page-subtitle {
  color: #6c757d;
}

.handyman-card {
  border-radius: 18px;
}

.handyman-photo {
  height: 220px;
  object-fit: cover;
  background: #e9ecef;
}

.specialty-badge {
  background: #ffc107;
  color: #003e86;
  font-weight: 700;
}

.custom-primary-btn {
  background: #003e86;
  border-color: #003e86;
  color: #fff;
  font-weight: 700;
}

.custom-primary-btn:hover {
  background: #002c60;
  border-color: #002c60;
  color: #fff;
}

.form-control {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
}

.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}
</style>