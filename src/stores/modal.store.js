import { defineStore } from "pinia";

export const useModalStore = defineStore({
    id: 'modal',
    state: () => ({
        detailMdl: false
    }),
    actions: {
        open() {
            console.log(this.detailMdl)
            this.detailMdl = !this.detailMdl
            console.log(this.detailMdl)
        }
    }
});