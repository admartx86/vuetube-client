<template>
  <div>
    <button @click="confirmSignout">Sign Out</button>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { useUserStore } from '../stores/user';
  import { useRouter } from 'vue-router';

  export default {
    name: 'SignOutButton',
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
      const confirmSignout = async () => {
        if (confirm('Would you like to sign out?')) {
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
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/logout`,
              {},
              {
                withCredentials: true,
                headers: { 'X-XSRF-TOKEN': xsrfToken },
              },
            );
            if (response.status === 200) {
              console.log('Sign out successful! Response:', response);
              userStore.clearUser();
              router.push('/');
            } else {
              console.log('Sign out failed. Response:', response);
            }
          } catch (error) {
            console.error('Sign out failed. Error:', error);
          }
        }
      };
      return { confirmSignout };
    },
  };
</script>
