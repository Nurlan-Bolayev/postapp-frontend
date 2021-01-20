<template>
  <div>
    <div class="d-flex">
      <v-avatar class="mr-2 mt-4" size="32px">
        <img alt="Avatar" src="https://avatars1.githubusercontent.com/u/60008470?s=460">
      </v-avatar>

      <div class="d-flex flex-column">
        <div class="comment-body pa-3">
          <div class="text-body-1" style="font-size: 13px !important;">
            <span class="a-link">{{ comment.owner.name }}</span>
          </div>

          <div class="text-body-2" style="font-size: 15px !important;">
            {{ comment.text }}
          </div>
        </div>
      </div>
    </div>

    <div class="pl-10" style="padding-left: 32px; line-height: 1px;">
      <div class="d-flex align-center pl-3 pb-1">
        <span v-if="!isReply" @click="onReplyClick" class="a-link text-caption">
          Reply
        </span>

        <template v-if="!replies.length && comment.replies_count">
          <span class="px-2"> · </span>
          <span class="text-caption a-link" @click="onReplyClick">
            View replies ({{ comment.replies_count }})
         </span>
        </template>

        <span v-if="!isReply" class="px-2"> · </span>

        <span class="text-caption">
          {{ new Date(comment.created_at).toDateString() }}
        </span>
      </div>

      <div v-if="replies.length">
        <CommentItem v-for="reply in replies" :comment="reply" :key="reply.id" is-reply/>
      </div>

      <ReplyField
          v-if="showReply"
          v-model="replyText"
          class="mb-5"
          :loading="isAddingReply"
          @submit="submitReply"
      />
    </div>

  </div>
</template>

<script>
import ReplyField from "@/components/ReplyField";
import axios from "@/axios";

export default {
  name: 'CommentItem',

  components: {
    ReplyField,
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },

    isReply: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showReply: false,
      replyText: '',
      isAddingReply: false,
      isLoadingReplies: false,
      replies: [],
    }
  },

  methods: {
    async submitReply() {
      this.isAddingReply = true
      try {
        const {data} = await axios.post(`/api/comments/${this.comment.id}/reply`, {
          text: this.replyText,
        })
        this.replies.push(data)
        this.replyText = ''

      } finally {
        this.isAddingReply = false
      }
    },

    async loadReplies() {
      this.isLoadingReplies = true
      try {
        const {data} = await axios.get(`/api/comments/${this.comment.id}/replies`)
        this.replies = data

      } finally {
        this.isLoadingReplies = false
      }
    },

    onReplyClick() {
      if (!this.replies.length) {
        this.loadReplies()
      }

      this.showReply = true
    }
  },
}
</script>

<style>
.comment-body {
  background-color: #f0f2f5;
  border-radius: 20px;
}

.a-link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>