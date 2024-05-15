<template>
  <div>
    <img
      src="https://vuetube.s3.us-east-2.amazonaws.com/Vuetube_Banner.webp"
      alt="Vuetube"
    />
    <span v-if="userStore.username">Hello, {{ userStore.username }}!</span>
    <SignOutButton v-if="userStore.username" />
    <router-link v-if="!userStore.username" to="/sign-in">Sign In</router-link>
    <ul>
    <div class="container">
    <div class="row">
      <li v-for="video in videos" :key="video.unique_code" class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
        <a :href="`${viteAppUrl}/video/${video.unique_code}`">
          <video class="p-4"
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
          <h2>{{ video.video_name }}</h2>
        </a>
        <br />
        <h3> {{ video.author }} </h3>
        <br />
        <h3>{{ video.views }} views</h3>
        <br />
        <h3>{{ video.timeAgo }}</h3>
      </li>
    </div>
    </div>
    </ul>
    
   
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import SignOutButton from './SignOutButton.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';

  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(relativeTime);

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
      videos.value = response.data
        .map((video) => ({
          ...video,
          timeAgo: formatRelativeTime(video.created_at),
        }))
        .reverse();
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  });

  const formatRelativeTime = (createdAt) => {
    return dayjs(createdAt).fromNow();
  };

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
