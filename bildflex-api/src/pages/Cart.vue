<template>
  <div class="container mt-5">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
      <h1 class="m-0">Cart</h1>

      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="goToProducts">
          Continue Shopping
        </button>
        <button class="btn btn-outline-danger" @click="clearCart" :disabled="cartItems.length === 0 || loading">
          Clear Cart
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <p>Loading cart...</p>
    </div>

    <div v-else-if="cartItems.length === 0" class="text-center py-5">
      <h5 class="mb-3">Your cart is empty.</h5>
      <button class="btn btn-primary" @click="goToProducts">Go Shopping</button>
    </div>

    <div v-else class="row">
      <div class="col-lg-8 mb-4">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th style="width: 40%">Product</th>
                <th style="width: 15%">Price</th>
                <th style="width: 25%">Quantity</th>
                <th style="width: 15%">Subtotal</th>
                <th style="width: 5%" class="text-end"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in cartItems" :key="item.productId">
                <td class="fw-semibold">
                  {{ item.name || "Loading..." }}
                </td>

                <td>
                  ₱ {{ formatPrice(item.price) }}
                </td>

                <td>
                  <div class="input-group" style="max-width: 160px;">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      :disabled="updatingId === item.productId"
                      @click="changeQty(item, item.quantity - 1)"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      class="form-control text-center"
                      :value="item.quantity"
                      min="1"
                      :disabled="updatingId === item.productId"
                      @change="onQtyInput(item, $event)"
                    />

                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      :disabled="updatingId === item.productId"
                      @click="changeQty(item, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>
                  ₱ {{ formatPrice(item.price * item.quantity) }}
                </td>

                <td class="text-end">
                  <button
                    class="btn btn-sm btn-outline-danger"
                    :disabled="updatingId === item.productId"
                    @click="removeItem(item.productId)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3">Order Summary</h5>

            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Items</span>
              <span class="fw-semibold">{{ totalItems }}</span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Subtotal</span>
              <span class="fw-semibold">₱ {{ formatPrice(subtotal) }}</span>
            </div>

            <hr />

            <div class="d-flex justify-content-between mb-3">
              <span class="fw-bold">Total</span>
              <span class="fw-bold">₱ {{ formatPrice(subtotal) }}</span>
            </div>

            <button class="btn btn-primary w-100" @click="goToCheckout">
              Checkout
            </button>

          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-4" v-if="cartItems.length">
      <button class="btn btn-outline-primary" @click="scrollToTop">Back to Top</button>
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
const updatingId = ref(null)

// We will store an enriched list: { productId, quantity, subtotal(from backend), name, price }
const cartItems = ref([])

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

const requireLogin = () => {
  if (!store.user.token) {
    notyf.error("Please login first.")
    router.push({ path: "/login", query: { redirect: "/cart" } })
    return false
  }
  return true
}

const loadCart = async () => {
  if (!requireLogin()) return

  try {
    loading.value = true

    // ✅ MATCH BACKEND:
    // GET /cart/get-cart -> { cart }
    const res = await api.get("/cart/get-cart")
    const cart = res.data.cart

    // Base items from backend
    const baseItems = cart?.cartItems || []

    // Enrich each item with product details (name/price)
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
    // 404 means "No cart found" in your controller
    if (error?.response?.status === 404) {
      cartItems.value = []
      return
    }

    console.error("Error loading cart:", error)
    notyf.error(error?.response?.data?.message || "Failed to load cart")
    cartItems.value = []
  } finally {
    loading.value = false
  }
}

// Change quantity (calls backend PATCH /cart/update-cart-quantity)
const changeQty = async (item, newQty) => {
  if (!requireLogin()) return
  const qty = Math.floor(Number(newQty))
  if (!Number.isFinite(qty) || qty < 1) return

  try {
    updatingId.value = item.productId

    // Backend needs productId + newQuantity
    await api.patch("/cart/update-cart-quantity", {
      productId: item.productId,
      newQuantity: qty
    })

    // Update UI locally
    item.quantity = qty
    notyf.success("Cart updated")
  } catch (error) {
    console.error("Error updating cart quantity:", error)
    notyf.error(error?.response?.data?.message || "Failed to update cart")
  } finally {
    updatingId.value = null
  }
}

const onQtyInput = (item, event) => {
  const val = Number(event.target.value)
  if (!Number.isFinite(val) || val < 1) {
    event.target.value = item.quantity
    return
  }
  changeQty(item, val)
}

// Remove item (calls backend PATCH /cart/:productId/remove-from-cart)
const removeItem = async (productId) => {
  if (!requireLogin()) return

  try {
    updatingId.value = productId
    await api.patch(`/cart/${productId}/remove-from-cart`)

    cartItems.value = cartItems.value.filter((x) => x.productId !== productId)
    notyf.success("Item removed")
  } catch (error) {
    console.error("Error removing item:", error)
    notyf.error(error?.response?.data?.message || "Failed to remove item")
  } finally {
    updatingId.value = null
  }
}

// Clear cart (calls backend PUT /cart/clear-cart)
const clearCart = async () => {
  if (!requireLogin()) return

  try {
    loading.value = true
    await api.put("/cart/clear-cart")
    cartItems.value = []
    notyf.success("Cart cleared")
  } catch (error) {
    console.error("Error clearing cart:", error)
    notyf.error(error?.response?.data?.message || "Failed to clear cart")
  } finally {
    loading.value = false
  }
}

const goToProducts = () => router.push("/active-products")
const goToCheckout = () => router.push("/checkout")
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

onMounted(loadCart)
</script>