<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="login">
      <div>
        <label for="login-email">Email </label>
        <input id="login-email" v-model="email" type="email" required>
      </div>
      <div>
        <label for="login-password">Password </label>
        <input id="login-password" v-model="password" type="password" required>
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('https://vuetube-server.local/login', {
        email: this.email,
        password: this.password
      }, 
      { withCredentials: true }
      ).then(response => {
        console.log("Login successful! Response:", response);
        this.email = '';
        this.password = '';
      }).catch(error => {
        console.error("Login failed. Response:", error);
      });
    }
  }
}
</script>