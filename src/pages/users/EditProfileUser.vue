<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Edit Profile</h2>
              <p class="auth-subtitle mb-0">
                Update your personal details.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="updateProfile">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label class="form-label">First Name</label>
                    <input v-model.trim="form.firstName" type="text" class="form-control" required />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Last Name</label>
                    <input v-model.trim="form.lastName" type="text" class="form-control" required />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Gender</label>
                    <select v-model="form.gender" class="form-control" required>
                      <option disabled value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Mobile Number</label>
                    <input v-model.trim="form.mobileNumber" type="text" class="form-control" />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">City</label>
                    <input v-model.trim="form.city" type="text" class="form-control" />
                  </div>

                  <div class="col-12 col-md-6">
                    <label class="form-label">Province</label>
                    <input v-model.trim="form.province" type="text" class="form-control" />
                  </div>

                  <div class="col-12">
                    <label class="form-label">Country</label>
                    <input v-model.trim="form.country" type="text" class="form-control" />
                  </div>

                  <div class="col-12">
                    <label class="form-label">About Me</label>
                    <textarea v-model.trim="form.aboutMe" class="form-control textarea-control"></textarea>
                  </div>
                </div>

                <div class="d-flex flex-column flex-md-row gap-2 mt-4">
                  <button type="submit" class="btn login-btn" :disabled="loading">
                    {{ loading ? "Saving..." : "Save Changes" }}
                  </button>
                  <router-link to="/profile" class="btn btn-outline-secondary custom-outline-btn">
                    Cancel
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const router = useRouter();
const notyf = new Notyf();
const loading = ref(false);

const form = reactive({
  firstName: "",
  lastName: "",
  gender: "",
  mobileNumber: "",
  city: "",
  province: "",
  country: "",
  aboutMe: ""
});

const fetchProfile = async () => {
  try {
    loading.value = true;
    const response = await api.get("/users/profile");
    const user = response.data?.user || response.data || {};

    Object.assign(form, {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      mobileNumber: user.mobileNumber || "",
      city: user.city || "",
      province: user.province || "",
      country: user.country || "",
      aboutMe: user.aboutMe || ""
    });
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.error || "Failed to load profile.");
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  try {
    loading.value = true;

    const response = await api.patch("/users/profile/edit", form);
    notyf.success(response.data?.message || "Profile updated successfully.");
    router.push("/profile");
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.error || "Failed to update profile.");
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
}

.auth-subtitle,
.form-label {
  color: #003e86;
}

.form-label {
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.form-control {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
  color: #003e86;
}

.textarea-control {
  min-height: 120px;
  padding-top: 0.85rem;
}

.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}

.login-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
}

.login-btn:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.custom-outline-btn {
  min-height: 50px;
  border-radius: 12px;
  font-weight: 700;
}
</style>