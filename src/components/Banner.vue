<template>
  <div class="banner d-flex align-items-center justify-content-center text-center">
    <div>
      <h1 class="display-4 fw-bold mb-3">Welcome to Our Store</h1>
      <p class="lead mb-4">Discover quality products at the best prices.</p>

      <button class="btn btn-primary btn-lg" @click="goShopping">
        Go Shopping
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goShopping = () => {
  router.push("/active-products")
}
</script>

<style scoped>
.banner {
  height: 70vh;
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
  color: white;
}
</style>