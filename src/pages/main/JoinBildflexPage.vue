<template>
  <div class="join-page py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-7 col-xl-6">
          <div class="card join-card border-0 shadow-lg">
            <div class="join-header text-center">
              <h1 class="join-title mb-2">Join Bildflex As</h1>
              <p class="join-subtitle mb-0">
                Choose your professional category to create your account.
              </p>
            </div>

            <div class="card-body p-4 p-md-5">
              <div class="d-grid gap-3">
                <button class="btn join-btn" @click="goToRegister('/handyman/register')">
                  Handyman
                </button>

                <button class="btn join-btn" @click="goToRegister('/designer/register')">
                  Designer
                </button>

                <button class="btn join-btn" @click="goToRegister('/contractor/register')">
                  Contractor
                </button>

                <button class="btn join-btn" @click="goToRegister('/supplier/register')">
                  Supplier
                </button>
              </div>

              <div class="text-center mt-4">
                <button class="btn btn-outline-secondary back-btn" @click="goBack">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="join-help-section mt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-8 text-center">
            <h2 class="help-title mb-3">Build your professional presence</h2>
            <p class="help-text mb-0">
              Join Bildflex to showcase your services, connect with clients,
              and grow your opportunities in residential, commercial, and
              industrial projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToRegister = (path) => {
  router.push(path);
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.join-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f4f6f8 0%, #ffffff 100%);
}

.join-card {
  border-radius: 24px;
  overflow: hidden;
  background-color: #ffffff;
}

.join-header {
  background-color: #003e86;
  border-bottom: 4px solid #ffc107;
  padding: 2rem 1.5rem 1.75rem;
}

.join-title {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 0.3px;
  font-size: 2rem;
}

.join-subtitle {
  color: #f4f6f8;
  font-size: 0.96rem;
}

.join-btn {
  min-height: 56px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
  transition: all 0.25s ease;
}

.join-btn:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.back-btn {
  min-height: 48px;
  border-radius: 12px;
  font-weight: 700;
  min-width: 140px;
}

.join-help-section {
  padding-bottom: 2rem;
}

.help-title {
  color: #003e86;
  font-weight: 800;
}

.help-text {
  color: #6c757d;
  font-size: 1rem;
  line-height: 1.7;
}

@media (max-width: 767.98px) {
  .join-title {
    font-size: 1.6rem;
  }

  .join-header {
    padding: 1.75rem 1.25rem 1.5rem;
  }
}
</style>