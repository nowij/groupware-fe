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
    <EmployeeDetail v-if="detailMdl == true"/>
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
            <tbody v-if="employees.length > 0">
                <tr v-for="(employee, i) in employees" :key="i">
                    <td>{{ employee.employeeId }}</td>
                    <td>{{ employee.userName }}</td>
                    <td>{{ employee.department.deptName }}</td>
                    <td>{{ employee.position.positionName }}</td>
                    <td>{{ employee.phone }}</td>
                    <td>{{ employee.email }}</td>
                    <td v-if="employee.activeYn === 'Y'">재직</td>
                    <td v-else-if="employee.activeYn === 'N'">퇴사</td>
                    <td v-if="user && isAdmin">
                        <button class="btn btn-outline-success m-2" @click="modalStore.open(employee.employeeId)">수정</button>
                        <button class="btn btn-outline-danger" @click="doDelete(employee.employeeId)">퇴사</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="employees.length > 0">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" >
					<a class="page-link" aria-label="Previous" @click.prevent="--pageParam.pageNo"><span aria-hidden="true">&laquo;</span></a>
				</li>
                <li class="page-item" :class="{ active: pageParam.pageNo === 0 ? pageParam.pageNo === i : pageParam.pageNo === page }" v-for="(page,i) in pageCount" :key="i">
					<a class="page-link" @click.prevent="pageParam.pageNo = page">{{ page }}</a>
				</li>
                <li class="page-item" >
					<a class="page-link" aria-label="Next" @click.prevent="++pageParam.pageNo"><span aria-hidden="true">&raquo;</span></a>
				</li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { EmployeeDetail } from '@/views/employee';
import { useEmployeeStore, useCommonStore, useAlertStore, useModalStore, useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, computed, watch } from 'vue';
import { ref } from 'vue';

const employeeStore = useEmployeeStore()
const commonStore = useCommonStore()
const alertStore = useAlertStore()
const modalStore = useModalStore()
const authStore = useAuthStore()
const { detailMdl } = storeToRefs(modalStore)
const { employees, status, pageInfo } = storeToRefs(employeeStore)
const { positions, departments } = storeToRefs(commonStore)
const { user, isAdmin } = storeToRefs(authStore)

const searchId = ref('')
const searchName = ref('')
const searchPhone = ref('')
const searchPosit = ref('')
const searchDept = ref('')
const activeYn = ref('Y{')
const pageParam = reactive({
    pageNo: 0,
    pageSize: 5
})
const pageCount = computed(() =>
	Math.ceil(pageInfo.value.totalElements / pageParam.pageSize),
)

onMounted(() => {
    getList(),
    getCommon()
})

// methods
const getList = () => {
    if (pageParam.pageNo >= 1){
        const newParams = {
            ...pageParam,
            pageNo: pageParam.pageNo - 1
        }
        employeeStore.selectEmployees(newParams)
    } else {
        employeeStore.selectEmployees(pageParam)
    }
}

watch(() => getList())

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

const doDelete = async (id) => {
    await employeeStore.deleteEmployee(id)
    if (status.value === 200) {
        alertStore.success('삭제됐습니다')
    }
}
</script>