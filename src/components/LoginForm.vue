<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="login-email">Email:</label>
        <input id="login-email" v-model="email" type="email" required>
      </div>
      <div>
        <label for="login-password">Password:</label>
        <input id="login-password" v-model="password" type="password" required>
      </div>
      <button type="submit">Login</button>
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
      axios.post('http://127.0.0.1:8000/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        console.log("Login successful:", response);
        this.email = '';
        this.password = '';
      }).catch(error => {
        console.error("Login failed:", error);
      });
      console.log("Logging in with:", this.email, this.password);
    }
  }
}
</script>