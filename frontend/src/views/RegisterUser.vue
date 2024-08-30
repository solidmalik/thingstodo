<template>
    <div class="register-user-view">
      <h1>Create a new User</h1>
      <RegisterForm @register="registerUser" />
      <p v-if="message">{{ message }}</p>
      <!-- <router-link to="/login">Already have an account? Login here</router-link> -->
    </div>
  </template>
 <script lang="ts">
 import { defineComponent, ref } from 'vue';
 import { useStore } from 'vuex';
 import { useRouter } from 'vue-router';
 import RegisterForm from '../components/RegisterForm.vue';
 
 export default defineComponent({
   name: 'RegisterUser',
   components: {
     RegisterForm
   },
   setup() {
     const store = useStore();
     const router = useRouter();  // Initialize Vue Router
     const message = ref('');
 
     const registerUser = async ({ username, password }: { username: string; password: string }) => {
       try {
         await store.dispatch('registerUser', { username, password });
 
         // Redirect to login view with a success message as a query parameter
         router.push({ 
           path: '/login', 
           query: { message: 'Registration successful! You can now login.' } 
         });
       } catch (error: any) {
         console.error('Failed to register user:', error.response?.data?.msg || error.message);
         message.value = error.response?.data?.msg || 'Failed to register user.';
       }
     };
 
     return { message, registerUser };
   }
 });
 </script>
  
<style>
  .register-user-view {
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