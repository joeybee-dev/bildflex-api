<script>
  import Banner from '../components/Banner.vue';
  import Highlights from '../components/Highlights.vue';

  export default {
    components: {
      Banner,
   
    }, 

    data(){
      return {
        bannerProps: {
          title: "AllRICE",
          tagline: "Good rice, Good taste."
        }
      }
    }
  }
</script>

<template>
  <div class="container-fluid">
    <Banner :bannerProps=bannerProps />
 
  </div>
</template>
