import { Layout, NoticeList, NoticeContent, NoticeForm } from '@/views/notice';

export default {
    path: '/notice',
    component: Layout,
    children: [
        { path: '', component: NoticeList},
        { path: 'content', component: NoticeContent},
        { path: 'form', component: NoticeForm}
    ]
}