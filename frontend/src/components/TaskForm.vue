<template>
    <form @submit.prevent="submitForm">
      <input v-model="title" type="text" placeholder="Task Title" required />
      <button type="submit">Add Task</button>
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
  