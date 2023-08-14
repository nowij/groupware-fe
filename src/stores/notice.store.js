import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useNoticeStore = defineStore({
    id: 'notice',
    state: () => ({
        notices: {},
        status: ''
    }),
    actions: {
        async getNotices() {
            const response = await axiosWrapper.get("/notice");
            this.notices = response.data;
        },
        async saveNotice(param) {
            const response = await axiosWrapper.post("/notice/save", param)
            this.status = response.status;
        }
    }
})