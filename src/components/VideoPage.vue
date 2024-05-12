<template>
  <div>
    <router-link to="/">Home</router-link>
    <span v-if="userStore.username">Hello, {{ userStore.username }}!</span>
    <SignOutButton v-if="userStore.username" />
    <router-link v-if="!userStore.username" to="/sign-in">Sign In</router-link>
    <h1>{{ videoData.video_name }}</h1>
    <video
      v-if="videoData.video_url"
      width="320"
      height="240"
      controls
      autoplay
    >
      <source :src="videoData.video_url" type="video/mp4" />
      Your browser cannot display this video.
    </video>
    <br />
    <span> {{ videoData.author }} </span>
    <br />
    <span>{{ videoData.views }} views</span>
    <br />
    <button @click="deleteVideo">Delete Video</button>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '../stores/user';
  import SignOutButton from './SignOutButton.vue';
  const route = useRoute();
  const videoData = ref({});
  const userStore = useUserStore();
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
    } catch (error) {
      console.error('Failed to fetch video. Error:', error);
    }
  });
</script>
