<template>
  <router-link to="/">Home</router-link>
  <br>
  Registration not available at this time.
  <br>
  <!-- <RegisterForm /> -->
  Already have an account? <router-link to="/sign-in">Sign In</router-link>
</template>

<script setup lang="ts">
  import RegisterForm from './RegisterForm.vue';
</script>

<style></style>
