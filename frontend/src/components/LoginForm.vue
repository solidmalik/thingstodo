<template>
    <form @submit.prevent="submitForm">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      submitForm() {
        this.$emit('login', {
          username: this.username,
          password: this.password
        });
      }
    }
  };
  </script>