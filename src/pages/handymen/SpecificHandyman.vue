<template>
  <div class="page-wrapper py-5">
    <div class="container">
      <div class="mb-4">
        <router-link to="/active-handymen" class="back-link">
          ← Back to Active Handymen
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-warning" role="status"></div>
        <p class="mt-3 text-muted">Loading handyman details...</p>
      </div>

      <div v-else-if="handyman" class="card detail-card border-0 shadow-sm overflow-hidden">
        <div class="row g-0">
          <div class="col-12 col-lg-4">
            <img
              :src="handyman.profilePhoto || defaultPhoto"
              alt="Handyman"
              class="detail-photo"
            />
          </div>

          <div class="col-12 col-lg-8">
            <div class="detail-header">
              <span class="badge specialty-badge mb-3">{{ handyman.specialty }}</span>
              <h2 class="detail-name mb-2">
                {{ handyman.fullName || `${handyman.firstName || ""} ${handyman.lastName || ""}`.trim() }}
              </h2>
              <p class="detail-location mb-0">
                {{ handyman.city || "N/A" }}{{ handyman.province ? `, ${handyman.province}` : "" }},
                {{ handyman.country || "Philippines" }}
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="info-box">
                    <label>Email</label>
                    <p>{{ handyman.email || "N/A" }}</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="info-box">
                    <label>Mobile Number</label>
                    <p>{{ handyman.mobileNumber || "N/A" }}</p>
                  </div>
                </div>

                <div class="col-12">
                  <div class="info-box">
                    <label>Services Offered</label>
                    <p>{{ handyman.servicesOffered || "No services description yet." }}</p>
                  </div>
                </div>
              </div>

              <div v-if="handyman.workPhotos?.length" class="mt-4">
                <h5 class="section-title mb-3">Work Photos</h5>
                <div class="row g-3">
                  <div
                    v-for="(photo, index) in handyman.workPhotos"
                    :key="index"
                    class="col-6 col-md-4"
                  >
                    <img :src="photo" alt="Work Photo" class="work-photo" />
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button class="btn custom-primary-btn">
                  Contact Handyman
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="alert alert-warning">
        Handyman not found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const route = useRoute();
const handyman = ref(null);
const loading = ref(false);
const notyf = new Notyf();

const defaultPhoto = "/src/assets/images/default-male.jpg";

const fetchSpecificHandyman = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/handymen/${route.params.handymanId}`);
    handyman.value = response.data?.handyman || null;
  } catch (error) {
    console.error("Error fetching handyman details:", error);
    notyf.error(error?.response?.data?.error || "Failed to load handyman details.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSpecificHandyman();
});
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: #f4f6f8;
}

.back-link {
  color: #003e86;
  text-decoration: none;
  font-weight: 700;
}

.back-link:hover {
  color: #ffc107;
}

.detail-card {
  border-radius: 20px;
}

.detail-photo {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
  background: #e9ecef;
}

.detail-header {
  background: #003e86;
  border-bottom: 4px solid #ffc107;
  padding: 2rem 2rem 1.5rem;
}

.detail-name {
  color: #ffc107;
  font-weight: 800;
}

.detail-location {
  color: #f8f9fa;
}

.specialty-badge {
  background: #ffc107;
  color: #003e86;
  font-weight: 700;
}

.info-box {
  background: #f8fafc;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 14px;
  padding: 1rem;
  height: 100%;
}

.info-box label {
  display: block;
  color: #003e86;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.info-box p {
  margin: 0;
  color: #495057;
}

.section-title {
  color: #003e86;
  font-weight: 700;
}

.work-photo {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 14px;
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
</style>