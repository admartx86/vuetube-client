<template>
  <div>
    <h2>Sign In</h2>
    <span v-if="userStore.username"
      >You are currently signed in as {{ userStore.username }}.</span
    >
    <form @submit.prevent="handleLogin">
      <div>
        <label for="login-username-or-email">Username or Email</label>
        <input
          id="login-username-or-email"
          v-model="login"
          type="text"
          required
        />
      </div>
      <div>
        <label for="login-password">Password</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import { useUserStore } from '../stores/user';
  import { defineComponent, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    setup() {
      const login = ref('');
      const password = ref('');
      const userStore = useUserStore();
      const router = useRouter();

      const handleLogin = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              login: login.value,
              password: password.value,
            },
            { withCredentials: true },
          );

          if (response.status === 200 && response.data.user) {
            console.log('Login successful! Response:', response);
            userStore.setUser(
              response.data.user.username,
              response.data.user.email,
            );
            login.value = '';
            password.value = '';
            router.push('/');
          } else {
            console.log('Login failed. Response:', response);
          }
        } catch (error) {
          console.error('Login failed. Response:', error);
        }
      };

      return {
        login,
        password,
        handleLogin,
        userStore,
      };
    },
  });
</script>
