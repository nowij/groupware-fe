import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useEmployeeStore = defineStore({
    id: 'employee',
    state: () => ({
        employees: {},
        id: ''
    }),
    actions: {
        async getEmployees() {
            try {
                const response = await axiosWrapper.get('/employee/info');
                this.employees = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async selectEmployee(param) {
            try {
                const response = await axiosWrapper.post('/employee/info/search', param);
                this.employees = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async selectNewId() {
            try {
                const response = await axiosWrapper.get('/employee/newId');
                this.id = response.data;
            } catch (error) {
                console.log(error)
            }
        }
    }
});