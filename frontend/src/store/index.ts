import { createStore } from 'vuex';
import apiClient from '@/axiosConfig';

interface Task {
  id: number;
  title: string;
}

interface State {
  tasks: Task[];
  token: string | null;
}

export default createStore<State>({
  state: {
    tasks: [],
    token: localStorage.getItem('token') || null
  },
  getters: {
    isAuthenticated(state: { token: any; }): boolean {
      return !!state.token;
    },
    tasks(state: { tasks: Task[]; }): Task[] {
      return state.tasks;
    }
  },
  actions: {
    async login({ commit }, { username, password }: { username: string; password: string }) {
      const response = await apiClient.post('/api/login', { username, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      commit('setToken', token);
    },
    // Add the logout action
    logout({ commit }) {
      localStorage.removeItem('token');  // Clear token from local storage
      commit('clearToken');  // Clear token from state
      commit('setTasks', []);  // Optionally, clear tasks or other state
    },
    async fetchTasks({ commit, state }) {
      const response = await apiClient.get('/api/tasks', {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      commit('setTasks', response.data);
    },
    async createTask({ dispatch, state }, task: { title: string }) {
      await apiClient.post('/api/tasks', task, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch('fetchTasks');
    },
    async deleteTask({ dispatch, state }, taskId: number) {
      await apiClient.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch('fetchTasks');
    },
    async updateTask({ dispatch, state }, task: Task) {
      await apiClient.put(`/api/tasks/${task.id}`, task, {
        headers: { Authorization: `Bearer ${state.token}` }
      });
      dispatch('fetchTasks');
    }
  },
  mutations: {
    setToken(state: { token: string; }, token: string) {
      state.token = token;
    },
    clearToken(state: { token: any; }) {
      state.token = null;  // Clear the token from state
    },
    setTasks(state: { tasks: Task[]; }, tasks: Task[]) {
      state.tasks = tasks;
    }
  }
});
