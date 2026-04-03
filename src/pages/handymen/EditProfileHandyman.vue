<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Edit Handyman Profile</h2>
              <p class="auth-subtitle mb-0">Update your handyman information.</p>
            </div>

            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="updateProfile">
                <div class="row g-3">
                  <div class="col-12 col-md-6"><label class="form-label">Business Name</label><input v-model.trim="form.businessName" class="form-control" type="text" /></div>
                  <div class="col-12 col-md-6"><label class="form-label">Contact Person</label><input v-model.trim="form.contactPerson" class="form-control" type="text" /></div>
                  <div class="col-12 col-md-6"><label class="form-label">Mobile Number</label><input v-model.trim="form.mobileNumber" class="form-control" type="text" /></div>
                  <div class="col-12 col-md-6"><label class="form-label">City</label><input v-model.trim="form.city" class="form-control" type="text" /></div>
                  <div class="col-12"><label class="form-label">Specialization</label><input v-model.trim="form.specialization" class="form-control" type="text" /></div>
                  <div class="col-12"><label class="form-label">About Business</label><textarea v-model.trim="form.aboutBusiness" class="form-control textarea-control"></textarea></div>
                </div>

                <div class="d-flex flex-column flex-md-row gap-2 mt-4">
                  <button class="btn login-btn" type="submit" :disabled="loading">
                    {{ loading ? "Saving..." : "Save Changes" }}
                  </button>
                  <router-link to="/handyman/profile" class="btn btn-outline-secondary custom-outline-btn">Cancel</router-link>
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
  businessName: "",
  contactPerson: "",
  mobileNumber: "",
  city: "",
  specialization: "",
  aboutBusiness: ""
});

const fetchProfile = async () => {
  try {
    loading.value = true;
    const response = await api.get("/handymen/details");
    const handyman = response.data?.handyman || {};
    Object.assign(form, {
      businessName: handyman.businessName || "",
      contactPerson: handyman.contactPerson || "",
      mobileNumber: handyman.mobileNumber || "",
      city: handyman.city || "",
      specialization: handyman.specialization || "",
      aboutBusiness: handyman.aboutBusiness || ""
    });
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load handyman profile.");
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  try {
    loading.value = true;
    const response = await api.patch("/handymen/update-profile", form);
    notyf.success(response.data?.message || "Profile updated successfully.");
    router.push("/handyman/profile");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to update profile.");
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
.auth-title,.form-label { color: #003e86; }
.auth-title { font-weight: 800; }
.auth-subtitle { color: #003e86; }
.form-label { font-weight: 700; margin-bottom: .45rem; }
.form-control { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); }
.textarea-control { min-height: 120px; padding-top: .85rem; }
.form-control:focus { border-color: #ffc107; box-shadow: 0 0 0 .2rem rgba(255,193,7,.18); }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.custom-outline-btn { min-height: 50px; border-radius: 12px; font-weight: 700; }
</style>