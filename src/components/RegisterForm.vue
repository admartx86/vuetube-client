<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="register-email">Email:</label>
        <input id="register-email" v-model="email" type="email" required>
      </div>
      <div>
        <label for="register-password">Password:</label>
        <input id="register-password" v-model="password" type="password" required>
      </div>
      <button type="submit">Register</button>
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
    register() {
      axios.post('http://127.0.0.1:8000/register', {
        email: this.email,
        password: this.password
      }).then(response => {
        console.log("Registration successful:", response);
        this.email = '';
        this.password = '';
      }).catch(error => {
        console.error("Registration failed:", error);
      });
      console.log("Registering with:", this.email, this.password);
    }
  }
}
</script>