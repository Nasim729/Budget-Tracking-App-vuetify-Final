// src/stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  actions: {
    addUser(user) {
      this.users.push(user);
    },
    setUser(user) {
      this.currentUser = user;
    },
  },
});
