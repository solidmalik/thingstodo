<template>
  <div class="login-view">
    <!-- Display the message if present -->
    <h1>Welcome to Things To Do</h1>
    <p v-if="message">{{ message }}</p>
    <LoginForm @login="handleLogin" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';  // Import useRoute to access route parameters
import LoginForm from '@/components/LoginForm.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { LoginForm },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const message = ref(route.query.message || '');  // Get the message from the query params

    const handleLogin = async (credentials: { username: string; password: string }) => {
      try {
        await store.dispatch('login', credentials);
        router.push('/');
      } catch (error) {
        console.error('Login failed', error);
      }
    };

    return { handleLogin, message };
  }
});
</script>

<style>
.login-view {
  background-color: #121212; /* Dark background */
  color: #e0e0e0; /* Light text color */
  min-height: 100vh; /* Full viewport height */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
