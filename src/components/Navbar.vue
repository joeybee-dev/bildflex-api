<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const isLoggedIn = computed(() => !!userStore.user.id);

const showLoginDropdown = ref(false);
const dropdownRef = ref(null);

const profileRoute = computed(() => {
  if (userStore.user.userType === "professional") {
    return "/professionals";
  }

  return "/my-userprofile";
});

const toggleDropdown = () => {
  showLoginDropdown.value = !showLoginDropdown.value;
};

const closeDropdown = () => {
  showLoginDropdown.value = false;
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
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <img src="/favicon.ico" alt="logo" />
      <router-link to="/" class="navbar-brand ps-2">bildex</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main-nav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="main-nav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/blogs" class="nav-link">Blogs</router-link>
          </li>

         <li
           ref="dropdownRef"
           class="nav-item dropdown login-dropdown"
         >
           <button
             type="button"
             class="btn btn-outline-primary dropdown-toggle ms-lg-2"
             @click.stop="toggleDropdown"
           >
             <span class="material-symbols-outlined">account_circle</span>
           </button>

           <ul
             class="dropdown-menu dropdown-menu-end"
             :class="{ show: showLoginDropdown }"
           >
             <template v-if="!isLoggedIn">
               <li>
                 <router-link to="/login-user" class="dropdown-item" @click="closeDropdown">
                   as User
                 </router-link>
               </li>
               <li>
                 <router-link to="/login-prof" class="dropdown-item" @click="closeDropdown">
                   as Professional
                 </router-link>
               </li>
               <li>
                 <router-link to="/login-handyman" class="dropdown-item" @click="closeDropdown">
                   as Handyman
                 </router-link>
               </li>
             </template>

             <template v-else>
               <li>
                 <router-link :to="profileRoute" class="dropdown-item" @click="closeDropdown">
                   My Profile
                 </router-link>
               </li>
               <li>
                 <router-link to="/logout" class="dropdown-item" @click="closeDropdown">
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
  min-width: 190px;
  margin-top: 0.4rem;
}
</style>