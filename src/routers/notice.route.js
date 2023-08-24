import { Layout, NoticeList, NoticeContent, NoticeForm } from '@/views/notice';

export default {
    path: '/notice',
    component: Layout,
    children: [
        { path: '', component: NoticeList},
        { path: 'content/:no', component: NoticeContent, props: true, name: 'content'},
        { path: 'form', component: NoticeForm},
        { path: 'form?no=:no', component: NoticeForm, name: 'form', props:true}
    ]
}