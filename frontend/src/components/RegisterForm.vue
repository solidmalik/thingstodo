<template>
  <div class="register-form-container">
    <form class="register-form" @submit.prevent="submitForm">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <router-link class="login-redirect" to="/login">Already have an account? Login here</router-link>
    </form>
  </div>
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
      this.$emit('register', {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.register-form-container {
  display: flex;
  justify-content: center;  /* Center the form horizontally */
  align-items: center;  /* Center the form vertically */
  height: 20vh;  /* Full viewport height */
  background-color: #f0f2f5;  /* Light gray background */
  margin-top: 20em;
}

.register-form {
  background-color: #ffffff;  /* White background for the form */
  padding: 40px;  /* Add padding inside the form */
  border-radius: 12px;  /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Subtle shadow for depth */
  display: flex;
  flex-direction: column;  /* Stack children vertically */
  gap: 20px;  /* Gap between children */
  max-width: 400px;  /* Maximum width of the form */
  width: 100%;  /* Make the form responsive */
}

.register-form input {
  padding: 12px 16px;  /* Padding inside the input fields */
  border: 1px solid #ddd;  /* Light gray border */
  border-radius: 8px;  /* Rounded corners */
  font-size: 16px;  /* Increase font size */
  width: 100%;  /* Full width */
  box-sizing: border-box;  /* Include padding in width calculation */
  transition: border-color 0.3s;  /* Smooth transition for border color */
}

.register-form input:focus {
  outline: none;  /* Remove default outline */
  border-color: #007bff;  /* Change border color on focus */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);  /* Add focus shadow */
}

.register-form button {
  background-color: greenyellow;  /* Blue background for button */
  color:black;  /* White text color */
  padding: 12px 16px;  /* Padding inside the button */
  border: none;  /* Remove border */
  border-radius: 8px;  /* Rounded corners */
  font-size: 16px;  /* Increase font size */
  cursor: pointer;  /* Pointer cursor on hover */
  transition: background-color 0.3s;  /* Smooth transition for background color */
}

.register-form button:hover {
  background-color: green;  /* Darker blue on hover */
}

.register-form button:focus {
  outline: none;  /* Remove default outline */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);  /* Add focus shadow */
}
</style>
