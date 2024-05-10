<template>
  <div>
    <span v-if="userStore.username">You are signed in as {{userStore.username}}.</span>
    <h2>Sign In</h2>
    <form @submit.prevent="login">
      <div>
        <label for="login-email">Email</label>
        <input id="login-email" v-model="email" type="email" required />
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

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const userStore = useUserStore();

    const login = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/login`,
          {
            email: email.value,
            password: password.value,
          },
          { withCredentials: true },
        );

        if (response.status === 200 && response.data.user) {
          console.log('Login successful! Response:', response);
          userStore.setUser(response.data.user.username, response.data.user.email);
          email.value = '';
          password.value = '';
        } else {
          console.log('Login failed. Response:', response);
        }
      } catch (error) {
        console.error('Login failed. Response:', error);
      }
    };

    return {
      email,
      password,
      login,
      userStore,
    };
  },
});
</script>