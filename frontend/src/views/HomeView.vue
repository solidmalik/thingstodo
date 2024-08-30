<template>
  <div class="home-page-view">
    <button @click="logoutUser">Logout</button> <!-- Logout Button -->
    <TaskForm @addTask="addTask" />
    <TaskList :tasks="tasks" @delete-task="handleDeleteTask" @update-task="handleUpdateTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  components: {
    TaskForm,
    TaskList
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    ...mapActions(['fetchTasks', 'createTask', 'deleteTask', 'updateTask', 'logout']),  // Include the logout action

    async addTask(task: { title: string }) {
      try {
        await this.createTask(task);
      } catch (error) {
        console.error('Failed to add task', error);
      }
    },

    async handleDeleteTask(taskId: number) {
      try {
        await this.deleteTask(taskId);
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    },

    async handleUpdateTask(updatedTask: { id: number; title: string }) {
      try {
        await this.updateTask(updatedTask);
      } catch (error) {
        console.error('Failed to update task', error);
      }
    },

    // Logout method to call the Vuex logout action and redirect
    logoutUser() {
      this.logout();  // Call Vuex action to clear user data
      this.$router.push('/login');  // Redirect to login page
    }
  },
  created() {
    this.fetchTasks();  // Fetch tasks on component creation
  }
});
</script>
