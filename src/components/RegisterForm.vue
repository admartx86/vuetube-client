<template>
  <div class="d-flex flex-column p-4">
    <h2>Register</h2>
    <span v-if="userStore.username"
      >You are currently signed in as {{ userStore.username }}.</span
    >
    <form class="d-flex flex-column p-2 gap-2" @submit.prevent="register">
      <div class="d-flex justify-content-between">
        <label class="px-4" for="register-username">Username</label>
        <input id="register-username" v-model="username" type="text" required />
      </div>
      <div class="d-flex justify-content-between">
        <label class="px-4" for="register-email">Email</label>
        <input id="register-email" v-model="email" type="email" required />
      </div>
      <div class="d-flex justify-content-between">
        <label class="px-4" for="register-password">Password</label>
        <input
          id="register-password"
          v-model="password"
          type="password"
          required
        />
      </div>
      <div class="p-2">
        <button type="submit" class="btn btn-primary btn-lg btn-block">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import { useUserStore } from '../stores/user';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    setup() {
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const userStore = useUserStore();
      const router = useRouter();

      const register = async () => {
        try {
          console.log(username.value, email.value, password.value);
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/register`,
            {
              username: username.value,
              email: email.value,
              password: password.value,
            },
            { withCredentials: true },
          );
          if (response.status === 201) {
            console.log('Registration successful! Response:', response);
            // Assume response contains user info if needed
            userStore.setUser(username.value, email.value);
            username.value = '';
            email.value = '';
            password.value = '';
            router.push('/');
          }
        } catch (error) {
          console.error('Registration failed. Error:', error);
        }
      };

      return {
        username,
        email,
        password,
        register,
        userStore,
      };
    },
  });
</script>
