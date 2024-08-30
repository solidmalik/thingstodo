import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import RegisterUser from '../views/RegisterUser.vue'
import store from '@/store';

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: RegisterUser, 
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
