<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Edit Product</h1>

    <div v-if="loading" class="text-center py-4">
      Loading product...
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm p-4">
          <form @submit.prevent="saveProduct">
            <div class="mb-3">
              <label class="form-label fw-bold">Name</label>
              <input type="text" class="form-control" v-model="name" required />
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Description</label>
              <textarea class="form-control" rows="4" v-model="description" required></textarea>
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

            <button class="btn btn-warning w-100" type="submit" :disabled="saving || deleting">
              {{ saving ? "Saving..." : "Save" }}
            </button>

            <!-- ✅ Archive -->
            <button
              class="btn btn-danger w-100 mt-2"
              type="button"
              @click="archiveProduct"
              :disabled="saving || archiving"
            >
              {{ archiving ? "Archiving..." : "Archive Product" }}
            </button>

            <button
              class="btn btn-outline-secondary w-100 mt-2"
              type="button"
              @click="router.push('/admin')"
              :disabled="saving || archiving"
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
import { ref, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Notyf } from "notyf"
import api from "../api"

const route = useRoute()
const router = useRouter()
const notyf = new Notyf()

const productId = ref(route.params.id)

const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)

const name = ref("")
const description = ref("")
const price = ref(0)

const loadProduct = async (id) => {
  if (!id) {
    notyf.error("No product selected.")
    return router.push("/admin")
  }

  try {
    loading.value = true
    const res = await api.get(`/products/${id}`) // { product: {...} }
    const p = res.data.product

    name.value = p.name
    description.value = p.description
    price.value = p.price
  } catch (error) {
    console.error("Error loading product:", error)
    notyf.error(error?.response?.data?.error || "Failed to load product")
    router.push("/admin")
  } finally {
    loading.value = false
  }
}

const saveProduct = async () => {
  const confirmed = window.confirm("Are you sure you want to save changes?")
  if (!confirmed) return

  try {
    saving.value = true
    await api.patch(`/products/${productId.value}/update`, {
      name: name.value,
      description: description.value,
      price: price.value
    })

    notyf.success("Product updated successfully!")
    router.push("/admin")
  } catch (error) {
    console.error("Error updating product:", error)
    notyf.error(error?.response?.data?.error || "Failed to update product")
  } finally {
    saving.value = false
  }
}

/*const deleteProduct = async () => {
  const confirmed = window.confirm(
    "Delete this product? (This will set it to Not available / archived.)"
  )
  if (!confirmed) return

  try {
    deleting.value = true
    // ✅ Backend "delete" equivalent
    await api.patch(`/products/${productId.value}/archive`)
    notyf.success("Product deleted (archived) successfully!")
    router.push("/admin")
  } catch (error) {
    console.error("Error deleting product:", error)
    notyf.error(error?.response?.data?.error || "Failed to delete product")
  } finally {
    deleting.value = false
  }
}
*/


const archiveProduct = async () => {
  const confirmed = window.confirm("Moving this product to archives.")
  if (!confirmed) return

  try {
    deleting.value = true
    await api.patch(`/products/${productId.value}/archive`) 
    notyf.success("Successfully moved to archive!")
    router.push("/admin")
  } catch (error) {
    console.error("Error archiving product:", error)
    notyf.error(error?.response?.data?.error || "Failed to archive product")
  } finally {
    archiving.value = false
  }
}


onMounted(() => loadProduct(productId.value))

watch(
  () => route.params.id,
  (newId) => {
    productId.value = newId
    loadProduct(newId)
  }
)
</script>