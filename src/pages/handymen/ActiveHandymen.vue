<template>
  <div class="auth-page py-3">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header">
          <div
            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
          >
            <div class="text-start">
              <h2 class="auth-title mb-1">Handymen</h2>
              <p class="auth-subtitle mb-0">
               Find expert handymen ready to help with services in your area.
              </p>
            </div>

            <div class="search-box">
              <div class="input-group search-group">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control search-input"
                  placeholder="Search"
                />
                <span class="input-group-text search-icon">
                  <i class="bi bi-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body p-4 p-md-4">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else-if="filteredHandymen.length === 0" class="text-center py-5">
            <h5 class="empty-title">No handymen found</h5>
          </div>

          <div v-else class="row g-4">
            <div
              v-for="handyman in filteredHandymen"
              :key="handyman._id"
              class="col-12 col-sm-6 col-lg-3"
            >
              <ActiveHandymanCard :handyman="handyman" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import api from "@/services/api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import ActiveHandymanCard from "@/components/handymen/ActiveHandymanCard.vue";

const loading = ref(false);
const handymen = ref([]);
const searchQuery = ref("");
const notyf = new Notyf();

const filteredHandymen = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) return handymen.value;

  return handymen.value.filter((handyman) => {
    const firstName = handyman.firstName?.toLowerCase() || "";
    const city = handyman.city?.toLowerCase() || "";
    const skills = Array.isArray(handyman.skills)
      ? handyman.skills.join(", ").toLowerCase()
      : String(handyman.skills || "").toLowerCase();

    return (
      firstName.includes(query) ||
      city.includes(query) ||
      skills.includes(query)
    );
  });
});

const fetchHandymen = async () => {
  try {
    loading.value = true;
    const response = await api.get("/handymen/active");
    handymen.value = response.data?.handymen || [];
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load handymen.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchHandymen);
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-color: #f4f6f8;
}

.auth-card {
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.auth-header {
  border-bottom: 2px solid #ffc107;
  padding: 1.4rem 1.5rem 1.4rem;
}

.auth-title {
  color: #003e86;
  font-size: 1.3rem;
  font-weight: 700;
}

.auth-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
}

.empty-title {
  color: #003e86;
  font-weight: 800;
}

.search-box {
  width: 100%;
  max-width: 360px;
}

.search-group {
  border-radius: 20px;
  /*border: 5px solid #ffffff;*/
  /*overflow: hidden;*/
}

.search-input {
  min-height: 46px;
  border-right: 0;
  /*color: #003e86;*/
  box-shadow: none;
}

.search-input:focus {
  border-color: #ffc107;
  box-shadow: none;
}

.search-input:focus + .search-icon {
  border-color: #ffc107;
}

.search-icon {
  background-color: #ffffff;
  /*border: 1px solid red;*/
  /*border: 1px solid rgba(0, 62, 134, 0.15);*/
  border-left: 0;
  color: rgba(0, 62, 134, 0.5);
  min-width: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 767.98px) {
  .auth-title {
    font-size: 1.5rem;
  }
}
</style>