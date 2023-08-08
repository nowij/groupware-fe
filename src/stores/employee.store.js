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
            } catch (error) {
                console.log(error);
            }
        },
        async selectEmployee(param) {
            try {
                const response = await axiosWrapper.post('/employee/info/search', param);
                this.employees = response;
            } catch (error) {
                console.log(error);
            }
        }
    }
});