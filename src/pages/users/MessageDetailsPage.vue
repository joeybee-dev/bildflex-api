<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">Message Details</h2>
          <p class="auth-subtitle mb-0">Read the full message and reply details.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else class="row g-4">
            <div class="col-12 col-md-6">
              <div class="info-box">
                <label class="form-label">From</label>
                <div>{{ message.senderName || message.senderEmail || "-" }}</div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="info-box">
                <label class="form-label">Subject</label>
                <div>{{ message.subject || "-" }}</div>
              </div>
            </div>

            <div class="col-12">
              <div class="info-box info-box-lg">
                <label class="form-label">Message</label>
                <div>{{ message.message || "-" }}</div>
              </div>
            </div>

            <div class="col-12" v-if="message.reply">
              <div class="info-box info-box-lg">
                <label class="form-label">Reply</label>
                <div>{{ message.reply }}</div>
              </div>
            </div>

            <div class="col-12">
              <router-link to="/messages" class="btn login-btn">Back to Messages</router-link>
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
const message = reactive({});

const fetchMessage = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/messages/${route.params.id}`);
    Object.assign(message, response.data?.message || response.data || {});
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.error || "Failed to load message details.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMessage);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; display: flex; align-items: center; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); width: 100%; }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title, .form-label { color: #003e86; }
.auth-title { font-weight: 800; }
.auth-subtitle { color: #003e86; }
.form-label { font-weight: 700; margin-bottom: .45rem; display: block; }
.info-box { min-height: 48px; border-radius: 12px; border: 1px solid rgba(0,62,134,.18); padding: .85rem 1rem; color: #003e86; background: #fff; }
.info-box-lg { min-height: 140px; }
.login-btn { min-height: 50px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
</style>