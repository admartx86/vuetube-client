<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import RegisterForm from './components/RegisterForm.vue';
import LoginForm from './components/LoginForm.vue';
</script>

<template>
  <div>
    <RegisterForm />
    <LoginForm />
    <router-view />
  </div>
</template>

<style scoped>
</style>
