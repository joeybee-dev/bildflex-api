<template>
  <div class="page-wrapper py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 class="page-title mb-1">All Handymen</h2>
          <p class="page-subtitle mb-0">Admin list of all handyman accounts.</p>
        </div>

        <router-link to="/" class="btn btn-outline-primary custom-outline-btn">
          Back to Home
        </router-link>
      </div>

      <div class="card filter-card border-0 shadow-sm mb-4">
        <div class="card-body">
          <input
            v-model.trim="search"
            type="text"
            class="form-control"
            placeholder="Search by name, email, city, or specialty"
          />
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-warning" role="status"></div>
        <p class="mt-3 text-muted">Loading handymen...</p>
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

              <p class="small text-muted mb-1">{{ handyman.email }}</p>
              <p class="small text-muted mb-2">
                {{ handyman.city || "N/A" }}{{ handyman.province ? `, ${handyman.province}` : "" }}
              </p>

              <div class="mb-3">
                <span
                  class="badge"
                  :class="handyman.isActive ? 'bg-success' : 'bg-secondary'"
                >
                  {{ handyman.isActive ? "Active" : "Inactive" }}
                </span>
                <span
                  class="badge ms-2"
                  :class="handyman.isArchived ? 'bg-dark' : 'bg-warning text-dark'"
                >
                  {{ handyman.isArchived ? "Archived" : "Visible" }}
                </span>
              </div>

              <p class="card-text text-muted flex-grow-1">
                {{ handyman.servicesOffered || "No services description available." }}
              </p>

              <div class="d-flex gap-2 mt-3">
                <router-link
                  :to="`/handymen/${handyman._id}`"
                  class="btn btn-primary flex-fill custom-primary-btn"
                >
                  View
                </router-link>

                <button
                  v-if="!handyman.isArchived"
                  class="btn btn-outline-danger"
                  @click="archiveHandyman(handyman._id)"
                >
                  Archive
                </button>

                <button
                  v-else
                  class="btn btn-outline-success"
                  @click="activateHandyman(handyman._id)"
                >
                  Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-warning">
        No handymen found.
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
      (item.email || "").toLowerCase().includes(keyword) ||
      (item.city || "").toLowerCase().includes(keyword) ||
      (item.specialty || "").toLowerCase().includes(keyword)
    );
  });
});

const fetchAllHandymen = async () => {
  try {
    loading.value = true;
    const response = await api.get("/handymen/all-handymen");
    handymen.value = response.data?.handymen || [];
  } catch (error) {
    console.error("Error fetching handymen:", error);
    notyf.error(error?.response?.data?.error || "Failed to load handymen.");
  } finally {
    loading.value = false;
  }
};

const archiveHandyman = async (id) => {
  try {
    await api.patch(`/handymen/${id}/archive`);
    notyf.success("Handyman archived successfully.");
    fetchAllHandymen();
  } catch (error) {
    console.error("Archive handyman error:", error);
    notyf.error(error?.response?.data?.error || "Failed to archive handyman.");
  }
};

const activateHandyman = async (id) => {
  try {
    await api.patch(`/handymen/${id}/activate`);
    notyf.success("Handyman activated successfully.");
    fetchAllHandymen();
  } catch (error) {
    console.error("Activate handyman error:", error);
    notyf.error(error?.response?.data?.error || "Failed to activate handyman.");
  }
};

onMounted(() => {
  fetchAllHandymen();
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

.filter-card,
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
  font-weight: 700;
}

.custom-primary-btn:hover {
  background: #002c60;
  border-color: #002c60;
}

.custom-outline-btn {
  border-color: #003e86;
  color: #003e86;
  font-weight: 700;
}

.custom-outline-btn:hover {
  background: #003e86;
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