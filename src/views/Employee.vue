<template>
    <div>
        <table class="table">
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
                <tr v-for="employee in employeeList" :key="employee">
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
    export default {
        data() {
            return {
                employeeList: [],
            }
        },
        mounted() {
            this.get();
        },
        methods: {
            get() {
                this.axios.get('/employee/info').then(res => { 
                    console.log(res.data);
                    this.employeeList = res.data;
            });
            },
        }
    }
</script>