<template>
  <ul class="task-list">
    <li v-for="task in tasks" :key="task.id" class="task-item">
      <span class="task-title">{{ task.title }}</span>
      <div class="task-actions">
        <button class="edit-button" @click="editTask(task)">Edit</button>
        <button class="delete-button" @click="deleteTask(task.id)">&#10005;</button> <!-- 'X' icon -->
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { type Task } from '../types'; // Define your Task type in a types file

export default defineComponent({
  props: {
    tasks: {
      type: Array as () => Task[],
      required: true
    }
  },
  methods: {
    deleteTask(taskId: number) {
      this.$emit('deleteTask', taskId);
    },
    editTask(task: Task) {
      const newTitle = prompt('Edit task title', task.title);
      if (newTitle) {
        this.$emit('updateTask', { ...task, title: newTitle });
      }
    }
  }
});
</script>

<style scoped>
.task-list {
  list-style: none; /* Remove bullet points */
  padding: 0; /* Remove default padding */
  margin: 0; /* Remove default margin */
  width: 100%; /* Full width */
  max-width: 500px; /* Maximum width for the task list */
  margin: 0 auto; /* Center the list horizontally */
}

.task-item {
  display: flex; /* Use Flexbox for layout */
  align-items: center; /* Center content vertically */
  justify-content: space-between; /* Space between task title and buttons */
  background-color: #1e1e1e; /* Dark background for task item */
  color: #e0e0e0; /* Light text color */
  padding: 10px 15px; /* Padding for task item */
  margin-bottom: 10px; /* Margin between tasks */
  border-radius: 8px; /* Rounded corners */
  font-family: 'Franklin Gothic Medium', Arial, sans-serif;
}

.task-title {
  flex: 1; /* Take up remaining space */
  text-align: left; /* Align text to the left */
}

.task-actions {
  display: flex; /* Use Flexbox for buttons */
  gap: 10px; /* Space between buttons */
}

.edit-button,
.delete-button {
  background-color: #333333; /* Dark button background */
  color: #e0e0e0; /* Light text color */
  border: none; /* Remove border */
  padding: 0.1em 0.2em; /* Padding for buttons */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 14px; /* Font size for buttons */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.edit-button:hover {
  background-color: #444444; /* Lighter background on hover */
}

.delete-button {
  font-size: 16px; /* Slightly larger for icon */
  background-color: #e74c3c; /* Red background for delete */
  color: #fff; /* White 'X' color */
}

.delete-button:hover {
  background-color: #c0392b; /* Darker red on hover */
}
</style>
