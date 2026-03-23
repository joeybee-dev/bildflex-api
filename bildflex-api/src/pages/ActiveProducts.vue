<template>
  <div class="container mt-5">

    <!-- ================= HEADER SECTION ================= -->
    <div class="position-relative mb-5" style="min-height: 120px;">

      <!-- CENTERED TITLE -->
      <div class="position-absolute top-50 start-50 translate-middle text-center">
        <h1 class="mb-1">Our Products</h1>
        <h4 class="text-muted mb-0">Stronger Together — Shop Local, Shop Wide</h4>

        <div v-if="isLoggedIn" class="mt-2">
          <small class="text-muted">
            Welcome <span class="fw-semibold">{{ displayName }}</span>!
          </small>
        </div>
      </div>

      <!-- RIGHT SIDE BUTTON -->
      <div class="position-absolute top-50 end-0 translate-middle-y">
        <button
          v-if="isLoggedIn"
          class="btn btn-outline-primary"
          @click="goToMyOrders"
        >
          My Orders
        </button>
      </div>

    </div>
    <!-- ================================================== -->


    <!-- ================= PRODUCTS GRID ================= -->
    <div class="row">
      <div
        v-for="product in activeProducts"
        :key="product._id"
        class="col-12 col-md-4 mb-4"
      >
        <div
          class="card h-100 shadow-sm product-card"
          role="button"
          tabindex="0"
          @click="goToDetails(product._id)"
          @keydown.enter="goToDetails(product._id)"
        >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>

            <p class="card-text flex-grow-1">
              {{ product.description }}
            </p>

            <h6 class="text-primary mb-0">
              ₱ {{ formatPrice(product.price) }}
            </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- ================================================== -->


    <!-- EMPTY STATE -->
    <div v-if="!loading && activeProducts.length === 0" class="text-center mt-4">
      <p>No active products available.</p>
    </div>

    <!-- LOADING STATE -->
    <div v-if="loading" class="text-center mt-4">
      <p>Loading products...</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import api from "../api"
import { useGlobalStore } from "../stores/global"

const router = useRouter()
const store = useGlobalStore()

const activeProducts = ref([])
const loading = ref(false)
const hasPendingOrders = ref(false)

const isLoggedIn = computed(() => !!store.user?.token)
const displayName = computed(() => {
  const first = store.user?.firstName
  const last = store.user?.lastName
  if (first && last) return `${first} ${last}`
  return first || store.user?.email || "User"
})


/* ================= FETCH PRODUCTS ================= */
const fetchActiveProducts = async () => {
  try {
    loading.value = true
    const res = await api.get("/products/active")
    activeProducts.value = res.data
  } catch (error) {
    console.error("Error fetching active products:", error)
    activeProducts.value = []
  } finally {
    loading.value = false
  }
}

/* ================= CHECK CART STATUS ================= */
const fetchCartStatus = async () => {
  if (!isLoggedIn.value) {
    hasPendingOrders.value = false
    return
  }

  try {
    let res
    try {
      res = await api.get("/cart")
    } catch (_) {
      res = await api.get("/cart/get-cart")
    }

    const cart = res.data?.cart ?? res.data
    const items = cart?.cartItems ?? cart?.items ?? []

    hasPendingOrders.value = Array.isArray(items) && items.length > 0
  } catch (error) {
    console.error("Error fetching cart status:", error)
    hasPendingOrders.value = false
  }
}

/* ================= NAVIGATION ================= */
const goToDetails = (id) => {
  router.push(`/product/${id}`)
}

const goToMyOrders = () => {
  router.push("/my-orders")
}

/* ================= UTIL ================= */
const formatPrice = (value) => {
  const n = Number(value)
  return Number.isFinite(n) ? n.toFixed(2) : value
}

/* ================= LIFECYCLE ================= */
onMounted(async () => {
  await fetchActiveProducts()
  await fetchCartStatus()
})

watch(
  () => store.user?.token,
  async () => {
    await fetchCartStatus()
  }
)
</script>

<style scoped>
.product-card {
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}
</style>