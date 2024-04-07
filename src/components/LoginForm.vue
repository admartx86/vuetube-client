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
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Make an API call
      console.log("Logging in with:", this.email, this.password);
      // Reset form after login
      this.email = '';
      this.password = '';
    }
  }
}
</script>