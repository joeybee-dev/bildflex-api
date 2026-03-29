<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { Collapse } from "bootstrap";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const showAccountDropdown = ref(false);
const showServicesDropdown = ref(false);
const accountDropdownRef = ref(null);
const servicesDropdownRef = ref(null);
const navCollapseRef = ref(null);

const isLoggedIn = computed(() => !!userStore.user.id);
const isProfessional = computed(() => userStore.user.userType === "professional");

const profileRoute = computed(() => {
  if (isProfessional.value && userStore.user.id) {
    return `/myprofessionalprofile/${userStore.user.id}`;
  }
  return "/details-user";
});

const logoutRoute = computed(() => {
  return isProfessional.value ? "/logout-prof" : "/logout-user";
});

const toggleAccountDropdown = () => {
  showAccountDropdown.value = !showAccountDropdown.value;
  showServicesDropdown.value = false;
};

const toggleServicesDropdown = () => {
  showServicesDropdown.value = !showServicesDropdown.value;
  showAccountDropdown.value = false;
};

const closeDropdowns = () => {
  showAccountDropdown.value = false;
  showServicesDropdown.value = false;
};

const closeNavbarOnMobile = () => {
  closeDropdowns();

  if (window.innerWidth < 992 && navCollapseRef.value) {
    const collapseInstance =
      Collapse.getInstance(navCollapseRef.value) ||
      new Collapse(navCollapseRef.value, { toggle: false });

    collapseInstance.hide();
  }
};

const handleClickOutside = (event) => {
  const clickedOutsideAccount =
    !accountDropdownRef.value || !accountDropdownRef.value.contains(event.target);

  const clickedOutsideServices =
    !servicesDropdownRef.value || !servicesDropdownRef.value.contains(event.target);

  if (clickedOutsideAccount) {
    showAccountDropdown.value = false;
  }

  if (clickedOutsideServices) {
    showServicesDropdown.value = false;
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
  <nav class="navbar navbar-expand-lg sticky-top site-navbar shadow-sm">
    <div class="container">
      <router-link
        to="/"
        class="navbar-brand d-flex align-items-center"
        @click="closeNavbarOnMobile"
      >
        <img
          src="/favicon.ico"
          alt="bildflex logo"
          width="32"
          height="32"
          class="me-2"
        />
        <h5 class="mb-0 brand-text">bildflex</h5>
      </router-link>

      <button
        class="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main-nav"
        aria-controls="main-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="closeDropdowns"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div ref="navCollapseRef" class="collapse navbar-collapse" id="main-nav">
        <ul class="navbar-nav ms-auto align-items-start align-items-lg-center gap-lg-2 nav-list">
          <li class="nav-item">
            <router-link to="/about" class="nav-link custom-nav-link" @click="closeNavbarOnMobile">
              About
            </router-link>
          </li>

          <li
            ref="servicesDropdownRef"
            class="nav-item dropdown services-dropdown w-100 w-lg-auto"
          >
            <button
              type="button"
              class="nav-link custom-nav-link dropdown-toggle-btn"
              @click.stop="toggleServicesDropdown"
            >
              <span>Services</span>
              <span class="ms-1">▾</span>
            </button>

            <ul
              class="dropdown-menu custom-dropdown"
              :class="{ show: showServicesDropdown }"
            >
              <li>
                <router-link
                  to="/services/handyman"
                  class="dropdown-item"
                  @click="closeNavbarOnMobile"
                >
                  Handyman
                </router-link>
              </li>

              <li>
                <router-link
                  to="/services/designers"
                  class="dropdown-item"
                  @click="closeNavbarOnMobile"
                >
                  Designers
                </router-link>
              </li>

              <li>
                <router-link
                  to="/services/contractors"
                  class="dropdown-item"
                  @click="closeNavbarOnMobile"
                >
                  Contractors
                </router-link>
              </li>

              <li>
                <router-link
                  to="/services/suppliers"
                  class="dropdown-item"
                  @click="closeNavbarOnMobile"
                >
                  Suppliers
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/blogs" class="nav-link custom-nav-link" @click="closeNavbarOnMobile">
              Blog
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/feedback" class="nav-link custom-nav-link" @click="closeNavbarOnMobile">
              Support
            </router-link>
          </li>

          <li
            ref="accountDropdownRef"
            class="nav-item dropdown login-dropdown w-100 w-lg-auto"
          >
            <button
              type="button"
              class="btn ms-lg-2 d-flex align-items-center justify-content-between account-btn"
              @click.stop="toggleAccountDropdown"
            >
              <span class="d-flex align-items-center">
                <span class="material-symbols-outlined me-1">account_circle</span>
                <span>{{ isLoggedIn ? "Account" : "Login" }}</span>
              </span>
              <span class="ms-2">▾</span>
            </button>

            <ul
              class="dropdown-menu dropdown-menu-end custom-dropdown"
              :class="{ show: showAccountDropdown }"
            >
              <template v-if="!isLoggedIn">
                <li>
                  <router-link
                    to="/login-user"
                    class="dropdown-item"
                    @click="closeNavbarOnMobile"
                  >
                    Login as User
                  </router-link>
                </li>

                <li>
                  <router-link
                    to="/login-prof"
                    class="dropdown-item"
                    @click="closeNavbarOnMobile"
                  >
                    Login as Designer
                  </router-link>
                </li>

                <li>
                  <button
                    type="button"
                    class="dropdown-item"
                    @click="closeNavbarOnMobile"
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
                    @click="closeNavbarOnMobile"
                  >
                    My Profile
                  </router-link>
                </li>

                <li v-if="userStore.user.isAdmin && userStore.user.userType === 'user'">
                  <router-link
                    to="/all-users"
                    class="dropdown-item"
                    @click="closeNavbarOnMobile"
                  >
                    Manage Users
                  </router-link>
                </li>

                <li><hr class="dropdown-divider" /></li>

                <li>
                  <router-link
                    :to="logoutRoute"
                    class="dropdown-item"
                    @click="closeNavbarOnMobile"
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
.site-navbar {
  background-color: #003e86;
  color: #ffffff;
  border-bottom: 3px solid #ffc107;
}

.brand-text {
  color: #ffc107;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.navbar-brand {
  text-decoration: none;
}

.login-dropdown,
.services-dropdown {
  position: relative;
}

.nav-list {
  width: 100%;
}

.custom-nav-link {
  color: #ffffff !important;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s ease;
  position: relative;
}

.custom-nav-link:hover,
.custom-nav-link.router-link-active {
  color: #ffc107 !important;
}

.custom-nav-link.router-link-active {
  font-weight: 600;
}

.custom-nav-link::after {
  content: "";
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.1rem;
  height: 2px;
  background-color: #ffc107;
  border-radius: 3px;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

.custom-nav-link:hover::after,
.custom-nav-link.router-link-active::after {
  transform: scaleX(1);
}

.dropdown-toggle-btn {
  background: transparent;
  border: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.account-btn {
  width: 100%;
  border-radius: 10px;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  font-weight: 600;
  transition: all 0.25s ease;
}

.account-btn:hover {
  color: #003e86;
  background-color: #ffc107;
  border-color: #ffc107;
}

.custom-dropdown {
  min-width: 220px;
  margin-top: 0.45rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 62, 134, 0.1);
  overflow: hidden;
}

.dropdown-item {
  color: #003e86;
  transition: all 0.25s ease;
}

.dropdown-item:hover {
  background-color: #f4f6f8;
  color: #003e86;
}

.dropdown-divider {
  margin: 0.25rem 0;
}

.custom-toggler {
  border: 1px solid rgba(255, 193, 7, 0.6);
}

.custom-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.2);
}

.btn {
  border-radius: 10px;
}

.material-symbols-outlined {
  color: inherit;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    padding-top: 1rem;
  }

  .nav-item {
    width: 100%;
  }

  .custom-nav-link {
    padding-left: 0;
    padding-right: 0;
  }

  .dropdown-toggle-btn {
    width: 100%;
    text-align: left;
  }

  .login-dropdown,
  .services-dropdown {
    margin-top: 0.5rem;
  }

  .custom-dropdown {
    position: static !important;
    transform: none !important;
    width: 100%;
    margin-top: 0.5rem;
    display: none;
  }

  .custom-dropdown.show {
    display: block;
  }

  .account-btn {
    width: 100%;
  }

  .custom-nav-link::after {
    left: 0;
    right: 0;
  }
}

@media (min-width: 992px) {
  .nav-list {
    width: auto;
  }

  .account-btn {
    width: auto;
  }
}
</style>