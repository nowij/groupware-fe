<template>
    <div id="searchArea">
        <form>
            <div class="d-flex pt-2 pb-5 justify-content-center">
                <div class="me-1">
                    <input type="text" placeholder="사번" class="form-control" v-model="searchId">
                </div>
                <div class="me-1">
                    <input type="text" placeholder="성명" class="form-control" v-model="searchName">
                </div>
                <div class="me-1">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>직위</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="me-1">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>소속</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="me-1">
                    <input type="text" placeholder="전화번호" class="form-control" v-model="searchPhone">
                </div>
                <div class="me-1">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>재직</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="me-1">
                    <button type="submit" class="btn btn-outline-secondary" @click.self.prevent="search">검색</button>
                </div>
            </div>
        </form>
    </div>

    <div>
        <h5 class="card-title">직원 조회</h5>
        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th>사번</th>
                    <th>이름</th>
                    <th>직위</th>
                    <th>소속</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>재직상태</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, i) in employeeList" :key="i">
                    <td>{{ employee.employeeId }}</td>
                    <td>{{ employee.userName }}</td>
                    <td>{{ employee.department.deptName }}</td>
                    <td>{{ employee.position.positionName }}</td>
                    <td>{{ employee.phone }}</td>
                    <td>{{ employee.email }}</td>
                    <td v-if="employee.activeYn === 'N'">재직</td>
                    <td v-else-if="employee.activeYn === 'Y'">퇴사</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { useEmployeeStore } from '@/stores';
    import { storeToRefs } from 'pinia';

    export default {
        setup() {
            return {
                employeeList: {},
                searchId: null,
                searchName: null,
                searchPhone: null,
            }
        },
        mounted() {
            this.get();
        },
        methods: {
            async get() {
                const employeeStore = useEmployeeStore();
                await employeeStore.getEmployees()
                
                const { employees } = storeToRefs(employeeStore);
                this.employeeList = JSON.parse(JSON.stringify(employees.value));
                
                console.log(this.employeeList);

            //     this.axios.get('/employee/info')
            //     .then(res => {
            //         this.employeeList = res.data;
            // });
            },
            search() {
                this.axios.post('/employee/info/search', {
                    employeeId: this.searchId,
                    userName: this.searchName,
                    phone: this.searchPhone
                }).then(res => {
                    console.log(res.data);
                    this.employeeList = res.data
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style>
    #searchArea select {
        width: 6rem;
    }

    #searchArea input {
        width: 10rem;
    }
</style>