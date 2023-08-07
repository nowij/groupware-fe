import { createRouter, createWebHistory } from 'vue-router'
import { useAlertStore, useAuthStore } from '@/stores';

import Employee from '@/views/Employee.vue'
import Main from '@/views/Main.vue';
import accountRoute from './account.route';
import employeeRoute from './employee.route';

const routes = [
  { ...accountRoute },
  { ...employeeRoute },
  {
    path: '/employee/info',
    name: 'employee',
    component: Employee
  },
  {
    path: '/',
    component: Main
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/auth/login', ];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  console.log('to.path ' + to.path)
  console.log('authRequired ' + authRequired)
  console.log('!authStore.user ' + !authStore.user)
  console.log(authRequired && !authStore.user)

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/auth/login';
  }
})
