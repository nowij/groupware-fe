import { defineStore } from "pinia";

export const useModalStore = defineStore({
    id: 'modal',
    state: () => ({
        detailMdl: false,
        id : null
    }),
    actions: {
        open(id) {
            this.detailMdl = true
            this.id = id
        }
    }
});