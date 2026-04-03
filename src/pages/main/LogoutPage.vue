<template>
  <div class="auth-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card auth-card border-0 shadow-sm">
            <div class="auth-header text-center">
              <h2 class="auth-title mb-2">Logging Out</h2>
              <p class="auth-subtitle mb-0">
                Please wait while we securely sign you out.
              </p>
            </div>

            <div class="card-body p-4 p-md-5 text-center">
              <div class="spinner-border text-warning mb-3" role="status">
                <span class="visually-hidden">Logging out...</span>
              </div>
              <p class="auth-footer-text mb-0">Signing you out...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  userStore.logout();
  router.replace("/login");
});
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

.auth-footer-text {
  color: #6c757d;
  font-weight: 500;
}

.spinner-border.text-warning {
  width: 3rem;
  height: 3rem;
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

  .auth-title {
    font-size: 1.6rem;
  }
}
</style>