<template>
  <div class="container">
    <ReplyField
        :value="value"
        :loading="loading"
        @input="$emit('input', $event)"
        placeholder="What's in your mind?"
        allow-enter
    />

    <v-btn
        :loading="loading"
        class="post-button"
        icon
        color="blue darken-1"
        @click="value.length && $emit('submit', value)"
    >
      <v-icon>
        mdi-arrow-right-circle
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import ReplyField from "@/components/ReplyField";

export default {
  components: {ReplyField},
  props: {
    value: {
      required: true,
      default: '',
    },

    loading: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style>
.container {
  position: relative;
}

.post-button {
  position: absolute;
  right: 18px;
  bottom: 14px;
}
</style>