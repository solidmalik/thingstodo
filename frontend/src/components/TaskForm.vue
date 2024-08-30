<template>
  <form @submit.prevent="submitForm">
    <input v-model="title" type="text" placeholder="Thing to do" required />
    <button type="submit">Add To Do</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    };
  },
  methods: {
    submitForm() {
      this.$emit('addTask', { title: this.title });
      this.title = '';
    }
  }
};
</script>

<style>
button {
  background-color: #333333; /* Dark button background */
  color: #e0e0e0; /* Light text color */
  border: none; /* Remove border */
  padding: 6px 10px; /* Padding for buttons */
  margin: 1em;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 14px; /* Font size for buttons */
  transition: background-color 0.3s ease; /* Smooth transition */
}
input {
  padding: 12px 16px;  /* Padding inside the input fields */
  border: 1px solid #ddd;  /* Light gray border */
  border-radius: 8px;  /* Rounded corners */
  font-size: 16px;  /* Increase font size */
  width: 100%;  /* Full width */
  box-sizing: border-box;  /* Include padding in width calculation */
  transition: border-color 0.3s;  /* Smooth transition for border color */
}
</style>