<script setup>
const featuredProviders = [
  {
    id: 1,
    name: "BuildPro Works",
    category: "Contractor",
    location: "Muntinlupa City"
  },
  {
    id: 2,
    name: "Ar. Camille Reyes",
    category: "Designer",
    location: "Manila"
  },
  {
    id: 3,
    name: "Steel & Build Supply",
    category: "Supplier",
    location: "Valenzuela City"
  }
];

const recentBlogs = [
  {
    id: 1,
    title: "How to choose the right contractor for your project"
  },
  {
    id: 2,
    title: "Top construction materials for durable builds"
  },
  {
    id: 3,
    title: "Why working with trusted suppliers matters"
  }
];
</script>

<template>
  <aside class="sidebar-right">
    <div class="sidebar-card shadow-sm mb-4">
      <div class="sidebar-header">
        <h5 class="mb-0 sidebar-title">Featured Providers</h5>
      </div>

      <div class="sidebar-body">
        <div
          v-for="provider in featuredProviders"
          :key="provider.id"
          class="provider-item"
        >
          <div class="provider-avatar">
            <span class="material-symbols-outlined">engineering</span>
          </div>

          <div class="provider-details">
            <h6 class="provider-name mb-1">{{ provider.name }}</h6>
            <span class="provider-badge">{{ provider.category }}</span>
            <p class="provider-location mb-0 mt-1">{{ provider.location }}</p>
          </div>
        </div>

        <button class="btn section-btn w-100 mt-2">View All Providers</button>
      </div>
    </div>

    <div class="sidebar-card shadow-sm mb-4">
      <div class="sidebar-header">
        <h5 class="mb-0 sidebar-title">Recent Blogs</h5>
      </div>

      <div class="sidebar-body">
        <router-link
          v-for="blog in recentBlogs"
          :key="blog.id"
          :to="`/blogs/${blog.id}`"
          class="blog-link"
        >
          <span class="material-symbols-outlined blog-icon">article</span>
          <span>{{ blog.title }}</span>
        </router-link>

        <router-link to="/blogs" class="btn outline-btn w-100 mt-3">
          View All Blogs
        </router-link>
      </div>
    </div>

    <div class="sidebar-card shadow-sm">
      <div class="promo-box">
        <h6 class="promo-title">Need a trusted expert?</h6>
        <p class="promo-text">
          Explore handymen, designers, contractors, and suppliers near you.
        </p>
        <router-link to="/register-prof" class="btn promo-btn w-100">
          Join as Service Provider
        </router-link>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-right {
  width: 100%;
}

.sidebar-card {
  background-color: #ffffff;
  border: 1px solid rgba(0, 62, 134, 0.12);
  border-radius: 18px;
  overflow: hidden;
}

.sidebar-header {
  background-color: #003e86;
  color: #ffffff;
  padding: 1rem 1.1rem;
  border-bottom: 3px solid #ffc107;
}

.sidebar-title {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.sidebar-body {
  padding: 1rem;
}

.provider-item {
  display: flex;
  gap: 0.85rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(0, 62, 134, 0.08);
}

.provider-item:last-of-type {
  border-bottom: none;
}

.provider-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #003e86;
  color: #ffc107;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.provider-avatar .material-symbols-outlined {
  font-size: 24px;
}

.provider-details {
  min-width: 0;
}

.provider-name {
  color: #003e86;
  font-weight: 700;
}

.provider-badge {
  display: inline-block;
  background-color: #ffc107;
  color: #003e86;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.provider-location {
  color: #6c757d;
  font-size: 0.9rem;
}

.blog-link {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  text-decoration: none;
  color: #003e86;
  font-weight: 600;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(0, 62, 134, 0.08);
  transition: all 0.25s ease;
}

.blog-link:last-of-type {
  border-bottom: none;
}

.blog-link:hover {
  color: #ffc107;
}

.blog-icon {
  font-size: 1.15rem;
  color: #003e86;
  margin-top: 2px;
  transition: color 0.25s ease;
}

.blog-link:hover .blog-icon {
  color: #ffc107;
}

.section-btn,
.promo-btn {
  background-color: #003e86;
  color: #ffffff;
  border: 1px solid #003e86;
  border-radius: 10px;
  font-weight: 700;
  transition: all 0.25s ease;
}

.section-btn:hover,
.promo-btn:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.outline-btn {
  background-color: transparent;
  color: #003e86;
  border: 1px solid #ffc107;
  border-radius: 10px;
  font-weight: 700;
  transition: all 0.25s ease;
}

.outline-btn:hover {
  background-color: #ffc107;
  color: #003e86;
  border-color: #ffc107;
}

.promo-box {
  background-color: #f4f6f8;
  padding: 1.1rem;
}

.promo-title {
  color: #003e86;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.promo-text {
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.94rem;
  margin-bottom: 1rem;
}

@media (max-width: 991.98px) {
  .sidebar-card {
    border-radius: 16px;
  }

  .sidebar-header,
  .sidebar-body,
  .promo-box {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>