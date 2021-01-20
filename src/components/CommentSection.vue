<template>
  <div>
    <div v-if="post.comments_count">
      <div v-if="post.comments_count !== comments.length">

        <span @click="loadAllComments" class="more-comments text-body-1">
          View {{ post.comments_count - comments.length }} more comments
        </span>

        <v-progress-linear v-show="isLoadingComments" indeterminate class="my-1"/>
      </div>

      <div v-if="comments.length">
        <CommentItem v-for="comment in comments" :comment="comment" :key="comment.id"/>
      </div>
    </div>

    <ReplyField v-model="commentText" :loading="isAddingComment" class="mt-2" @submit="submitComment"/>
  </div>
</template>

<script>
import ReplyField from "@/components/ReplyField";
import CommentItem from "@/components/CommentItem";
import axios from "@/axios";

export default {
  components: {
    CommentItem,
    ReplyField,
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      comments: this.post.latest_comment ? [this.post.latest_comment] : [],
      isCommentsLoaded: false,
      commentText: '',
      isLoadingComments: false,
      isAddingComment: false,
    }
  },

  created() {

  },

  methods: {
    async loadAllComments() {
      this.isLoadingComments = true
      try {
        const {data} = await axios.get(`/api/posts/${this.post.id}/comments`)
        this.comments = data
        this.post.comments_count = this.comments.length
        this.isCommentsLoaded = true
      } finally {
        this.isLoadingComments = false
      }
    },

    async submitComment() {
      this.isAddingComment = true
      try {
        const {data} = await axios.post(`/api/posts/${this.post.id}/comments/create`, {
          text: this.commentText,
        })
        this.commentText = ''
        this.comments.push(data)
        this.post.comments_count = (this.post.comments_count || 0) + 1
      } finally {
        this.isAddingComment = false
      }
    },
  }
}
</script>

<style scoped>
.more-comments {
  cursor: pointer;
  color: #65676b;
}

.more-comments:hover {
  text-decoration: underline;
}
</style>