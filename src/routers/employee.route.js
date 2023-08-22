import { Layout, Employees } from '@/views/employee'

export default {
    path: '/employee',
    component: Layout,
    children: [
        { path: '', component: Employees}
    ]
}