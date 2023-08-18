import { Layout, Employees, EmployeeDetail } from '@/views/employee'

export default {
    path: '/employee',
    component: Layout,
    children: [
        { path: '', component: Employees},
        { path: 'detail', component: EmployeeDetail}
    ]
}