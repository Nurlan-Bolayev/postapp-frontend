<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <router-link :to="user ? '/feeds' : '/'">
      <div class="d-flex align-center">
        <span class="pl-5"
              style="color: white; font-size: x-large; font-family: cursive; font-weight: bold; font-style: italic">
          Post App
        </span>
      </div>
    </router-link>

    <v-spacer></v-spacer>

    <v-menu v-if="user" offset-y>
      <template #activator="{on}">
        <v-btn text v-on="on">
          {{ user.name }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>
            Log out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <template v-else>
      <v-btn text to="/register">
        Register
      </v-btn>
      <v-btn text to="/login">
        Login
      </v-btn>
    </template>

  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    user() {
      return this.$store.state.user
    }
  },

  methods: {
    async logout() {
      this.$router.replace('/')
      await this.$store.dispatch('logout');
    }
  }
}
</script>