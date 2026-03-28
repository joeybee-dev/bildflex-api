<template>
  <section class="blog-page-wrapper py-4 py-md-5">
    <div class="container">
      <div class="page-header mb-4">
        <h2 class="page-title mb-1">Blogs</h2>
        <p class="page-subtitle mb-0">
          Read updates, tips, and insights from the trusted construction network.
        </p>
        <Blog_001 />
      </div>

    </div>
  </section>
</template>

<script setup>
import Blog_001 from "../blogs/Blog_001.vue";
</script>

<style scoped>
.blog-page-wrapper {
  background-color: #f4f6f8;
  min-height: 100vh;
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

.blog-card {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-radius: 22px;
  overflow: hidden;
}

.blog-card-header {
  height: 14px;
  background-color: #003e86;
  border-bottom: 3px solid #ffc107;
}

.blog-card-body {
  background-color: #ffffff;
}

@media (max-width: 767.98px) {
  .page-header {
    padding: 1rem;
  }
}
</style>