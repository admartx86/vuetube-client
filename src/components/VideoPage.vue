<template>
  <div>
    <div class="d-flex justify-content-end p-2">
      <div class="p-2">
        <router-link to="/">Home</router-link>
      </div>
       <router-link v-if="userStore.username" class="p-2" to="/upload"
        >Upload</router-link
      >
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
      <source :src="videoData.video_url" type="video/mp4" />
      Your browser cannot display this video.
    </video>
    <h1 class="block-text">{{ videoData.video_name }}</h1>
    <p class="text-start">
      {{ videoData.author }} {{ videoData.views }} views {{ timeAgo }}
    </p>
    <p class="text-start">{{ !isEditing ? videoData.description : null }}</p>

    <!-- Edit Description Button -->
    <button
      v-if="videoData.author === userStore.username && !isEditing"
      @click="isEditing = true"
      class="btn btn-primary btn-lg btn-block"
    >
      Edit Description
    </button>

    <!-- Description Editor -->
    <div v-if="isEditing">
      <textarea v-model="editedDescription" rows="4" cols="50"></textarea>
      <br />
      <div class="p-2">
        <button @click="cancelEdit" class="btn btn-secondary btn-lg btn-block">
          Cancel
        </button>
        <button
          @click="updateDescription"
          class="btn btn-primary btn-lg btn-block"
        >
          Save Changes
        </button>
      </div>
    </div>

    <button
      v-if="videoData.author === userStore.username && !isEditing"
      @click="showConfirmation"
      class="btn btn-primary btn-lg btn-block"
    >
      Delete Video
    </button>
    <div
      v-if="showConfirmDialog"
      class="modal fade show"
      style="display: block"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmDeleteModal"
      aria-modal="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">Delete Video?</h5>
            <button
              type="button"
              class="btn-close"
              @click="hideConfirmation"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-start">
              Are you sure you want to delete this video?
            </p>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="deleteConfirmationCheckbox"
                v-model="deleteAllowed"
              />
              <label
                class="form-check-label text-start"
                for="deleteConfirmationCheckbox"
              >
                Yes, I understand that deleting is permanent and can't be
                undone.
              </label>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button
              type="button"
              class="btn btn-secondary"
              @click="hideConfirmation"
            >
              Cancel
            </button>
            <button
              type="button"
              :class="[
                'btn',
                deleteAllowed ? 'btn-danger' : 'btn-light',
                { 'btn-inactive': !deleteAllowed },
              ]"
              @click="deleteAllowed ? deleteVideoConfirmed() : null"
            >
              Delete Video
            </button>
          </div>
        </div>
      </div>
    </div>
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

  const showConfirmDialog = ref(false);
  const deleteAllowed = ref(false);

  const isEditing = ref(false);
  const editedDescription = ref('');

  const showConfirmation = () => {
    showConfirmDialog.value = true;
    deleteAllowed.value = false;
  };

  const hideConfirmation = () => {
    showConfirmDialog.value = false;
  };

  const deleteVideoConfirmed = async () => {
    hideConfirmation();
    await deleteVideo();
  };

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

  const updateDescription = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
      const xsrfToken = Cookies.get('XSRF-TOKEN');
      if (!xsrfToken) {
        throw new Error('CSRF token not found.');
      }
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/videos/${route.params.videoId}/description`,
        { description: editedDescription.value },
        {
          withCredentials: true,
          headers: { 'X-XSRF-TOKEN': xsrfToken },
        },
      );
      videoData.value.description = editedDescription.value;
      isEditing.value = false;
      console.log('Description updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update description. Error:', error);
    }
  };

  const cancelEdit = () => {
    isEditing.value = false;
    editedDescription.value = videoData.value.description;
  };

  onMounted(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/videos/${route.params.videoId}`,
      );
      videoData.value = response.data;
      timeAgo.value = dayjs(videoData.value.created_at).fromNow();
      editedDescription.value = videoData.value.description;
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
  .btn-light.btn-inactive {
    cursor: not-allowed;
    pointer-events: none;
    color: #6c757d;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
  }
</style>
