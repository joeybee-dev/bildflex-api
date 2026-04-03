<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">My Bookings</h2>
          <p class="auth-subtitle mb-0">Track your service bookings and schedules.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else-if="bookings.length === 0" class="empty-state text-center py-5">
            <h5 class="mb-2">No bookings found</h5>
            <p class="text-muted mb-0">Your bookings will appear here.</p>
          </div>

          <div v-else class="row g-4">
            <div v-for="booking in bookings" :key="booking._id" class="col-12 col-lg-6">
              <div class="content-card h-100">
                <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <h5 class="content-title mb-1">{{ booking.serviceTitle || "Booking" }}</h5>
                    <p class="content-meta mb-0">
                      With: {{ booking.professionalName || booking.providerName || "-" }}
                    </p>
                  </div>
                  <span class="status-badge">{{ booking.status || "Pending" }}</span>
                </div>

                <p class="content-text mb-2"><strong>Date:</strong> {{ formatDate(booking.bookingDate || booking.date) }}</p>
                <p class="content-text mb-3"><strong>Location:</strong> {{ booking.location || "-" }}</p>

                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <small class="text-muted">{{ formatDate(booking.createdAt) }}</small>
                  <router-link :to="`/my-bookings/${booking._id}`" class="btn login-btn btn-sm px-3">
                    View Details
                  </router-link>
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
const bookings = ref([]);

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const fetchBookings = async () => {
  try {
    loading.value = true;
    const response = await api.get("/bookings/my-bookings");
    bookings.value = response.data?.bookings || [];
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.error || "Failed to load bookings.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBookings);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; letter-spacing: .3px; }
.auth-subtitle { color: #003e86; font-size: .95rem; }
.content-card { border: 1px solid rgba(0,62,134,.12); border-radius: 18px; padding: 1.25rem; background: #fff; }
.content-title { color: #003e86; font-weight: 800; }
.content-meta, .content-text { color: #6c757d; }
.status-badge { background: rgba(255,193,7,.18); color: #003e86; padding: .45rem .75rem; border-radius: 999px; font-weight: 700; font-size: .85rem; }
.login-btn { min-height: 42px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.empty-state h5 { color: #003e86; font-weight: 800; }
</style>