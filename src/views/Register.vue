<template>
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
                                <option :value="department.deptCode" v-for="(department, i) in departments" :key="i">
                                    {{ department.deptName }}</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">이름</label>
                            <input type="text" class="form-control" v-model="name">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">직위</label>
                            <select class="form-select" v-model="posit">
                                <option :value="position.positCode" v-for=" (position, i) in positions" :key="i">
                                    {{ position.positName }}</option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label class="form-label">입사일</label>
                            <Datepicker class="form-control" v-model="joinDate" :locale="locale" :input-format="format" />
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
                            <button type="submit" class="btn btn-primary w-100" @click="doSubmit">등록</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCommonStore, useAuthStore, useEmployeeStore } from '@/stores';
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import Datepicker from 'vue3-datepicker'
import { ko } from 'date-fns/locale'

const authStore = useAuthStore();
const commonStore = useCommonStore()
const employeeStore = useEmployeeStore()
const { id } = storeToRefs(employeeStore)
const { positions, departments } = storeToRefs(commonStore)

const locale = reactive(ko)
const joinDate = ref(new Date())
const format = ref('yyyy-MM-dd')
const pwd = ref('')
const name = ref('')
const phone = ref('')
const email = ref('')
const addr = ref('')
const dept = ref('010')
const posit = ref('011')

const fullEmail = computed(() => {
    return email.value + '@nowij.com'
})

onMounted(() => {
    setNewId(), setCommon()
})

// methods
const setCommon = () => {
    commonStore.getPositions()
    commonStore.getDepartments()
}

const setNewId = () => {
    employeeStore.selectNewId();
}

const doSubmit = () => {
    const datas = {
        employeeId: id.value,
        userPasswd: pwd.value,
        userName: name.value,
        email: fullEmail.value,
        phone: phone.value,
        address: addr.value,
        department: {
            deptCode: dept.value
        },
        position: {
            positionCode: posit.value
        },
        activeYn: 'Y',
        joinDate: joinDate.value
    }
    authStore.register(datas);
}
</script >

<style>
.card {
    width: 30rem;
}
</style>