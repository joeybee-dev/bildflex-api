<template>
  <div class="edit-page py-4 py-md-5">
    <div class="container">
      <div
        class="page-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
      >
        <div>
          <h2 class="page-title mb-1">Edit Profile</h2>
          <p class="page-subtitle mb-0">
            Update your personal information and account details.
          </p>
        </div>

        <div class="d-grid d-md-flex gap-2 action-buttons">
          <router-link to="/details-user" class="btn action-btn-secondary">
            Cancel
          </router-link>
        </div>
      </div>

      <div v-if="loading" class="loading-card text-center py-5 shadow-sm">
        <div class="spinner-border brand-spinner" role="status"></div>
        <p class="mt-3 mb-0 loading-text">Loading profile...</p>
      </div>

      <div v-else class="card edit-card border-0 shadow-sm overflow-hidden">
        <div class="edit-header"></div>

        <div class="card-body p-3 p-sm-4 p-md-5">
          <form @submit.prevent="updateUser">
            <div class="row g-4">
              <div class="col-12 col-lg-4 text-center">
                <img
                  :src="profilePreview"
                  alt="User Profile"
                  class="profile-photo rounded-circle shadow-sm"
                />

                <h5 class="profile-name mt-3 mb-1">
                  {{ form.firstName || "Your Name" }}
                </h5>

                <p class="profile-email mb-3 text-break">
                  {{ form.email || "your@email.com" }}
                </p>

                <div class="upload-box">
                  <label class="form-label d-block">Profile Photo URL</label>
                  <input
                    v-model="form.profilePhoto"
                    type="text"
                    class="form-control"
                    placeholder="Paste image URL"
                  />
                </div>
              </div>

              <div class="col-12 col-lg-8">
                <div class="row g-3">
                  <div class="col-12 col-sm-6">
                    <label class="form-label">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="form-control"
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div class="col-12 col-sm-6">
                    <label class="form-label">Last Name</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      class="form-control"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div class="col-12 col-sm-6">
                    <label class="form-label">Gender</label>
                    <select v-model="form.gender" class="form-select">
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div class="col-12 col-sm-6">
                    <label class="form-label">Birth Year</label>
                    <input
                      v-model="form.birthYear"
                      type="number"
                      class="form-control"
                      placeholder="Enter birth year"
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Email</label>
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div class="col-12 col-sm-6">
                    <label class="form-label">Mobile No</label>
                    <input
                      v-model="form.mobileNo"
                      type="text"
                      class="form-control"
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div class="col-12 col-sm-6">
                    <label class="form-label">Country</label>
                    <input
                      v-model="form.country"
                      type="text"
                      class="form-control"
                      placeholder="Enter country"
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">City</label>
                    <input
                      v-model="form.city"
                      type="text"
                      class="form-control"
                      placeholder="Enter city"
                    />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Province</label>
                    <input
                      v-model="form.province"
                      type="text"
                      class="form-control"
                      placeholder="Enter province"
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Bio</label>
                    <textarea
                      v-model="form.bio"
                      class="form-control bio-textarea"
                      rows="5"
                      placeholder="Write a short bio"
                    ></textarea>
                  </div>
                </div>

                <div class="d-grid d-md-flex gap-2 justify-content-md-end mt-4">
                  <router-link to="/details-user" class="btn action-btn-secondary">
                    Cancel
                  </router-link>

                  <button
                    type="submit"
                    class="btn action-btn-primary"
                    :disabled="saving"
                  >
                    {{ saving ? "Saving..." : "Save Changes" }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div v-if="errorMessage" class="error-box shadow-sm mt-4">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

import defaultMale from "@/assets/images/default-male.jpg";
import defaultFemale from "@/assets/images/default-female.jpg";

const router = useRouter();
const notyf = new Notyf();

const loading = ref(false);
const saving = ref(false);
const errorMessage = ref("");

const form = reactive({
  firstName: "",
  lastName: "",
  gender: "",
  birthYear: "",
  email: "",
  mobileNo: "",
  city: "",
  province: "",
  country: "",
  bio: "",
  profilePhoto: ""
});

const profilePreview = computed(() => {
  if (form.profilePhoto) return form.profilePhoto;
  if (form.gender === "Female") return defaultFemale;
  return defaultMale;
});

const fetchUserDetails = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const response = await api.get("/users/details-user");
    const user = response.data?.user || {};

    form.firstName = user.firstName || "";
    form.lastName = user.lastName || "";
    form.gender = user.gender || "";
    form.birthYear = user.birthYear || "";
    form.email = user.email || "";
    form.mobileNo = user.mobileNo || "";
    form.city = user.city || "";
    form.province = user.province || "";
    form.country = user.country || "";
    form.bio = user.bio || "";
    form.profilePhoto = user.profilePhoto || "";
  } catch (err) {
    console.error("Fetch edit user details error:", err);
    errorMessage.value = err.response?.data?.error || "Failed to load profile details.";
    notyf.error(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const updateUser = async () => {
  try {
    saving.value = true;
    errorMessage.value = "";

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      birthYear: form.birthYear,
      email: form.email,
      mobileNo: form.mobileNo,
      city: form.city,
      province: form.province,
      country: form.country,
      bio: form.bio,
      profilePhoto: form.profilePhoto
    };

    const response = await api.patch("/users/update-user", payload);

    notyf.success(response.data?.message || "Profile updated successfully.");
    router.push("/details-user");
  } catch (err) {
    console.error("Update user error:", err);
    errorMessage.value = err.response?.data?.error || "Failed to update profile.";
    notyf.error(errorMessage.value);
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  fetchUserDetails();
});
</script>

<style scoped>
.edit-page {
  min-height: 100vh;
  background-color: #f4f6f8;
  overflow-x: hidden;
}

.page-header {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-left: 4px solid #ffc107;
  border-radius: 18px;
  padding: 1.25rem;
}

.page-title {
  color: #003e86;
  font-weight: 800;
  margin: 0;
}

.page-subtitle {
  color: #6c757d;
  font-size: 0.96rem;
}

.edit-card {
  border-radius: 22px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.edit-header {
  height: 14px;
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
}

.loading-card,
.error-box {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-radius: 18px;
}

.brand-spinner {
  color: #003e86;
}

.loading-text {
  color: #6c757d;
}

.profile-photo {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border: 4px solid #ffc107;
  background-color: #ffffff;
}

.profile-name {
  color: #003e86;
  font-weight: 800;
}

.profile-email {
  color: #6c757d;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.upload-box {
  background-color: #f8f9fb;
  border: 1px solid rgba(0, 62, 134, 0.08);
  border-radius: 14px;
  padding: 1rem;
  text-align: left;
}

.form-label {
  color: #6c757d;
  font-size: 0.83rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 0.45rem;
}

.form-control,
.form-select {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
  color: #003e86;
  background-color: #ffffff;
}

.form-control:focus,
.form-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}

.form-control::placeholder,
.bio-textarea::placeholder {
  color: #9aa4b2;
}

.bio-textarea {
  min-height: 120px;
  resize: vertical;
}

.action-buttons .btn,
.action-btn-primary,
.action-btn-secondary {
  min-width: 150px;
  min-height: 46px;
  border-radius: 12px;
  font-weight: 700;
}

.action-btn-primary {
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
}

.action-btn-primary:hover:not(:disabled) {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.action-btn-secondary {
  background-color: transparent;
  color: #003e86;
  border: 1px solid #ffc107;
}

.action-btn-secondary:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.action-btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-box {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  padding: 1rem 1.25rem;
}

@media (min-width: 576px) {
  .profile-photo {
    width: 180px;
    height: 180px;
  }
}

@media (min-width: 768px) {
  .profile-photo {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 767.98px) {
  .page-header {
    padding: 1rem;
  }

  .action-buttons .btn,
  .action-btn-primary,
  .action-btn-secondary {
    width: 100%;
  }
}
</style>