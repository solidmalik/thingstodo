<template>
    <div class="login-view">
      <LoginForm @login="handleLogin" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import LoginForm from '@/components/LoginForm.vue';
  
  export default defineComponent({
    components: {
      LoginForm
    },
    methods: {
      async handleLogin(credentials: { username: string; password: string }) {
        try {
          await this.$store.dispatch('login', credentials);
          this.$router.push('/');
        } catch (error) {
          console.error('Login failed', error);
        }
      }
    }
  });
  </script>
  