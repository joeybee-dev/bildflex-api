<script>  

  import Navbar from './components/Navbar.vue';
  import { useGlobalStore } from "./stores/global"; 
  import { onBeforeMount } from "vue"; 


  export default {
    components: {
      
      Navbar,

    },

    setup(){
      const {setUser} = useGlobalStore(); 
      onBeforeMount(() => {
        setUser(localStorage.getItem("email"))
    });
  }
}

</script>


<template>
  <Navbar />
  <router-view />

</template>


<style scoped></style>