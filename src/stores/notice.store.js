import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useNoticeStore = defineStore({
    id: 'notice',
    state: () => ({
        notices: {},
        status: '',
        detail: {},
        pageInfo: {}
    }),
    actions: {
        async selectNotices(param) {
            const response = await axiosWrapper.post("/notice", param)
            const { content, pageSize, totalElements, totalPages } = response.data
            this.notices = content
            this.pageInfo = {pageSize, totalElements, totalPages }
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