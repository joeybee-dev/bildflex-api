<template>
  <div class="py-5 bg-light min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-4 p-md-5">
              <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h2 class="fw-bold mb-0">Update Your Profile</h2>
                <router-link to="/details-user" class="btn btn-outline-secondary">
                  Back
                </router-link>
              </div>

              <form @submit.prevent="updateUser">
                <div class="row g-3">
                  <div class="col-12">
                    <div class="d-flex flex-column flex-sm-row align-items-center gap-3">
                      <button
                        type="button"
                        class="profile-preview-btn border-0 bg-transparent p-0"
                        @click="openPhotoModal"
                      >
                        <img
                          :src="photoPreview"
                          alt="Profile Preview"
                          class="profile-preview rounded-circle border shadow-sm"
                        />
                      </button>

                      <div class="text-center text-sm-start"></div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Last Name</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Gender</label>
                    <select v-model="form.gender" class="form-select">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Birth Year</label>
                    <input
                      v-model.number="form.birthYear"
                      type="number"
                      class="form-control"
                      min="1900"
                      :max="currentYear"
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">Mobile No</label>
                    <input
                      v-model="form.mobileNo"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label">City</label>
                    <input
                      v-model="form.city"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label">Province</label>
                    <input
                      v-model="form.province"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label">Country</label>
                    <input
                      v-model="form.country"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Bio</label>
                    <textarea
                      v-model="form.bio"
                      class="form-control"
                      rows="4"
                    ></textarea>
                  </div>

                  <div class="col-12 pt-2">
                    <div class="d-grid">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="loading || photoUploading"
                      >
                        {{ loading ? "Updating..." : "Save Changes" }}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div
                v-if="showPhotoModal"
                class="photo-modal-overlay"
                @click.self="closePhotoModal"
              >
                <div class="photo-modal card border-0 shadow">
                  <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h5 class="fw-bold mb-0">Upload Profile Photo</h5>
                      <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="closePhotoModal"
                      ></button>
                    </div>

                    <div class="text-center mb-3">
                      <img
                        :src="modalPreview"
                        alt="Selected Preview"
                        class="modal-preview rounded-circle border shadow-sm"
                      />
                    </div>

                    <input
                      ref="fileInput"
                      type="file"
                      class="d-none"
                      accept="image/*"
                      @change="handleFileChange"
                    />

                    <div class="d-grid gap-2">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="triggerFilePicker"
                      >
                        Choose File
                      </button>

                      <button
                        type="button"
                        class="btn btn-primary"
                        :disabled="!selectedFile || photoUploading"
                        @click="uploadPhoto"
                      >
                        {{ photoUploading ? "Uploading..." : "Upload Photo" }}
                      </button>

                      <button
                        v-if="form.profilePhoto || localPreview"
                        type="button"
                        class="btn btn-outline-danger"
                        :disabled="photoUploading"
                        @click="removePhoto"
                      >
                        Delete Photo
                      </button>
                    </div>

                    <div class="small text-muted text-center mt-3">
                      JPG, JPEG, PNG, or WEBP only.
                    </div>
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
import { computed, onMounted, onBeforeUnmount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";
import defaultMale from "@/assets/images/default-male.jpg";
import defaultFemale from "@/assets/images/default-female.jpg";

const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);
const photoUploading = ref(false);
const currentYear = new Date().getFullYear();

const fileInput = ref(null);
const selectedFile = ref(null);
const localPreview = ref("");
const showPhotoModal = ref(false);

const form = reactive({
  profilePhoto: "",
  firstName: "",
  lastName: "",
  gender: "Prefer not to say",
  birthYear: null,
  mobileNo: "",
  city: "",
  province: "",
  country: "Philippines",
  bio: "",
  subscriptionPlan: "free",
  notificationSettings: {
    emailNotifications: true,
    smsNotifications: false,
    inquiryNotifications: true,
    marketingNotifications: false
  }
});

const fallbackPreview = computed(() => {
  if (form.gender === "Male") return defaultMale;
  if (form.gender === "Female") return defaultFemale;
  return defaultMale;
});

const photoPreview = computed(() => {
  if (localPreview.value) return localPreview.value;
  if (form.profilePhoto) return form.profilePhoto;
  return fallbackPreview.value;
});

const modalPreview = computed(() => {
  if (localPreview.value) return localPreview.value;
  if (form.profilePhoto) return form.profilePhoto;
  return fallbackPreview.value;
});

const openPhotoModal = () => {
  showPhotoModal.value = true;
};

const closePhotoModal = () => {
  showPhotoModal.value = false;
};

const triggerFilePicker = () => {
  fileInput.value?.click();
};

const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  selectedFile.value = file;

  if (localPreview.value) {
    URL.revokeObjectURL(localPreview.value);
  }

  localPreview.value = URL.createObjectURL(file);
};

const uploadPhoto = async () => {
  if (!selectedFile.value) {
    notyf.error("Please choose a photo first.");
    return;
  }

  try {
    photoUploading.value = true;

    const formData = new FormData();
    formData.append("image", selectedFile.value);

    const response = await api.post("/users/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    form.profilePhoto = response.data.imageUrl;
    selectedFile.value = null;

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    if (localPreview.value) {
      URL.revokeObjectURL(localPreview.value);
      localPreview.value = "";
    }

    notyf.success(response.data.message || "Photo uploaded successfully.");
    closePhotoModal();
  } catch (err) {
    console.error("Upload photo error:", err);
    notyf.error(err.response?.data?.error || "Failed to upload photo.");
  } finally {
    photoUploading.value = false;
  }
};

const removePhoto = () => {
  form.profilePhoto = "";
  selectedFile.value = null;

  if (localPreview.value) {
    URL.revokeObjectURL(localPreview.value);
  }

  localPreview.value = "";

  if (fileInput.value) {
    fileInput.value.value = "";
  }

  notyf.success("Photo removed.");
  closePhotoModal();
};

const fetchUserDetails = async () => {
  try {
    const response = await api.get("/users/details-user");
    const user = response.data.user;

    form.profilePhoto = user.profilePhoto || "";
    form.firstName = user.firstName || "";
    form.lastName = user.lastName || "";
    form.gender = user.gender || "Prefer not to say";
    form.birthYear = user.birthYear || null;
    form.mobileNo = user.mobileNo || "";
    form.city = user.city || "";
    form.province = user.province || "";
    form.country = user.country || "Philippines";
    form.bio = user.bio || "";
    form.subscriptionPlan = user.subscriptionPlan || "free";
    form.notificationSettings = {
      emailNotifications: user.notificationSettings?.emailNotifications ?? true,
      smsNotifications: user.notificationSettings?.smsNotifications ?? false,
      inquiryNotifications: user.notificationSettings?.inquiryNotifications ?? true,
      marketingNotifications: user.notificationSettings?.marketingNotifications ?? false
    };
  } catch (err) {
    console.error("Fetch user details error:", err);
    notyf.error(err.response?.data?.error || "Failed to load user details.");
  }
};

const updateUser = async () => {
  try {
    loading.value = true;

    const payload = {
      profilePhoto: form.profilePhoto,
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      birthYear: form.birthYear,
      mobileNo: form.mobileNo,
      city: form.city,
      province: form.province,
      country: form.country,
      bio: form.bio,
      subscriptionPlan: form.subscriptionPlan,
      notificationSettings: form.notificationSettings
    };

    const response = await api.patch("/users/edit-user", payload);

    notyf.success(response.data.message || "User updated successfully.");
    router.push("/details-user");
  } catch (err) {
    console.error("Update user error:", err);
    notyf.error(err.response?.data?.error || "Failed to update user.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserDetails();
});

onBeforeUnmount(() => {
  if (localPreview.value) {
    URL.revokeObjectURL(localPreview.value);
  }
});
</script>

<style scoped>
.profile-preview-btn {
  cursor: pointer;
  border-radius: 50%;
}

.profile-preview {
  width: 110px;
  height: 110px;
  object-fit: cover;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.profile-preview-btn:hover .profile-preview {
  transform: scale(1.03);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.photo-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.photo-modal {
  width: 100%;
  max-width: 420px;
  border-radius: 1rem;
}

.modal-preview {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

@media (max-width: 575.98px) {
  .profile-preview {
    width: 96px;
    height: 96px;
  }

  .modal-preview {
    width: 120px;
    height: 120px;
  }
}
</style>