<template>
  <div>
    <div class="pa-15">
      <div class="mx-auto" style="width: 590px">
        <v-card class="mb-5" style="border-radius: 8px">
          <v-card-text>
            <PostField v-model="postText" :loading="isPostingSomething" @submit="postSomething"/>
          </v-card-text>
        </v-card>

        <div v-if="isLoading">
          <v-skeleton-loader type="list-item-avatar, article"/>
        </div>

        <div v-else>
          <FeedItem class="mb-5" v-for="post in posts" :post="post" :key="post.id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import FeedItem from "@/components/FeedItem";
import PostField from "@/components/PostField";

export default {
  components: {
    PostField,
    FeedItem,
  },

  data() {
    return {
      postText: '',
      isPostingSomething: false,
      isLoading: false,
      posts: [],
    }
  },

  async mounted() {
    try {
      this.isLoading = true
      const {data} = await axios.get('api/posts');
      this.posts = data;
    } finally {
      this.isLoading = false
    }
  },

  methods: {
    async postSomething() {
      try {
        this.isPostingSomething = true
        const {data} = await axios.post('api/posts/create', {
          text: this.postText,
        });
        this.postText = ''
        this.posts.unshift(data);
      } finally {
        this.isPostingSomething = false
      }
    }
  },
}
</script>

<style scoped>

</style>