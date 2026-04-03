<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">My Contractor Profile</h2>
              <p class="auth-subtitle mb-0">View and manage your contractor account.</p>
            </div>

            <div class="card-body p-4 p-md-5">
              <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-warning" role="status"></div>
              </div>

              <div v-else class="row g-4 align-items-start">
                <div class="col-12 col-md-4 text-center">
                  <div class="profile-image-wrapper mx-auto mb-3">
                    <img :src="contractor.profilePhoto || fallbackImage" class="profile-image" alt="Contractor" />
                  </div>

                  <router-link to="/contractor/profile/photo" class="btn login-btn w-100">
                    Change Photo
                  </router-link>
                </div>

                <div class="col-12 col-md-8">
                  <div class="row g-3">
                    <div class="col-12"><div class="info-box"><label class="form-label">Business Name</label><div>{{ contractor.businessName || "-" }}</div></div></div>
                    <div class="col-12 col-md-6"><div class="info-box"><label class="form-label">Contact Person</label><div>{{ contractor.contactPerson || "-" }}</div></div></div>
                    <div class="col-12 col-md-6"><div class="info-box"><label class="form-label">Email</label><div>{{ contractor.email || "-" }}</div></div></div>
                    <div class="col-12 col-md-6"><div class="info-box"><label class="form-label">Mobile Number</label><div>{{ contractor.mobileNumber || "-" }}</div></div></div>
                    <div class="col-12 col-md-6"><div class="info-box"><label class="form-label">City</label><div>{{ contractor.city || "-" }}</div></div></div>
                    <div class="col-12"><div class="info-box"><label class="form-label">Specialization</label><div>{{ contractor.specialization || "-" }}</div></div></div>
                    <div class="col-12"><div class="info-box info-box-lg"><label class="form-label">About Business</label><div>{{ contractor.aboutBusiness || "-" }}</div></div></div>
                  </div>

                  <div class="d-flex flex-column flex-md-row gap-2 mt-4">
                    <router-link to="/contractor/profile/edit" class="btn login-btn">Edit Profile</router-link>
                    <router-link to="/contractor/change-password" class="btn btn-outline-primary custom-outline-btn">Change Password</router-link>
                    <router-link to="/contractor/deactivate-account" class="btn btn-outline-danger custom-danger-btn">Deactivate Account</router-link>
                  </div>
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
import { onMounted, reactive, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);
const fallbackImage = "/favicon.ico";
const contractor = reactive({});

const fetchProfile = async () => {
  try {
    loading.value = true;
    const response = await api.get("/contractors/details");
    Object.assign(contractor, response.data?.contractor || response.data || {});
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load contractor profile.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProfile);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; display: flex; align-items: center; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; }
.auth-subtitle { color: #003e86; }
.form-label { color: #003e86; font-weight: 700; margin-bottom: .45rem; }
.info-box { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); padding: .85rem 1rem; color: #003e86; background-color: #fff; }
.info-box-lg { min-height: 110px; }
.profile-image-wrapper { width: 180px; height: 180px; border-radius: 50%; overflow: hidden; border: 4px solid #ffc107; background: #fff; }
.profile-image { width: 100%; height: 100%; object-fit: cover; }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.custom-outline-btn,.custom-danger-btn { min-height: 50px; border-radius: 12px; font-weight: 700; }
</style>