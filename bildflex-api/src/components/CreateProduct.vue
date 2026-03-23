<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Create Product</h1>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm p-4">
          <form @submit.prevent="addProduct">
            <div class="mb-3">
              <label class="form-label fw-bold">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="name"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Description</label>
              <textarea
                class="form-control"
                rows="4"
                v-model="description"
                required
              ></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Price</label>
              <input
                type="number"
                class="form-control"
                v-model.number="price"
                min="0"
                step="0.01"
                required
              />
            </div>

            <button
              class="btn btn-primary w-100"
              type="submit"
              :disabled="isLoading"
            >
              {{ isLoading ? "Adding..." : "Add Product" }}
            </button>

            <!-- ✅ Cancel Button -->
            <button
              class="btn btn-outline-secondary w-100 mt-2"
              type="button"
              @click="cancel"
              :disabled="isLoading"
            >
              Cancel
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Notyf } from "notyf"
import api from "../api"

const router = useRouter()
const notyf = new Notyf()

const name = ref("")
const description = ref("")
const price = ref(null)
const isLoading = ref(false)

const addProduct = async () => {
  try {
    isLoading.value = true

    await api.post("/products", {
      name: name.value,
      description: description.value,
      price: price.value
    })

    notyf.success("Product added successfully!")
    router.push("/admin")
  } catch (error) {
    console.error("Add product error:", error)
    const msg = error?.response?.data?.error || "Failed to add product"
    notyf.error(msg)
  } finally {
    isLoading.value = false
  }
}

const cancel = () => {
  router.push("/admin")
}
</script>