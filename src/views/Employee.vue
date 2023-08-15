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
                    <select class="form-select" v-model="searchDept" @change="selectValue">
                        <option value="" selected>부서</option>
                        <option v-for="(department, i) in departments" :key="i" :value="department.deptCode">
                            {{ department.deptName }}
                        </option>
                    </select>
                </div>
                <div class="me-1">
                    <select class="form-select" v-model="searchPosit" @change="selectValue">
                        <option value="" selected>직위</option>
                        <option v-for="(position, i) in positions" :key="i" :value="position.positCode">
                            {{ position.positName }}
                        </option>
                    </select>
                </div>
                <div class="me-1">
                    <input type="text" placeholder="전화번호" class="form-control" v-model="searchPhone">
                </div>
                <div class="me-1">
                    <select class="form-select" v-model="activeYn">
                        <option value="Y" selected>재직</option>
                        <option value="N">퇴사</option>
                    </select>
                </div>
                <div class="me-1">
                    <button type="submit" class="btn btn-outline-secondary me-1" @click.self.prevent="doSearch">검색</button>
                    <button class="btn btn-outline-secondary" @click="doReset">초기화</button>
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
                <tr v-for="(employee, i) in employees" :key="i">
                    <td>{{ employee.employeeId }}</td>
                    <td>{{ employee.userName }}</td>
                    <td>{{ employee.department.deptName }}</td>
                    <td>{{ employee.position.positionName }}</td>
                    <td>{{ employee.phone }}</td>
                    <td>{{ employee.email }}</td>
                    <td v-if="employee.activeYn === 'Y'">재직</td>
                    <td v-else-if="employee.activeYn === 'N'">퇴사</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useEmployeeStore, useCommonStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { ref } from 'vue';

const employeeStore = useEmployeeStore();
const commonStore = useCommonStore();
const { employees } = storeToRefs(employeeStore);
const { positions, departments } = storeToRefs(commonStore);
const searchId = ref('')
const searchName = ref('')
const searchPhone = ref('')
const searchPosit = ref('')
const searchDept = ref('')
const activeYn = ref('Y')

onMounted(() => {
    getList(),
    getCommon()
})

// methods
const getList = () => {
    employeeStore.getEmployees()
}

const getCommon = () => {
    commonStore.getPositions();
    commonStore.getDepartments();
}

const doSearch = () => {
    const searchParams = {
        employeeId: searchId.value,
        userName: searchName.value,
        phone: searchPhone.value,
        activeYn: activeYn.value,
        position: {
            positionCode: searchPosit.value
        },
        department: {
            deptCode: searchDept.value
        },
    }
   employeeStore.selectEmployee(searchParams);
}

const doReset = () => {
    searchId.value = ''
    searchName.value = ''
    searchPhone.value = ''
    searchPosit.value = ''
    searchDept.value = ''
    activeYn.value = ''
}
</script>