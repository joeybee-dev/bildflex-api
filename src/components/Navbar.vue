<script setup>
import { useGlobalStore } from "../stores/global"; 

const { user } = useGlobalStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-light shadow-sm">
    <div class="container">

      <router-link class="navbar-brand text-dark fw-bold" :to="{name: 'Home'}">AllRICE</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">

          <router-link class="nav-link" :to="{name: 'ActiveProducts'}" v-if="!user.isAdmin">Products</router-link>

          <router-link class="nav-link" :to="{name: 'Cart'}" v-if="user.email && !user.isAdmin">Cart</router-link>

          <router-link class="nav-link" :to="{name: 'Register'}" v-if="!user.email">Register</router-link>

          <router-link class="nav-link" :to="{name: 'Login'}" v-if="!user.email">Login</router-link>
       
          <router-link class="nav-link" :to="{name: 'Logout'}" v-if="user.email">Logout</router-link>

        </div>
      </div>

    </div>  
  </nav>
</template>