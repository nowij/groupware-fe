<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>사번</th>
                    <th>이름</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(employee, i) in employeeList">
                    <td>{{ employee.employeeId }}</td>
                    <td>{{ employee.userName }}</td>
                </tr>
            </tbody>1
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                employeeList: []
            };
        },
        created() {
            this.getList();
        },
        methods: {
            async getList() {
                this.employeeList = await this.$api("localhost:8080/employee/info", "get", '');
            }
        }
    }
</script>