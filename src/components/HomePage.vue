<template>
  <div>
    <router-link to="/sign-in">Sign In</router-link>
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
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';

  export default {
    data() {
      return {
        videos: [],
        viteAppUrl: import.meta.env.VITE_APP_URL,
      };
    },
    async mounted() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/videos`,
        );
        this.videos = response.data.reverse();
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    },
    methods: {
      playVideo(event: MouseEvent) {
        const videoElement = event.currentTarget as HTMLVideoElement;
        videoElement.play();
      },
      pauseVideo(event: MouseEvent) {
        const videoElement = event.currentTarget as HTMLVideoElement;
        videoElement.pause();
        videoElement.currentTime = 0;
      },
    },
  };
</script>
