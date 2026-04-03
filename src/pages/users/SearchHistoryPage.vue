<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">Search History</h2>
          <p class="auth-subtitle mb-0">View your recent searches.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else-if="searchHistory.length === 0" class="empty-state text-center py-5">
            <h5 class="mb-2">No search history found</h5>
            <p class="text-muted mb-0">Your recent search records will appear here.</p>
          </div>

          <div v-else class="row g-3">
            <div v-for="item in searchHistory" :key="item._id" class="col-12">
              <div class="content-card">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <div>
                    <h6 class="content-title mb-1">{{ item.keyword || item.query || "-" }}</h6>
                    <p class="content-meta mb-0">
                      {{ item.location || item.category || "Search entry" }}
                    </p>
                  </div>
                  <small class="text-muted">{{ formatDate(item.createdAt) }}</small>
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
import { onMounted, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);
const searchHistory = ref([]);

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const fetchSearchHistory = async () => {
  try {
    loading.value = true;
    const response = await api.get("/search-history");
    searchHistory.value = response.data?.searchHistory || response.data?.history || [];
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.error || "Failed to load search history.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSearchHistory);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; }
.auth-subtitle { color: #003e86; }
.content-card { border: 1px solid rgba(0,62,134,.12); border-radius: 18px; padding: 1rem 1.25rem; background: #fff; }
.content-title { color: #003e86; font-weight: 800; }
.content-meta { color: #6c757d; }
.empty-state h5 { color: #003e86; font-weight: 800; }
</style>