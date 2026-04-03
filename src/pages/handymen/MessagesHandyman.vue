<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">Messages</h2>
          <p class="auth-subtitle mb-0">Review messages and replies for your handyman account.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else-if="messages.length === 0" class="empty-state text-center py-5">
            <h5 class="mb-2">No messages found</h5>
            <p class="text-muted mb-0">Your messages will appear here.</p>
          </div>

          <div v-else class="list-group custom-list-group">
            <router-link
              v-for="message in messages"
              :key="message._id"
              :to="`/handyman/messages/${message._id}`"
              class="list-group-item list-group-item-action custom-list-item"
            >
              <div class="d-flex w-100 justify-content-between align-items-start gap-3">
                <div>
                  <h5 class="mb-1 content-title">{{ message.subject || "Message" }}</h5>
                  <p class="mb-1 content-meta">
                    From: {{ message.senderName || message.senderEmail || "-" }}
                  </p>
                  <small class="content-text">{{ message.message || "-" }}</small>
                </div>
                <small class="text-muted">{{ formatDate(message.createdAt) }}</small>
              </div>
            </router-link>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);
const messages = ref([]);

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const fetchMessages = async () => {
  try {
    loading.value = true;
    const response = await api.get("/handymen/messages");
    messages.value = response.data?.messages || [];
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load messages.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMessages);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; }
.auth-subtitle { color: #003e86; }
.custom-list-group { gap: 1rem; display: flex; flex-direction: column; }
.custom-list-item { border: 1px solid rgba(0,62,134,.12); border-radius: 18px !important; padding: 1rem 1.25rem; }
.custom-list-item:hover { background-color: #fffdf4; }
.content-title { color: #003e86; font-weight: 800; }
.content-meta,.content-text { color: #6c757d; }
.empty-state h5 { color: #003e86; font-weight: 800; }
</style>