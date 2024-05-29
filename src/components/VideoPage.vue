<template>
  <div>
    <div class="d-flex justify-content-end p-2">
      <div class="p-2">
        <router-link to="/">Home</router-link>
      </div>
      <div class="p-2">
        <span v-if="userStore.username">Hello, {{ userStore.username }}!</span>
      </div>
      <div class="p-2">
        <SignOutButton v-if="userStore.username" />
      </div>
      <div class="p-2">
        <router-link v-if="!userStore.username" to="/sign-in"
          >Sign In</router-link
        >
      </div>
    </div>
    <video
      v-if="videoData.video_url"
      width="320"
      height="240"
      controls
      autoplay
    >
      <source :src="videoData.video_url" type="video/mp4"/>
      Your browser cannot display this video.
    </video>
    <h1 class="block-text">{{ videoData.video_name }}</h1>
    <p class="text-start"> {{ videoData.author }} {{ videoData.views }} views {{ timeAgo }}</p>
    <p class="text-start">{{ videoData.description }}</p>
    <button v-if="videoData.author === userStore.username" @click="deleteVideo">
      Delete Video
    </button>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '../stores/user';
  import SignOutButton from './SignOutButton.vue';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(relativeTime);
  const route = useRoute();
  const videoData = ref({});
  const userStore = useUserStore();
  const timeAgo = ref('');
  const deleteVideo = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
      const xsrfToken = Cookies.get('XSRF-TOKEN');
      console.log(xsrfToken);
      if (!xsrfToken) {
        throw new Error('CSRF token not found.');
      }
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/videos/${route.params.videoId}`,
        {
          withCredentials: true,
          headers: { 'X-XSRF-TOKEN': xsrfToken },
        },
      );
      console.log('Video deleted successfully:', response.data);
    } catch (error) {
      console.error('Failed to delete video. Error:', error);
    }
  };

  onMounted(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/videos/${route.params.videoId}`,
      );
      videoData.value = response.data;
      timeAgo.value = dayjs(videoData.value.created_at).fromNow();
    } catch (error) {
      console.error('Failed to fetch video. Error:', error);
    }
  });
</script>

<style>
  .block-text {
    display: block;
    text-align: start;
  }
</style>
