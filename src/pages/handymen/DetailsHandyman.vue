<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">Handyman Details</h2>
          <p class="auth-subtitle mb-0">View handyman profile and company information.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else class="row g-4 align-items-start">
            <div class="col-12 col-md-4 text-center">
              <img :src="handyman.profilePhoto || fallbackImage" class="profile-image-lg" alt="Handyman" />
            </div>

            <div class="col-12 col-md-8">
              <div class="row g-3">
                <div class="col-12">
                  <div class="info-box">
                    <label class="form-label">Business Name</label>
                    <div>{{ handyman.businessName || "-" }}</div>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="info-box">
                    <label class="form-label">Specialization</label>
                    <div>{{ handyman.specialization || "-" }}</div>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="info-box">
                    <label class="form-label">City</label>
                    <div>{{ handyman.city || "-" }}</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="info-box info-box-lg">
                    <label class="form-label">About Business</label>
                    <div>{{ handyman.aboutBusiness || "-" }}</div>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <router-link to="/handymen" class="btn login-btn">Back to Handymen</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const route = useRoute();
const notyf = new Notyf();
const loading = ref(false);
const fallbackImage = "/favicon.ico";
const handyman = reactive({});

const fetchHandyman = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/handymen/${route.params.id}`);
    Object.assign(handyman, response.data?.handyman || response.data || {});
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load handyman details.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchHandyman);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; }
.auth-card { border-radius: 20px; overflow: hidden; background: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title, .form-label { color: #003e86; }
.auth-title { font-weight: 800; }
.auth-subtitle { color: #003e86; }
.info-box { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); padding: .85rem 1rem; color: #003e86; background: #fff; }
.info-box-lg { min-height: 130px; }
.form-label { font-weight: 700; margin-bottom: .45rem; display: block; }
.profile-image-lg { width: 180px; height: 180px; border-radius: 50%; object-fit: cover; border: 4px solid #ffc107; }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
</style>