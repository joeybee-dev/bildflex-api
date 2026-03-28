<template>
  <div class="feedback-page py-4 py-md-5">
    <div class="container">
      <div class="page-header mb-4">
        <h2 class="page-title mb-1">Feedback</h2>
        <p class="page-subtitle mb-0">
          Share your comments, suggestions, or concerns with us.
        </p>
      </div>

      <div class="card feedback-card border-0 shadow-sm overflow-hidden">
        <div class="feedback-header"></div>

        <div class="card-body p-3 p-sm-4 p-md-5">
          <form @submit.prevent="submitFeedback">
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label for="name" class="form-label">Full Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div class="col-12 col-md-6">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="col-12 col-md-6">
                <label for="category" class="form-label">Category</label>
                <select
                  id="category"
                  v-model="form.category"
                  class="form-select"
                  required
                >
                  <option disabled value="">Select category</option>
                  <option value="General">General</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Service Provider">Service Provider</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label for="rating" class="form-label">Rating</label>
                <select
                  id="rating"
                  v-model="form.rating"
                  class="form-select"
                  required
                >
                  <option disabled value="">Select rating</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>

              <div class="col-12">
                <label for="subject" class="form-label">Subject</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  class="form-control"
                  placeholder="Enter feedback subject"
                  required
                />
              </div>

              <div class="col-12">
                <label for="message" class="form-label">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-control message-textarea"
                  rows="6"
                  placeholder="Write your feedback here"
                  required
                ></textarea>
              </div>
            </div>

            <div class="d-grid d-md-flex justify-content-md-end gap-2 mt-4">
              <button
                type="button"
                class="btn action-btn-secondary"
                @click="resetForm"
              >
                Clear
              </button>

              <button
                type="submit"
                class="btn action-btn-primary"
                :disabled="loading"
              >
                {{ loading ? "Submitting..." : "Submit" }}
              </button>
            </div>
          </form>

          <div v-if="successMessage" class="success-box shadow-sm mt-4">
            {{ successMessage }}
          </div>

          <div v-if="errorMessage" class="error-box shadow-sm mt-4">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/services/api";

const notyf = new Notyf();
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const initialState = () => ({
  name: "",
  email: "",
  category: "",
  rating: "",
  subject: "",
  message: ""
});

const form = reactive(initialState());

const resetForm = () => {
  Object.assign(form, initialState());
  successMessage.value = "";
  errorMessage.value = "";
};

const submitFeedback = async () => {
  try {
    loading.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    const payload = {
      name: form.name,
      email: form.email,
      category: form.category,
      rating: form.rating,
      subject: form.subject,
      message: form.message
    };

    const response = await api.post("/feedback", payload);

    const message =
      response.data?.message || "Thank you. Your feedback has been submitted.";

    successMessage.value = message;
    notyf.success(message);
    resetForm();
  } catch (err) {
    console.error("Submit feedback error:", err);
    errorMessage.value =
      err.response?.data?.error || "Failed to submit feedback.";
    notyf.error(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.feedback-page {
  min-height: 100vh;
  background-color: #f4f6f8;
}

.page-header {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-left: 4px solid #ffc107;
  border-radius: 18px;
  padding: 1.25rem;
}

.page-title {
  color: #003e86;
  font-weight: 800;
  margin: 0;
}

.page-subtitle {
  color: #6c757d;
  font-size: 0.96rem;
}

.feedback-card {
  border-radius: 22px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
}

.feedback-header {
  height: 14px;
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
}

.form-label {
  color: #6c757d;
  font-size: 0.83rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 0.45rem;
}

.form-control,
.form-select {
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.18);
  color: #003e86;
  background-color: #ffffff;
}

.form-control:focus,
.form-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.18);
}

.form-control::placeholder,
.message-textarea::placeholder {
  color: #9aa4b2;
}

.message-textarea {
  min-height: 140px;
  resize: vertical;
}

.action-btn-primary,
.action-btn-secondary {
  min-width: 160px;
  min-height: 46px;
  border-radius: 12px;
  font-weight: 700;
}

.action-btn-primary {
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
}

.action-btn-primary:hover:not(:disabled) {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.action-btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.action-btn-secondary {
  background-color: transparent;
  color: #003e86;
  border: 1px solid #ffc107;
}

.action-btn-secondary:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.success-box,
.error-box {
  border-radius: 14px;
  padding: 1rem 1.25rem;
  font-weight: 600;
}

.success-box {
  background-color: #f4f6f8;
  border: 1px solid rgba(0, 62, 134, 0.12);
  border-left: 4px solid #ffc107;
  color: #003e86;
}

.error-box {
  color: #842029;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
}

@media (max-width: 767.98px) {
  .page-header {
    padding: 1rem;
  }

  .action-btn-primary,
  .action-btn-secondary {
    width: 100%;
  }
}
</style>