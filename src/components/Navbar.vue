<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const showAccountDropdown = ref(false);
const dropdownRef = ref(null);

const isLoggedIn = computed(() => !!userStore.user.id);
const isProfessional = computed(() => userStore.user.userType === "professional");

const profileRoute = computed(() => {
  if (isProfessional.value && userStore.user.id) {
    return `/myprofessionalprofile/${userStore.user.id}`;
  }

  return "/details-user";
});

const logoutRoute = computed(() => {
  if (isProfessional.value) {
    return "/logout-prof";
  }

  return "/logout-user";
});

const toggleDropdown = () => {
  showAccountDropdown.value = !showAccountDropdown.value;
};

const closeDropdown = () => {
  showAccountDropdown.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img
          src="/favicon.ico"
          alt="bildex logo"
          width="28"
          height="28"
          class="me-2"
        />
        <span>bildex</span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main-nav"
        aria-controls="main-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="main-nav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="closeDropdown">
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/blogs" class="nav-link" @click="closeDropdown">
              Blogs
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/professionals"
              class="nav-link"
              @click="closeDropdown"
            >
              Professionals
            </router-link>
          </li>

          <li
            ref="dropdownRef"
            class="nav-item dropdown login-dropdown"
          >
            <button
              type="button"
              class="btn btn-outline-light ms-lg-2 d-flex align-items-center"
              @click.stop="toggleDropdown"
            >
              <span class="material-symbols-outlined me-1">account_circle</span>
              <span>{{ isLoggedIn ? "Account" : "Login" }}</span>
            </button>

            <ul
              class="dropdown-menu dropdown-menu-end"
              :class="{ show: showAccountDropdown }"
            >
              <template v-if="!isLoggedIn">
                <li>
                  <router-link
                    to="/login-user"
                    class="dropdown-item"
                    @click="closeDropdown"
                  >
                    Login as User
                  </router-link>
                </li>

                <li>
                  <router-link
                    to="/login-prof"
                    class="dropdown-item"
                    @click="closeDropdown"
                  >
                    Login as Designer
                  </router-link>
                </li>

                <li>
                  <button
                    type="button"
                    class="dropdown-item disabled"
                    disabled
                  >
                    Login as Handyman
                  </button>
                </li>
              </template>

              <template v-else>
                <li>
                  <router-link
                    :to="profileRoute"
                    class="dropdown-item"
                    @click="closeDropdown"
                  >
                    My Profile
                  </router-link>
                </li>

                <li v-if="userStore.user.isAdmin && userStore.user.userType === 'user'">
                  <router-link
                    to="/all-users"
                    class="dropdown-item"
                    @click="closeDropdown"
                  >
                    Manage Users
                  </router-link>
                </li>

                <li><hr class="dropdown-divider" /></li>

                <li>
                  <router-link
                    :to="logoutRoute"
                    class="dropdown-item"
                    @click="closeDropdown"
                  >
                    Logout
                  </router-link>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.login-dropdown {
  position: relative;
}

.dropdown-menu {
  min-width: 220px;
  margin-top: 0.45rem;
}

.btn {
  border-radius: 10px;
}

.navbar-brand {
  font-weight: 700;
  text-decoration: none;
}

.nav-link.router-link-active {
  font-weight: 600;
}
</style>