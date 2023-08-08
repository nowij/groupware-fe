import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useCommonStore = defineStore({
    id: 'common',
    state: () => ({
        positions: {},
        departments: {}
    }),
    actions: {
        async getPositions() {
            try {
                const response = await axiosWrapper.get('/cmm/position');
                this.positions = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getDepartments() {
            try {
                const response = await axiosWrapper.get('/cmm/department');
                this.departments = response.data;
            } catch (err) {
                console.log(err);
            }
        }
    }
});