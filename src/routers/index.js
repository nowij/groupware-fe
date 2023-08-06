import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Employee from '@/views/Employee.vue'
import MyPage from '@/views/Mypage.vue';
import Main from '@/views/Main.vue';

const routes = [
  {
    path: '/auth/login',
    name: 'login',
    component: Login
  },
  {
    path: '/auth/register',
    name: 'register',
    component: Register
  },
  {
    path: '/employee/info',
    name: 'employee',
    component: Employee
  },
  {
    path: '/employee/mypage',
    component: MyPage
  },
  {
    path: '/',
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
