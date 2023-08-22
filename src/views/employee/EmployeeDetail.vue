<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>직원 정보 수정</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="doClose"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3" v-if="myInfo.employeeId != null">
                        <div class="col-md-6">
                            <label class="form-label">사번</label>
                            <input type="text" class="form-control" v-model="id" disabled>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">부서</label>
                            <select class="form-select" v-model="myInfo.department.deptCode">
                                <option :value="department.deptCode" v-for="(department, i) in departments" :key="i">
                                    {{ department.deptName }}</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">이름</label>
                            <input type="text" class="form-control" v-model="myInfo.userName">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">직위</label>
                            <select class="form-select" v-model="myInfo.position.positionCode">
                                <option :value="position.positCode" v-for=" (position, i) in positions" :key="i">
                                    {{ position.positName }}</option>
                            </select>
                        </div>
                        <!-- <div class="col-12">
                            <label class="form-label">입사일</label>
                            <Datepicker class="form-control" v-model="myInfo.joinDate" :locale="locale" :format="format" />
                        </div> -->
                        <div class="col-12">
                            <label class="form-label">이메일</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="myInfo.email">
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="inputAddress5" class="form-label">전화번호</label>
                            <input type="text" class="form-control" placeholder="- 없이 입력" v-model="myInfo.phone">
                        </div>
                        <div class="col-12">
                            <label for="inputAddress2" class="form-label">주소</label>
                            <input type="text" class="form-control" v-model="myInfo.address">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" @click="submit">저장</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore, usePersonalStore,useCommonStore, useAlertStore, useEmployeeStore } from '@/stores';
 import { onMounted } from 'vue';
import { router } from '@/routers';
// import { ko } from 'date-fns/locale'

// const locale = reactive(ko)
// const format = ('yyyy-MM-dd')
const modalStore = useModalStore()
const personalStore = usePersonalStore()
const commonStore = useCommonStore()
const alertStore = useAlertStore()
const employeeStore = useEmployeeStore()
const { detailMdl, id } = storeToRefs(modalStore)
const { myInfo } = storeToRefs(personalStore)
const { positions, departments } = storeToRefs(commonStore)
const { status } = storeToRefs(employeeStore)

onMounted(async () => {
    const data = {
        employeeId: id.value
    }
    await personalStore.selectInfo(data)

    await commonStore.getDepartments()
    await commonStore.getPositions()
    // if (myInfo.value.joinDate == undefined) {
    //     myInfo.value.joinDate = new Date()
    // } else {
    //     myInfo.value.joinDate = new Date(myInfo.value.joinDate)
    // }
    
})

// methods
const doClose = () => {
    detailMdl.value = false
}

const submit = async () => {
    const employeeId = id.value
    const data = {
        department : {
            deptCode: myInfo.value.department.deptCode
        },
        position : {
            positionCode: myInfo.value.position.positionCode
        },
        userName: myInfo.value.userName,
        email: myInfo.value.email,
        phone: myInfo.value.phone,
        address: myInfo.value.address,
        employeeId: myInfo.value.employeeId
    }
    await employeeStore.saveInfoOnByAdmin(data, employeeId)
    if (status.value == 200) {
        router.go()
        alertStore.success("저장됐습니다.");
    }
}
</script>