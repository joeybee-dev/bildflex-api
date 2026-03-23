<template>
  <div class="container mt-5">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
      <h1 class="m-0">Admin Dashboard</h1>

      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-primary" @click="goToAddProduct">
          Add New Product
        </button>

        <button class="btn btn-info text-white" @click="goToUserOrders">
          Show User Orders
        </button>

        <button class="btn btn-outline-secondary" @click="fetchProducts" :disabled="loading">
          <span v-if="loading">Loading...</span>
          <span v-else>Refresh</span>
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-end mb-2">
      <small class="text-muted">Total: {{ products.length }}</small>
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th style="width: 22%">Name</th>
            <th style="width: 38%">Description</th>
            <th style="width: 12%">Price</th>
            <th style="width: 18%">Availability</th>
            <th style="width: 10%" class="text-end">Action</th>
          </tr>
        </thead>

        <tbody v-if="products.length">
          <tr v-for="p in products" :key="p._id">
            <td class="fw-semibold">{{ p.name }}</td>

            <td class="text-truncate" style="max-width: 520px;">
              {{ p.description }}
            </td>

            <td>₱ {{ formatPrice(p.price) }}</td>

            <td>
              <div class="form-check form-switch m-0">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :checked="p.isActive"
                  :disabled="togglingId === p._id"
                  @change="toggleActive(p)"
                />
                <label class="form-check-label">
                  <span v-if="p.isActive" class="badge bg-success">Available</span>
                  <span v-else class="badge bg-secondary">Not available</span>
                </label>
              </div>
            </td>

            <td class="text-end">
              <button class="btn btn-sm btn-warning" @click="goToEdit(p._id)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-4">
              No products found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center mt-4">
      <button class="btn btn-outline-primary" @click="scrollToTop">
        Back to Top
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Notyf } from "notyf"
import api from "../api"

const router = useRouter()
const notyf = new Notyf()

const products = ref([])
const loading = ref(false)
const togglingId = ref(null)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const fetchProducts = async () => {
  try {
    loading.value = true
    const res = await api.get("/products/all") // admin-only
    products.value = res.data
  } catch (error) {
    console.error("Error fetching all products:", error)
    notyf.error(error?.response?.data?.error || "Failed to load products")
    products.value = []
  } finally {
    loading.value = false
  }
}

const toggleActive = async (product) => {
  const current = product.isActive
  const next = !current

  product.isActive = next
  togglingId.value = product._id

  try {
    if (next) {
      await api.patch(`/products/${product._id}/activate`)
      notyf.success("Product set to Available")
    } else {
      await api.patch(`/products/${product._id}/archive`)
      notyf.success("Product set to Not available")
    }
  } catch (error) {
    console.error("Error toggling product status:", error)
    product.isActive = current
    notyf.error(error?.response?.data?.error || "Failed to update status")
  } finally {
    togglingId.value = null
  }
}

const goToEdit = (id) => {
  router.push(`/edit-product/${id}`)
}

const goToAddProduct = () => {
  router.push("/create-product")
}

const goToUserOrders = () => {
  router.push("/admin/orders")
}

const formatPrice = (value) => {
  const n = Number(value)
  return Number.isFinite(n) ? n.toFixed(2) : value
}

onMounted(fetchProducts)
</script>