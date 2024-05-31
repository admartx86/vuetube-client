<template>
  <div>
    <div class="d-flex justify-content-between">
      <img
        src="https://vuetube.s3.us-east-2.amazonaws.com/Vuetube_Banner.webp"
        class="w-50"
        alt="Vuetube"
      />
      <div class="d-flex justify-content-end">
        <router-link v-if="userStore.username" class="p-2" to="/upload"
          >Upload</router-link
        >
        <span class="p-2" v-if="userStore.username"
          >Hello, {{ userStore.username }}!</span
        >
        <SignOutButton v-if="userStore.username" class="sign-out-link p-2" />
        <router-link class="p-2" v-if="!userStore.username" to="/sign-in"
          >Sign In</router-link
        >
      </div>
    </div>
    <ul class="p-2">
      <div class="container p-2">
        <div class="row">
          <li
            v-for="video in videos"
            :key="video.unique_code"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <a
              class="text-dark text-decoration-none"
              :href="`${viteAppUrl}/video/${video.unique_code}`"
            >
              <div class="video-container">
              <video
                class="video-responsive"
                v-if="video.video_url"
                @mouseover="playVideo"
                @mouseout="pauseVideo"
                muted
                playsinline
              >
                <source :src="video.video_url" type="video/mp4" />
                Your browser cannot display this video.
              </video>
              </div>
            </a>

            <h2 class="text-start">{{ video.video_name }}</h2>
            <p class="text-start">
              {{ video.author }} {{ video.views }} views {{ video.timeAgo }}
            </p>
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

<style>
  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    background: #000;
  }

  .video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .video-responsive {
    max-width: 100%;
    max-height: auto;
    object-fit: contain;
  }

  .sign-out-link {
    text-decoration: underline;
    color: #007bff;
  }

  .sign-out-link:hover {
    text-decoration: underline;
    color: #0056b3;
    cursor: pointer;
  }
</style>
