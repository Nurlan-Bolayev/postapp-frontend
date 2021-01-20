<template>
  <v-app>
    <NavBar/>

    <v-main style="background: #f0f2f5">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "@/NavBar";

export default {
  name: 'App',

  components: {
    NavBar
  },

  created() {
    this.$store.dispatch('fetchUser')
  }
};
</script>
