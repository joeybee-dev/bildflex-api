<template>
  <div class="auth-page py-5"> 
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">My Profile</h2>
              <p class="auth-subtitle mb-0">
                View your account information and manage your profile.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <div v-if="loading" class="text-center py-4">
                <div class="spinner-border text-warning" role="status"></div>
              </div>

              <div v-else class="row g-4 align-items-start">
                <div class="col-12 col-md-4 text-center">
                  <div class="profile-image-wrapper mx-auto mb-3">
                    <img
                      :src="profilePhotoToShow"
                      alt="Profile Photo"
                      class="profile-image"
                    />
                  </div>

                  <router-link to="/profile/photo" class="btn login-btn w-100 mb-2">
                    Change Photo
                  </router-link>
                </div>

                <div class="col-12 col-md-8">
                  <div class="row g-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label">First Name</label>
                      <div class="info-box">{{ user.firstName || "-" }}</div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label">Last Name</label>
                      <div class="info-box">{{ user.lastName || "-" }}</div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label">Email</label>
                      <div class="info-box">{{ user.email || "-" }}</div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label">Gender</label>
                      <div class="info-box">{{ user.gender || "-" }}</div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label">Mobile Number</label>
                      <div class="info-box">{{ user.mobileNumber || "-" }}</div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label">City</label>
                      <div class="info-box">{{ user.city || "-" }}</div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label">Province</label>
                      <div class="info-box">{{ user.province || "-" }}</div>
                    </div>

                    <div class="col-12 col-md-6">
                      <label class="form-label">Country</label>
                      <div class="info-box">{{ user.country || "-" }}</div>
                    </div>

                    <div class="col-12">
                      <label class="form-label">About Me</label>
                      <div class="info-box info-box-lg">{{ user.aboutMe || "-" }}</div>
                    </div>
                  </div>

                  <div class="d-flex flex-column flex-md-row gap-2 mt-4">
                    <router-link to="/profile/edit" class="btn login-btn">
                      Edit Profile
                    </router-link>
                    <router-link to="/change-password" class="btn btn-outline-primary custom-outline-btn">
                      Change Password
                    </router-link>
                    <router-link to="/deactivate-account" class="btn btn-outline-danger custom-danger-btn">
                      Deactivate Account
                    </router-link>
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
import { computed, onMounted, reactive, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);

const user = reactive({
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  mobileNumber: "",
  city: "",
  province: "",
  country: "",
  aboutMe: "",
  profilePhoto: ""
});

const profilePhotoToShow = computed(() => {
  if (user.profilePhoto) return user.profilePhoto;
  if (user.gender === "Female") return "/src/assets/images/default-female.jpg";
  return "/src/assets/images/default-male.jpg";
});

const fetchProfile = async () => {
  try {
    loading.value = true;
    const response = await api.get("/users/details");
    const data = response.data?.user || response.data || {};


    
    Object.assign(user, {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      gender: data.gender || "",
      mobileNumber: data.mobileNumber || "",
      city: data.city || "",
      province: data.province || "",
      country: data.country || "",
      aboutMe: data.aboutMe || "",
      profilePhoto: data.profilePhoto || ""
    });

    console.log(response);

  } catch (err) {
    console.error("Fetch profile error:", err);
    notyf.error(err.response?.data?.error || "Failed to load profile.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProfile);
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-color: #f4f6f8;
  display: flex;
  align-items: center;
}

.auth-card {
  border-radius: 20px;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.auth-header {
  border-bottom: 3px solid #ffc107;
  padding: 2rem 1.5rem 1.75rem;
}

.auth-title {
  color: #003e86;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.auth-subtitle {
  color: #003e86;
  font-size: 0.95rem;
}

.form-label {
  color: #003e86;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.info-box {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
  padding: 0.85rem 1rem;
  color: #003e86;
  background-color: #ffffff;
}

.info-box-lg {
  min-height: 110px;
}

.profile-image-wrapper {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ffc107;
  background: #fff;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
  transition: all 0.25s ease;
}

.login-btn:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.custom-outline-btn,
.custom-danger-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
}

@media (max-width: 767.98px) {
  .auth-page {
    padding-top: 2rem;
    padding-bottom: 2rem;
    align-items: flex-start;
  }

  .auth-header {
    padding: 1.75rem 1rem 1.5rem;
  }
}
</style>