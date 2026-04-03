<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="card auth-card border-0 shadow-sm">
        <div class="auth-header text-center">
          <h2 class="auth-title mb-2">Favorites</h2>
          <p class="auth-subtitle mb-0">Saved designers, services, or client references.</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-warning" role="status"></div>
          </div>

          <div v-else-if="favorites.length === 0" class="empty-state text-center py-5">
            <h5 class="mb-2">No favorites yet</h5>
            <p class="text-muted mb-0">Saved items will appear here.</p>
          </div>

          <div v-else class="row g-4">
            <div v-for="favorite in favorites" :key="favorite._id" class="col-12 col-md-6 col-lg-4">
              <div class="content-card h-100">
                <div class="text-center mb-3">
                  <img :src="favorite.profilePhoto || fallbackImage" alt="Favorite" class="profile-image" />
                </div>

                <h5 class="content-title text-center mb-1">
                  {{ favorite.businessName || favorite.name || "Favorite" }}
                </h5>

                <p class="content-meta text-center mb-1">{{ favorite.specialization || favorite.type || "-" }}</p>
                <p class="content-meta text-center mb-3">{{ favorite.city || "-" }}</p>

                <div class="d-grid gap-2">
                  <router-link
                    :to="favorite._id ? `/designers/${favorite._id}` : '/designers'"
                    class="btn login-btn"
                  >
                    View Details
                  </router-link>

                  <button class="btn btn-outline-danger custom-outline-btn" @click="removeFavorite(favorite._id)">
                    Remove Favorite
                  </button>
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
const favorites = ref([]);
const fallbackImage = "/favicon.ico";

const fetchFavorites = async () => {
  try {
    loading.value = true;
    const response = await api.get("/designers/favorites");
    favorites.value = response.data?.favorites || [];
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to load favorites.");
  } finally {
    loading.value = false;
  }
};

const removeFavorite = async (favoriteId) => {
  try {
    const response = await api.delete(`/designers/favorites/${favoriteId}`);
    favorites.value = favorites.value.filter((item) => item._id !== favoriteId);
    notyf.success(response.data?.message || "Favorite removed.");
  } catch (err) {
    notyf.error(err.response?.data?.error || "Failed to remove favorite.");
  }
};

onMounted(fetchFavorites);
</script>

<style scoped>
.auth-page { min-height: 100vh; background-color: #f4f6f8; }
.auth-card { border-radius: 20px; overflow: hidden; background-color: #fff; border: 1px solid rgba(0,62,134,.1); }
.auth-header { border-bottom: 3px solid #ffc107; padding: 2rem 1.5rem 1.75rem; }
.auth-title { color: #003e86; font-weight: 800; }
.auth-subtitle { color: #003e86; }
.content-card { border: 1px solid rgba(0,62,134,.12); border-radius: 18px; padding: 1.25rem; background-color: #fff; }
.profile-image { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 3px solid #ffc107; }
.content-title { color: #003e86; font-weight: 800; }
.content-meta { color: #6c757d; }
.login-btn { min-height: 48px; border-radius: 12px; font-weight: 700; background-color: #003e86; color: #fff; border: 1px solid #003e86; }
.login-btn:hover { background-color: #ffc107; color: #003e86; border-color: #ffc107; }
.custom-outline-btn { min-height: 48px; border-radius: 12px; font-weight: 700; }
.empty-state h5 { color: #003e86; font-weight: 800; }
</style>