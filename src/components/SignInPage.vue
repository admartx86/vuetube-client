<template>
  <router-link to="/">Home</router-link>
  <SignInForm />

  Don't have an account? <router-link to="/register">Register</router-link>
</template>

<script setup lang="ts">
  import SignInForm from './SignInForm.vue';
</script>

<style></style>
