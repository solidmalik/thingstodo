<template>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="deleteTask(task.id)">Delete</button>
        <button @click="editTask(task)">Edit</button>
      </li>
    </ul>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Task } from '@/types';  // Define your Task type in a types file
  
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
  