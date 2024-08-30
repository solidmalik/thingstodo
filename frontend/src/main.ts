import { createApp } from 'vue';  // Import createApp instead of Vue
import App from './App.vue';       // Import the main App component
import router from './router';     // Import your router
import store from './store';       // Import your Vuex store

// Create a new Vue app instance using Vue 3 syntax
const app = createApp(App);

// Use Vue Router and Vuex
app.use(router);
app.use(store);

// Mount the app to the DOM
app.mount('#app');
