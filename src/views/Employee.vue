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
                <tr v-for="employee in employeeList" :key="employee">
                    <td>{{ employee.employeeId }}</td>
                    <td>{{ employee.userName }}</td>
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