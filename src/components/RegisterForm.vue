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
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      // make API call
      console.log("Registering:", this.email, this.password);
      // Reset form after registration
      this.email = '';
      this.password = '';
    }
  }
}
</script>