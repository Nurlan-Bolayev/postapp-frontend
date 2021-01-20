<template>
  <div>
    <div class="d-flex align-center" style="width: 100%">
      <v-avatar class="mr-2" size="32px">
        <img alt="Avatar" src="https://avatars1.githubusercontent.com/u/60008470?s=460">
      </v-avatar>

      <v-textarea
          :value="value"
          :disabled="loading"
          :placeholder="placeholder"
          @input="$emit('input', $event)"
          background-color="#f0f2f5"
          auto-grow
          row-height="5px"
          filled
          rounded
          dense
          hide-details
          @keydown="onKeyDown"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      default: '',
    },

    loading: {
      type: Boolean,
      default: false,
    },

    allowEnter: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: "Write a comment...",
    }
  },

  methods: {
    onKeyDown(e) {
      if (this.allowEnter || !(e.key === 'Enter' && !e.shiftKey)) {
        return
      }

      e.preventDefault()

      if (this.value) {
        this.$emit('submit', this.value)
      }
    },
  },
}
</script>