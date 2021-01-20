<template>
  <v-card style="border-radius: 8px">
    <v-card-title>
      <div class="d-flex align-center">
        <v-avatar class="mr-5" size="40px">
          <img src="https://avatars1.githubusercontent.com/u/60008470?s=460">
        </v-avatar>

        <div>
          <h1 class="title">{{ post.creator.name }}</h1>
          <div class="caption">{{ new Date(post.created_at).toDateString() }}</div>
        </div>
      </div>

      <v-card-text style="padding-bottom: 0 !important;">
        <div :class="post.text.length > 150 ? 'text-body-1' :'text-h5'" class="mb-2">
          {{ post.text }}
        </div>
        <v-divider/>
        <div v-if="post.comments_count" class="d-flex py-2">
          <v-spacer/>
          <span>{{ post.comments_count }} comments</span>
        </div>
        <v-divider />
      </v-card-text>


      <v-card-actions style="width: 100%">
        <CommentSection style="width: 100%" :post="post"/>
      </v-card-actions>
    </v-card-title>
  </v-card>
</template>

<script>
import CommentSection from "@/components/CommentSection";

export default {
  components: {
    CommentSection,
  },
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>
