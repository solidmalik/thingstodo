<template>
  <div class="home-page-view">
    <h1 class="title">Things To Do</h1>
    <button class="logout-button" @click="logoutUser">Logout</button>
    <div class="content-container">
      <TaskForm class="task-form" @addTask="addTask" />
      <TaskList class="task-list" :tasks="tasks" @delete-task="handleDeleteTask" @update-task="handleUpdateTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';
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
    ...mapActions(['fetchTasks', 'createTask', 'deleteTask', 'updateTask', 'logout']),

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

    logoutUser() {
      this.logout();
      this.$router.push('/login');
    }
  },
  created() {
    this.fetchTasks();
  }
});
</script>

<style scoped>
.home-page-view {
  background-color: #121212; /* Dark background */
  color: #e0e0e0; /* Light text color */
  min-height: 100vh; /* Full viewport height */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.title {
  color: #ffffff; /* White text color */
  font-size: 2.5rem; /* Large font size */
  text-align: center; /* Center the text */
}

.content-container {
  display: flex;
  flex-direction: column; /* Stack form and list vertically */
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
}

.logout-button {
  background-color: #1f1f1f; /* Darker button background */
  color: #ffffff; /* White text color */
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  align-self: flex-end; /* Align logout button to the right */
}

.logout-button:hover {
  background-color: #333333; /* Slightly lighter on hover */
}

.task-form {
  background-color: #1e1e1e; /* Dark background for form and list */
  color: #e0e0e0; /* Light text color */
  border: 1px solid #333; /* Subtle border */
  border-radius: 8px;
  padding: 20px;
  width: 40%;
  max-width: 500px;
  margin-bottom: 20px;
  margin-top: 5em;
  font-size: x-large;
}

.task-list {
  background-color: #1e1e1e; /* Dark background for form and list */
  color: #e0e0e0; /* Light text color */
  border: 1px solid #333; /* Subtle border */
  border-radius: 8px;
  padding: 0.2em;
  width: 80em;
  max-width: 500px;
  margin-bottom: 20px;
  margin-top: 5em;
  font-size: x-large;
}

button {
  background-color: #333333; /* Dark button background */
  color: #e0e0e0; /* Light text color */
  border: none;
  padding: 8px 16px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #444444; /* Lighter button background on hover */
}

input {
  background-color: #1e1e1e; /* Input dark background */
  color: #e0e0e0; /* Light text */
  border: 1px solid #444444; /* Dark border */
  padding: 12px 16px; /* Increased padding */
  border-radius: 8px; /* Rounded corners */
  margin-bottom: 15px; /* Increased margin */
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s; /* Smooth transition for border color */
}

input:focus {
  outline: none; /* Remove default outline */
  border-color: #007bff; /* Blue border color on focus */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); /* Add focus shadow */
}

input::placeholder {
  color: #888888; /* Lighter placeholder color */
}

@media (min-width: 768px) {
  .content-container {
    flex-direction: row; /* Side by side layout on larger screens */
    align-items: flex-start;
    justify-content: space-between;
  }

  .task-form, .task-list {
    margin-bottom: 0; /* Remove bottom margin */
  }
}

@media (min-width: 1200px) {
  .home-page-view {
    padding: 40px; /* Increase padding for larger screens */
  }

  .logout-button {
    font-size: 18px; /* Increase button font size */
  }
}
</style>
