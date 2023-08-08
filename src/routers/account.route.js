import { Login, Layout } from '@/views/account'

export default {
    path: '/auth',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login }
    ]
}