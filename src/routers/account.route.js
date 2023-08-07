import { Login, Register, Layout } from '@/views/account'

export default {
    path: '/auth',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login },
        { path: 'register', component: Register }
    ]
}