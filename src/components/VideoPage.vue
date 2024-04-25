<template>
  <div>
    <h1>{{ videoData.video_name }}</h1>
    <video v-if="videoData.video_url" width="320" height="240" controls>
      <source :src="videoData.video_url" type="video/mp4">
      Your browser cannot display this video. Try updating your browser or using different browser.
    </video>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const videoData = ref({});

onMounted(async () => {
  try {
    const response = await axios.get(`https://vuetube-server.local/videos/${route.params.videoId}`, {
      withCredentials: true
    });
    videoData.value = response.data;
  } catch (error) {
    console.error('Failed to fetch video. Error:', error);
  }
});
</script>

<style scoped>
</style>

