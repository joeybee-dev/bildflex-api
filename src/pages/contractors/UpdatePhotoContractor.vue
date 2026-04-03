<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Update Photo</h2>
              <p class="auth-subtitle mb-0">Upload or remove your contractor profile photo.</p>
            </div>

            <div class="card-body p-4 p-md-5 text-center">
              <div class="profile-image-wrapper mx-auto mb-4">
                <img :src="previewImage" alt="Contractor Photo" class="profile-image" />
              </div>

              <input ref="fileInput" type="file" class="d-none" accept="image/*" @change="handleFileChange" />

              <div class="d-grid gap-2">
                <button class="btn login-btn" @click="openPicker">Choose Photo</button>
                <button class="btn btn-outline-primary custom-outline-btn" @click="uploadPhoto" :disabled="loading || !selectedFile">
                  {{ loading ? "Uploading..." : "Upload Photo" }}
                </button>
                <button class="btn btn-outline-danger custom-danger-btn" @click="removePhoto" :disabled="loading">
                  Delete Photo
                </button>
                <router-link to="/contractor/profile" class="btn btn-outline-secondary custom-outline-btn">
                  Back to Profile
                </router-link>
              </div>
            </div>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const fileInput = ref(null);
const selectedFile = ref(null);
const loading = ref(false);
const currentPhoto = ref("");
const fallbackImage = "/favicon.ico";

const previewImage = computed(() => {
  if (selectedFile.value) return URL.createObjectURL(selectedFile.value);
  return currentPhoto.value || fallbackImage;
});

const openPicker = () => fileInput.value?.click();

const handleFileChange = (e) => {
  selectedFile.value = e.target.files?.[0] || null;
};

const fetchProfile = async () => {
  try {
    const response = await api.get("/contractors/details");
    currentPhoto.value = response.data?.contractor?.profilePhoto || "";
  } catch {}
};

const uploadPhoto = async () => {
  if (!selectedFile.value) {
    notyf.error("Please choose an image first.");
    return;
  }

  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("profilePhoto", selectedFile.value);

    const response = await api.patch("/contractors/update-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    currentPhoto.value = response.data?.contractor?.profilePhoto || response.data?.profilePhoto || "";
    selectedFile.value = null;
    notyf.success(response.data?.message || "Photo updated successfully.");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to upload photo.");
  } finally {
    loading.value = false;
  }
};

const removePhoto = async () => {
  try {
    loading.value = true;
    const response = await api.delete("/contractors/update-photo");
    currentPhoto.value = "";
    selectedFile.value = null;
    notyf.success(response.data?.message || "Photo removed successfully.");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to delete photo.");
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
.profile-image-wrapper { width: 180px; height: 180px; border-radius: 50%; overflow: hidden; border: 4px solid #ffc107; background: #fff; }
.profile-image { width: 100%; height: 100%; object-fit: cover; }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.custom-outline-btn,.custom-danger-btn { min-height: 50px; border-radius: 12px; font-weight: 700; }
</style>