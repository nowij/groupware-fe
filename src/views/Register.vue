<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2 mt-5">
                <div class="row justify-content-center">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title text-center pb-3 fs-4">회원가입</h5>
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">사번</label>
                                    <input type="text" class="form-control" v-model="id">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">부서</label>
                                    <select class="form-select" v-model="dept">
                                        <option :value="department.deptCode" v-for="(department, i) in departmentList"
                                            :key="i">
                                            {{
                                                department.deptName }}</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">이름</label>
                                    <input type="text" class="form-control" v-model="name">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">직위</label>
                                    <select class="form-select" v-model="posit">
                                        <option :value="position.positCode" v-for=" (position, i) in positionList" :key="i">
                                            {{
                                                position.positName }}</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">비밀번호</label>
                                    <input type="password" class="form-control" v-model="pwd">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">이메일</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="email">
                                        <span class="input-group-text">@nowij.com</span>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="inputAddress5" class="form-label">전화번호</label>
                                    <input type="text" class="form-control" placeholder="- 없이 입력" v-model="phone">
                                </div>
                                <div class="col-12">
                                    <label for="inputAddress2" class="form-label">주소</label>
                                    <input type="text" class="form-control" v-model="addr">
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary w-100" @click="submit">등록</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCommonStore, useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
    setup() {
        return {
            departmentList: ref([]),
            positionList: ref([]),
            id: ref(''),
            pwd: ref(''),
            dept: ref('010'),
            posit: ref('011'),
            name: ref(''),
            email: ref(''),
            phone: ref(''),
            addr: ref('')
        }
    },
    mounted() {
        this.setCommon()
    },
    computed: {
        fullEmail() {
            return this.email + '@nowij.com';
        }
    },
    methods: {
        async setCommon() {
            const commonStore = useCommonStore();
            const { positions, departments } = storeToRefs(commonStore);

            await commonStore.getPositions();
            await commonStore.getDepartments();
            this.positionList = positions.value;
            this.departmentList = departments.value;
        },
        submit() {
            const authStore = useAuthStore();

            // const alertStore = useAlertStore;
            const datas = {
                employeeId: this.id,
                userPasswd: this.pwd,
                userName: this.name,
                email: this.fullEmail,
                phone: this.phone,
                address: this.addr,
                department: {
                    deptCode: this.dept
                },
                position: {
                    positionCode: this.posit
                },
                activeYn: 'Y'
            }

            authStore.register(datas);
        }
    }
}
</script>

<style>
.card {
    width: 30rem;
}
</style>