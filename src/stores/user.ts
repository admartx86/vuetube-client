import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: '',
  }),
  actions: {
    setUser(username: string, email: string) {
      this.username = username;
      this.email = email;
    },
  },
  persist: true,
});