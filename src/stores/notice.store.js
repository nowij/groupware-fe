import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useNoticeStore = defineStore({
    id: 'notice',
    state: () => ({
        notices: {},
        status: '',
        detail: {}
    }),
    actions: {
        async getNotices() {
            const response = await axiosWrapper.get("/notice");
            this.notices = response.data;
        },
        async saveNotice(param) {
            const response = await axiosWrapper.post("/notice/save", param)
            this.status = response.status;
        },
        async selectContent(param) {
            const response = await axiosWrapper.get(`/notice/content/${param}`)
            return response.data
        },
        updateContent(param) {
            axiosWrapper.put('/notice/content/update', param)
        },
        async deleteContent(param) {
            const response = await axiosWrapper.delete('/notice/delete', param)
            this.notices = this.notices.filter(x => x.noticeNo !== param)
            this.status = response.status
        }
    }
})