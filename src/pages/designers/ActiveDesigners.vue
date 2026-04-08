<template>
  <div class="auth-page py-3">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header">
          <div
            class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center"
          >
            <div class="text-start">
              <h2 class="auth-title mb-1">Designers</h2>
              <p class="auth-subtitle mb-0">
                Find architects and engineers ready to deliver creative plans and design solutions in your area.
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

          <div v-else-if="filteredDesigners.length === 0" class="text-center py-5">
            <h5 class="empty-title">No designers found</h5>
          </div>

          <div v-else class="row g-4">
            <div
              v-for="designer in filteredDesigners"
              :key="designer._id"
              class="col-12 col-sm-6 col-lg-3"
            >
              <ActiveDesignersCard :designer="designer" />
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
import ActiveDesignersCard from "@/components/designers/ActiveDesignersCard.vue";

const loading = ref(false);
const designers = ref([]);
const searchQuery = ref("");
const notyf = new Notyf();

const filteredDesigners = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) return designers.value;

  return designers.value.filter((designer) => {
    const firstName = designer.firstName?.toLowerCase() || "";
    const city = designer.city?.toLowerCase() || "";
    const skills = Array.isArray(designer.skills)
      ? designer.skills.join(", ").toLowerCase()
      : String(designer.skills || "").toLowerCase();

    return (
      firstName.includes(query) ||
      city.includes(query) ||
      skills.includes(query)
    );
  });
});

const fetchDesigners = async () => {
  try {
    loading.value = true;
    const response = await api.get("/designers/active");
    designers.value = response.data?.designers || [];
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load designers.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDesigners);
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
}

.search-input {
  min-height: 46px;
  border-right: 0;
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