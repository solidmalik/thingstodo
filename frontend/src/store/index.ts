import { createStore, ActionContext } from 'vuex';
import apiClient from "../axiosconfig";

// Define Task and State interfaces
interface Task {
  id: number;
  title: string;
}

interface State {
  tasks: Task[];
  token: string | null;
}

// Define a type for Vuex Context
type VuexContext = ActionContext<State, State>;

export default createStore<State>({
  state: {
    tasks: [],
    token: localStorage.getItem('token') || null,
  },
  getters: {
    isAuthenticated(state: State): boolean {
      return !!state.token;
    },
    tasks(state: State): Task[] {
      return state.tasks;
    },
  },
  actions: {
    async registerUser({ commit }: VuexContext, { username, password }: { username: string; password: string }) {
      const response = await apiClient.post('/api/register', { username, password });
      return response.data;
    },
    async login({ commit }: VuexContext, { username, password }: { username: string; password: string }) {
      const response = await apiClient.post('/api/login', { username, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      commit('setToken', token);
    },
    logout({ commit }: VuexContext) {
      localStorage.removeItem('token'); // Clear token from local storage
      commit('clearToken'); // Clear token from state
      commit('setTasks', []); // Optionally, clear tasks or other state
    },
    async fetchTasks({ commit, state }: VuexContext) {
      const response = await apiClient.get('/api/tasks', {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      commit('setTasks', response.data);
    },
    async createTask({ dispatch, state }: VuexContext, task: { title: string }) {
      await apiClient.post('/api/tasks', task, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      dispatch('fetchTasks');
    },
    async deleteTask({ dispatch, state }: VuexContext, taskId: number) {
      await apiClient.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      dispatch('fetchTasks');
    },
    async updateTask({ dispatch, state }: VuexContext, task: Task) {
      await apiClient.put(`/api/tasks/${task.id}`, task, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      dispatch('fetchTasks');
    },
  },
  mutations: {
    setToken(state: State, token: string) {
      state.token = token;
    },
    clearToken(state: State) {
      state.token = null; // Clear the token from state
    },
    setTasks(state: State, tasks: Task[]) {
      state.tasks = tasks;
    },
  },
});
