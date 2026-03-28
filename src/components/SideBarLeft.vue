<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/user";

const route = useRoute();
const userStore = useUserStore();

const isLoggedIn = computed(() => !!userStore.user.id);
const isProfessional = computed(() => userStore.user.userType === "professional");

const profileRoute = computed(() => {
  if (isProfessional.value && userStore.user.id) {
    return `/myprofessionalprofile/${userStore.user.id}`;
  }
  return "/details-user";
});

const menuItems = computed(() => {
  const items = [
    { label: "Home", to: "/", icon: "home" },
    { label: "Blogs", to: "/blogs", icon: "article" },
    { label: "Contact", to: "/contact", icon: "call" }
  ];

  if (!isLoggedIn.value) {
    items.push(
      { label: "Login as User", to: "/login-user", icon: "person" },
      { label: "Login as Designer", to: "/login-prof", icon: "design_services" },
      { label: "Join as Service Provider", to: "/register-prof", icon: "handshake" }
    );
  } else {
    items.push(
      { label: "My Profile", to: profileRoute.value, icon: "badge" }
    );

    if (userStore.user.isAdmin && userStore.user.userType === "user") {
      items.push({
        label: "Manage Users",
        to: "/all-users",
        icon: "groups"
      });
    }

    items.push({
      label: "Logout",
      to: isProfessional.value ? "/logout-prof" : "/logout-user",
      icon: "logout"
    });
  }

  return items;
});

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <aside class="sidebar-left">
    <div class="sidebar-card shadow-sm">
      <div class="sidebar-header">
        <div class="d-flex align-items-center">
          <img
            src="/favicon.ico"
            alt="bildflex logo"
            width="30"
            height="30"
            class="me-2"
          />
          <h5 class="mb-0 sidebar-brand">bildflex</h5>
        </div>
        <p class="sidebar-subtitle mb-0 mt-2">
          Trusted construction network
        </p>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          class="sidebar-link"
          :class="{ active: isActive(item.to) }"
        >
          <span class="material-symbols-outlined sidebar-icon">
            {{ item.icon }}
          </span>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="provider-box">
          <h6 class="provider-title">Need more visibility?</h6>
          <p class="provider-text mb-3">
            Join as a service provider and connect with more clients.
          </p>
          <router-link to="/register-prof" class="btn provider-btn w-100">
            Join Now
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-left {
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
  padding: 1.25rem 1.1rem;
  border-bottom: 3px solid #ffc107;
}

.sidebar-brand {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.sidebar-subtitle {
  color: #f4f6f8;
  font-size: 0.92rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 0.85rem;
  gap: 0.45rem;
  background-color: #ffffff;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #003e86;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0.85rem 0.95rem;
  font-weight: 600;
  transition: all 0.25s ease;
}

.sidebar-link:hover {
  background-color: #f4f6f8;
  border-color: rgba(255, 193, 7, 0.6);
  color: #003e86;
}

.sidebar-link.active {
  background-color: #003e86;
  color: #ffffff;
  border-color: #003e86;
}

.sidebar-link.active .sidebar-icon {
  color: #ffc107;
}

.sidebar-icon {
  font-size: 1.25rem;
  color: #003e86;
  transition: color 0.25s ease;
}

.sidebar-footer {
  padding: 0 0.85rem 0.85rem;
  background-color: #ffffff;
}

.provider-box {
  background-color: #f4f6f8;
  border: 1px solid rgba(0, 62, 134, 0.1);
  border-radius: 14px;
  padding: 1rem;
}

.provider-title {
  color: #003e86;
  font-weight: 700;
  margin-bottom: 0.45rem;
}

.provider-text {
  color: #6c757d;
  font-size: 0.93rem;
  line-height: 1.6;
}

.provider-btn {
  background-color: #ffc107;
  color: #003e86;
  border: 1px solid #ffc107;
  border-radius: 10px;
  font-weight: 700;
  transition: all 0.25s ease;
}

.provider-btn:hover {
  background-color: #003e86;
  color: #ffffff;
  border-color: #003e86;
}

@media (max-width: 991.98px) {
  .sidebar-card {
    border-radius: 16px;
  }

  .sidebar-header {
    padding: 1rem;
  }

  .sidebar-nav {
    padding: 0.75rem;
  }

  .sidebar-footer {
    padding: 0 0.75rem 0.75rem;
  }
}
</style>