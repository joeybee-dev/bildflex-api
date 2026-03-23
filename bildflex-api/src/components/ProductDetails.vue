<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Notyf } from "notyf"
import api from "../api"
import { useGlobalStore } from "../stores/global"

const store = useGlobalStore()

const route = useRoute()
const router = useRouter()
const notyf = new Notyf()

const product = ref(null)
const quantity = ref(1)
const adding = ref(false)

const fetchProduct = async () => {
  try {
    const res = await api.get(`/products/${route.params.id}`)
    product.value = res.data.product
  } catch (error) {
    console.error("Error fetching product:", error)
    notyf.error(error?.response?.data?.error || "Failed to load product")
  }
}

const normalizeQty = () => {
  const q = Math.floor(Number(quantity.value))
  quantity.value = Number.isFinite(q) && q >= 1 ? q : 1
}

const increaseQty = () => {
  normalizeQty()
  quantity.value += 1
}

const decreaseQty = () => {
  normalizeQty()
  if (quantity.value > 1) quantity.value -= 1
}

const addToCart = async () => {
  if (!product.value) {
    notyf.error("Product is still loading.")
    return
  }

  normalizeQty()

  // ✅ NOT LOGGED IN -> redirect to login and return back to this product
  if (!store.user.token) {
    notyf.error("You need to login to make an order.")
    router.push({
      path: "/login",
      query: { redirect: route.fullPath }
    })
    return
  }

  try {
    adding.value = true

    const subtotal = Number(product.value.price) * Number(quantity.value)

    // ✅ MATCH BACKEND: POST /cart/add-to-cart
    await api.post("/cart/add-to-cart", {
      productId: product.value._id,
      quantity: quantity.value,
      subtotal
    })

    notyf.success("Product added to cart!")
    router.push("/cart")
  } catch (error) {
    console.error("Add to cart error:", error)
    notyf.error(error?.response?.data?.message || "Failed to add item to cart")
  } finally {
    adding.value = false
  }
}

const formatPrice = (value) => {
  const n = Number(value)
  return Number.isFinite(n) ? n.toFixed(2) : value
}

onMounted(fetchProduct)
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Product Details</h1>

    <div v-if="!product" class="text-center py-5">
      <p>Loading product...</p>
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-5">
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title fw-bold text-center mb-2">
              {{ product.name }}
            </h3>

            <p class="card-text text-muted text-center mb-3">
              {{ product.description }}
            </p>

            <h4 class="text-primary text-center mb-4">
              ₱ {{ formatPrice(product.price) }}
            </h4>

            <!-- Quantity -->
            <div class="mb-4">
              <label class="form-label fw-bold">Quantity</label>

              <div class="input-group">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="decreaseQty"
                  :disabled="adding"
                >
                  -
                </button>

                <input
                  type="number"
                  class="form-control text-center"
                  v-model.number="quantity"
                  min="1"
                  @blur="normalizeQty"
                  :disabled="adding"
                />

                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="increaseQty"
                  :disabled="adding"
                >
                  +
                </button>
              </div>

              <small class="text-muted d-block mt-2">
                Subtotal: ₱ {{ formatPrice(Number(product.price) * Number(quantity)) }}
              </small>
            </div>

            <!-- Add to Cart -->
            <button class="btn btn-primary w-100 mt-auto" @click="addToCart" :disabled="adding">
              {{ adding ? "Adding..." : "Add to Cart" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>