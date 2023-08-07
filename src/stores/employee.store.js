import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useEmployeeStore = defineStore({
    id: 'employee',
    state: () => ({
        employees: []
    }),
    actions: {
        async getEmployees() {
            axiosWrapper.get('/employee/info');
        }
    }
});