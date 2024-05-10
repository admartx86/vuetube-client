<template>
  <router-link to="/">Home</router-link>
  <RegisterForm />
  Already have an account? <router-link to="/sign-in">Sign In</router-link>
</template>

<script setup lang="ts">
  import RegisterForm from './RegisterForm.vue';
</script>

<style></style>
