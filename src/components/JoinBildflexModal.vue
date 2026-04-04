<template>
  <div
    class="modal fade"
    id="joinBildflexModal"
    tabindex="-1"
    aria-labelledby="joinBildflexModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content join-modal border-0 shadow-lg">
        <div class="join-header text-center">
          <h2 id="joinBildflexModalLabel" class="join-title mb-2">
            Join Bildflex As
          </h2>
          <p class="join-subtitle mb-0">
            Choose your professional category to create your account.
          </p>
        </div>

        <div class="modal-body p-4 p-md-5">
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
            <button
              type="button"
              class="btn btn-outline-secondary close-btn"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToRegister = (path) => {
  const modalElement = document.getElementById("joinBildflexModal");

  if (modalElement) {
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    modalElement.setAttribute("aria-hidden", "true");
    modalElement.removeAttribute("aria-modal");
  }

  document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");

  router.push(path);
};
</script>

<style scoped>
.join-modal {
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

.close-btn {
  min-height: 48px;
  border-radius: 12px;
  font-weight: 700;
}

:deep(.modal-dialog) {
  max-width: 520px;
}
</style>