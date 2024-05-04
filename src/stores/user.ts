import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
  }),
  actions: {
    setUser(email) {
      this.email = email;
    },
  },
});