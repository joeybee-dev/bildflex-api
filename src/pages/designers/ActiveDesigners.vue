<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">Active Designers</h2>
          <p class="auth-subtitle mb-0">Browse active designers and their services.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else-if="designers.length === 0" class="text-center py-5">
            <h5 class="empty-title">No designers found</h5>
          </div>

          <div v-else class="row g-4">
            <div v-for="designer in designers" :key="designer._id" class="col-12 col-md-6 col-lg-4">
              <div class="content-card h-100">
                <div class="text-center mb-3">
                  <img :src="designer.profilePhoto || fallbackImage" class="profile-image" alt="Designer" />
                </div>
                <h5 class="content-title text-center mb-1">{{ designer.businessName || designer.companyName || "Designer" }}</h5>
                <p class="content-meta text-center mb-1">{{ designer.specialization || "Designer" }}</p>
                <p class="content-meta text-center mb-3">{{ designer.city || "-" }}</p>
                <div class="d-grid">
                  <router-link :to="`/designers/${designer._id}`" class="btn login-btn">View Details</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "@/services/api";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const loading = ref(false);
const designers = ref([]);
const notyf = new Notyf();
const fallbackImage = "/favicon.ico";

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
.auth-page { min-height: 100vh; background-color: #f4f6f8; }
.auth-card { border-radius: 20px; overflow: hidden; background: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; }
.auth-subtitle { color: #003e86; }
.content-card { border: 1px solid rgba(0,62,134,.12); border-radius: 18px; padding: 1.25rem; background: #fff; }
.profile-image { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 3px solid #ffc107; }
.content-title { color: #003e86; font-weight: 800; }
.content-meta { color: #6c757d; }
.login-btn { min-height: 48px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.empty-title { color: #003e86; font-weight: 800; }
</style>