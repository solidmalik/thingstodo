import axios from 'axios';
import router from './router';  // Import your router

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: '/',  // Base URL for API requests, use '/' as Vite proxy is set up
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle expired tokens
apiClient.interceptors.response.use(
  (response) => response,  // Pass through if response is okay
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - Redirecting to login:', error.response.data.message);

      // Redirect to login page with a message
      router.push({ 
        path: '/login', 
        query: { message: 'Your access token has expired. Please log in again.' } 
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
