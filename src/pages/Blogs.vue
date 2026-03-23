<template>
  <section class="blog-page-wrapper py-5">
    <div class="container">
      <Blog1 />
    </div>
  </section>
</template>

<script setup>
import Blog1 from "../components/Blog1.vue";
</script>

<style scoped>
.blog-page-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>