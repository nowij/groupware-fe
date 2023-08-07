import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useEmployeeStore = defineStore({
    id: 'employee',
    state: () => ({
        employees: {}
    }),
    actions: {
        async getEmployees() {
            try {
                const response = await axiosWrapper.get('/employee/info');
                this.employees = response;
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }
});