import { defineStore } from "pinia";
import { axiosWrapper } from "@/mixins";

export const useEmployeeStore = defineStore({
    id: 'employee',
    state: () => ({
        employees: {},
        id: '',
        status: 0
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
        },
        async deleteEmployee(param) {
            try {
                const response = await axiosWrapper.delete(`/employee/delete/${param}`)
                this.status = response.status
                this.employees = this.employees.filter(x => x.employeeId !== param)
            } catch (error) {
                console.log(error)
            }
        },
        async saveInfoOnByAdmin(param, id) {
            try {
                const response = await axiosWrapper.put(`/employee/save/${id}`, param)
                this.status = response.status
            } catch (error) {
                console.log(error)
            }
            
        }
    }
});