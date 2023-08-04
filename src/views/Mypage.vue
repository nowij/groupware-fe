<template>
    <div>
        <div class="container p-4">
            <table class="table">
                <tbody>
                    <tr>
                        <th>사번</th>
                        <td>{{ employee.employeeId }}</td>
                        <th>소속</th>
                        <td>소속</td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>{{ employee.userName }}</td>
                        <th>직위</th>
                        <td>직위</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="container p-4">
            <form>
                <table class="table">
    
                    <tbody>
                        <tr>
                            <th>이메일</th>
                            <td><input type="text" v-model="employee.email" class="form-control"></td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td><input type="text" v-model="employee.phone" class="form-control"></td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td><input type="text" v-model="employee.address" class="form-control"></td>
                        </tr>
                        <tr>
                            <th>사진</th>
                            <td><input type="text" v-model="employee.image" class="form-control"></td>
                            <button class="btn ">등록</button>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" class="btn btn-primary" @click.self.prevent="submit">저장</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                employee: {}
            }
        },
        mounted() {
            this.select();
        },
        methods: {
            select() {
                this.axios.post('/employee/mypage', {
                        employeeId: 'test'
                })
                .then(response => {
                    this.employee = response.data;
                }).catch(err => {
                    console.log(err);
                });
            },
            submit() {
                this.axios.post('/employee/mypage/update', {
                    employeeId: this.employee.employeeId,
                    email: this.employee.email,
                    phone: this.employee.phone,
                    address: this.employee.email
                })
                .then(response => {
                    console.log("응답");
                    console.log(response.data);
                    this.employee = response.data;
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>