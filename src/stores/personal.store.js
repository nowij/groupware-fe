import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const usePersonalStore = defineStore({
    id: 'personal',
    state: () => ({
        myInfo: {},
        status: ''
    }),
    actions: {
        async getMyInfo(param) {
            const response = await axiosWrapper.post('/employee/mypage', param);
            this.myInfo = response.data;
        },
        async saveMyInfo(param) {
            const response = await axiosWrapper.post('/employee/mypage/update', param);
            this.status = response.status;
        }
    }
})