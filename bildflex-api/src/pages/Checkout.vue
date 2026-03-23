<template>
  <div class="container mt-5">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <h1 class="m-0">Checkout</h1>

      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="goToCart">
          Back to Cart
        </button>
        <button class="btn btn-outline-secondary" @click="goToProducts">
          Continue Shopping
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <p>Loading checkout...</p>
    </div>

    <!-- Empty Cart -->
    <div v-else-if="cartItems.length === 0" class="text-center py-5">
      <h5 class="mb-3">Your cart is empty.</h5>
      <button class="btn btn-primary" @click="goToProducts">Go Shopping</button>
    </div>

    <!-- Checkout Layout -->
    <div v-else class="row">
      <!-- Form -->
      <div class="col-lg-7 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">Shipping Information</h5>

            <!-- UI only (backend doesn't store these yet) -->
            <form @submit.prevent="placeOrder">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Full Name</label>
                  <input class="form-control" v-model="fullName" required />
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Mobile No.</label>
                  <input class="form-control" v-model="mobileNo" required />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Complete Address</label>
                <textarea class="form-control" rows="3" v-model="address" required></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Notes (optional)</label>
                <textarea class="form-control" rows="2" v-model="notes"></textarea>
              </div>

              <button class="btn btn-primary w-100" type="submit" :disabled="placing">
                {{ placing ? "Placing order..." : "Place Order" }}
              </button>

            </form>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">Order Summary</h5>

            <ul class="list-group mb-3">
              <li
                v-for="item in cartItems"
                :key="item.productId"
                class="list-group-item d-flex justify-content-between align-items-start"
              >
                <div class="me-2">
                  <div class="fw-semibold">{{ item.name || "Loading..." }}</div>
                  <small class="text-muted">
                    ₱ {{ formatPrice(item.price) }} × {{ item.quantity }}
                  </small>
                </div>

                <div class="fw-semibold">
                  ₱ {{ formatPrice(item.price * item.quantity) }}
                </div>
              </li>
            </ul>

            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Items</span>
              <span class="fw-semibold">{{ totalItems }}</span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Subtotal</span>
              <span class="fw-semibold">₱ {{ formatPrice(subtotal) }}</span>
            </div>

            <hr />

            <div class="d-flex justify-content-between">
              <span class="fw-bold">Total</span>
              <span class="fw-bold">₱ {{ formatPrice(subtotal) }}</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-3">
          <button class="btn btn-outline-primary" @click="scrollToTop">Back to Top</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { Notyf } from "notyf"
import api from "../api"
import { useGlobalStore } from "../stores/global"

const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

const loading = ref(false)
const placing = ref(false)

const cartItems = ref([])

const fullName = ref("")
const mobileNo = ref("")
const address = ref("")
const notes = ref("")

const requireLogin = () => {
  if (!store.user.token) {
    notyf.error("Please login to place an order.")
    router.push({ path: "/login", query: { redirect: "/checkout" } })
    return false
  }
  return true
}

const formatPrice = (value) => {
  const n = Number(value)
  return Number.isFinite(n) ? n.toFixed(2) : value
}

const totalItems = computed(() =>
  cartItems.value.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
)

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0)
)

const goToCart = () => router.push("/cart")
const goToProducts = () => router.push("/active-products")
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

const loadCartFromBackend = async () => {
  if (!requireLogin()) return

  try {
    loading.value = true

    // ✅ GET /cart/get-cart -> { cart }
    const res = await api.get("/cart/get-cart")
    const cart = res.data.cart
    const baseItems = cart?.cartItems || []

    // Enrich with product details using GET /products/:id -> { product }
    const enriched = await Promise.all(
      baseItems.map(async (ci) => {
        try {
          const pr = await api.get(`/products/${ci.productId}`)
          const p = pr.data.product
          return {
            productId: ci.productId,
            quantity: ci.quantity,
            subtotal: ci.subtotal,
            name: p?.name,
            price: p?.price
          }
        } catch {
          return {
            productId: ci.productId,
            quantity: ci.quantity,
            subtotal: ci.subtotal,
            name: "Unknown Product",
            price: 0
          }
        }
      })
    )

    cartItems.value = enriched
  } catch (error) {
    if (error?.response?.status === 404) {
      cartItems.value = []
      return
    }
    console.error("Load cart error:", error)
    notyf.error(error?.response?.data?.message || "Failed to load cart")
    cartItems.value = []
  } finally {
    loading.value = false  
  }
}

const placeOrder = async () => {
  if (!requireLogin()) return
  if (cartItems.value.length === 0) {
    notyf.error("Your cart is empty.")
    return
  }

  const ok = window.confirm("Confirm checkout and place this order?")
  if (!ok) return

  try {
    placing.value = true

    // ✅ MATCH BACKEND: Create order from cart
    await api.post("/orders/checkout")  

    // ✅ RECOMMENDED: Clear cart after successful order
    await api.put("/cart/clear-cart")

    notyf.success("Order placed successfully!")
    router.push("/my-orders") 
  } catch (error) {
    console.error("Place order error:", error)
    notyf.error(error?.response?.data?.message || "Failed to place order.")
  } finally {
    placing.value = false
  }
}

onMounted(loadCartFromBackend)
</script>