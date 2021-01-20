<template>
  <div class="d-flex home">
    <v-row align="center" justify="center">
      <v-col
          class="text-center"
          cols="12"
      >
        <h1 class="display-3 my-15">Welcome to Post App</h1>

        <h2>Enjoy posting your thoughts!</h2>

        <div class="mt-15">
          <v-btn class="mr-5" color="primary" to="/register">
            Register
          </v-btn>
          <v-btn color="primary" to="/login">
            Login
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.home {
  background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  color: white;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -56px;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>