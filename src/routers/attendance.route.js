import { Layout, workingDay } from '@/views/attendance'

export default {
    path: '/att',
    component: Layout,
    children: [
        { path: 'workd', component: workingDay}
    ]
}