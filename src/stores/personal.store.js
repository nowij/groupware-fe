import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const usePersonalStore = defineStore({
    id: 'personal',
    state: () => ({
        myInfo: {},
        status: ''
    }),
    actions: {
        async selectInfo(param) {
            console.log(this.myInfo)
            const response = await axiosWrapper.post('/personal/info', param);
            this.myInfo = response.data;
        },
        async saveInfo(param) {
            const response = await axiosWrapper.put('/personal/info/save', param);
            this.status = response.status;
        },
    }
})