<template>
  <div>
    <v-form @submit.prevent="login" class="d-flex align-center justify-center pt-15">
      <v-card class="pa-5" max-width="450">
        <v-card-title>
          <h1 class="mb-5">Login</h1>
        </v-card-title>

        <v-card-text>
          <v-text-field
              label="Email"
              type="email"
              name="email"
              v-model="body.email"
              outlined
              :error-messages="errors.email"
          />

          <v-text-field
              label="Password"
              type="password"
              v-model="body.password"
              outlined
              :error-messages="errors.password"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" type="submit" :loading="isLoggingIn">Login</v-btn>
          <v-spacer/>
          <div class="pl-5">If you don't have an account,
            <router-link to="/register">Please register</router-link>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      isLoggingIn: false,
      errors: {},
      body: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      try {
        this.isLoggingIn = true;
        await axios.post('api/login', this.body);
        this.$router.push('/feeds')
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLoggingIn = false;
      }
    }
  }
}
</script>

<style scoped>

</style>