import { MyPage } from "@/views/personal";

export default {
    path: '/employee',
    children: [
        { path: 'mypage', component: MyPage}
    ]

}