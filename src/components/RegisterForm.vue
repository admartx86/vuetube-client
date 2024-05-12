<template>
  <div>
    <h2>Register</h2>
    <span v-if="userStore.username"
      >You are currently signed in as {{ userStore.username }}.</span
    >
    <form @submit.prevent="register">
      <div>
        <label for="register-email">Email</label>
        <input id="register-email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="register-password">Password</label>
        <input
          id="register-password"
          v-model="password"
          type="password"
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import { useUserStore } from '../stores/user';
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    setup() {
      const email = ref('');
      const password = ref('');
      const userStore = useUserStore();

      const register = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/register`,
            {
              email: email.value,
              password: password.value,
            },
            { withCredentials: true },
          );
          if (response.status === 200) {
            console.log('Registration successful! Response:', response);
            // Assume response contains user info if needed
            userStore.setUser(
              response.data.user.username,
              response.data.user.email,
            );
            email.value = '';
            password.value = '';
          }
        } catch (error) {
          console.error('Registration failed. Error:', error);
        }
      };

      return {
        email,
        password,
        register,
        userStore,
      };
    },
  });
</script>
