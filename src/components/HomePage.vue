<template>
  <div>
    <img
      src="https://vuetube.s3.us-east-2.amazonaws.com/Vuetube_Banner.webp"
      alt="Vuetube"
    />
    <span v-if="userStore.username">Hello, {{ userStore.username }}!</span>
    <SignOutButton v-if="userStore.username" />
    <router-link v-if="!userStore.username" to="/sign-in">Sign In</router-link>
    <h1>Home</h1>
    <ul>
      <li v-for="video in videos" :key="video.id">
        <a :href="`${viteAppUrl}/video/${video.id}`">
          <h3>{{ video.video_name }}</h3>
          <video
            v-if="video.video_url"
            width="320"
            height="240"
            @mouseover="playVideo"
            @mouseout="pauseVideo"
            muted
          >
            <source :src="video.video_url" type="video/mp4" />
            Your browser cannot display this video.
          </video>
        </a>
        <br />
        <span> {{ video.author }} </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import SignOutButton from './SignOutButton.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';

  const videos = ref([]);
  const viteAppUrl = import.meta.env.VITE_APP_URL;
  const router = useRouter();
  const userStore = useUserStore();

  // Fetch videos when component is mounted
  onMounted(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/videos`,
      );
      videos.value = response.data.reverse();
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  });

  // Methods for video control
  const playVideo = (event: MouseEvent) => {
    const videoElement = event.currentTarget as HTMLVideoElement;
    videoElement.play();
  };

  const pauseVideo = (event: MouseEvent) => {
    const videoElement = event.currentTarget as HTMLVideoElement;
    videoElement.pause();
    videoElement.currentTime = 0;
  };
</script>
