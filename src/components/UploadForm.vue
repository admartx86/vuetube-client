<template>
  <div>
    <button v-if="!selectedFile" @click="selectFile">Select File</button>
    <span v-if="selectedFile">Video Name</span>
    <input v-if="selectedFile" type="text" v-model="video_name" />
    <br />
    <span v-if="selectedFile">Description</span>
    <textarea
      v-if="selectedFile"
      type="text"
      rows="4"
      columns="50"
      v-model="description"
    />
    <br />
    <button v-if="selectedFile" @click="goBack">Back</button>
    <button v-if="selectedFile" @click="postVideo">Post</button>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="onFileChange"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        selectedFile: null,
        video_name: '',
      };
    },
    methods: {
      selectFile() {
        this.$refs.fileInput.click();
      },
      onFileChange(e) {
        this.selectedFile = e.target.files[0];
      },
      goBack() {
        this.selectedFile = null;
        this.video_name = '';
      },
      async postVideo() {
        try {
          await axios.get(
            `${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`,
            {
              withCredentials: true,
            },
          );
          const xsrfToken = Cookies.get('XSRF-TOKEN');
          if (!xsrfToken) {
            throw new Error('CSRF token not found.');
          }
          const formData = new FormData();
          formData.append('video', this.selectedFile);
          formData.append('video_name', this.video_name);
          formData.append('description', this.description);
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/videos`,
            formData,
            {
              withCredentials: true,
              headers: { 'X-XSRF-TOKEN': xsrfToken },
            },
          );
          console.log('Upload successful:', response);
        } catch (error) {
          console.error('Error in file upload:', error);
        }
      },
    },
  };
</script>
