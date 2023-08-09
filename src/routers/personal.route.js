import { MyPage, Main, Layout } from "@/views/personal";

export default {
    path: '/gw',
    component: Layout,
    children: [
        { path: 'mypage', component: MyPage},
        { path: '', component: Main }
    ]

}