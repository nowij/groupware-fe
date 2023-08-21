<template>
    <section class="section profile">
        <div class="row justify-content-center">
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
                        <img src="@/assets/profile.png" alt="Profile" class="rounded-circle">
                        <h2>{{ user.userName }}</h2>
                        <h3>{{ myInfo.position.positionName }}</h3>
                    </div>
                </div>
            </div>

            <div class="col-xl-4">
                <div class="card">
                    <div class="card-body pt-3">
                        <ul class="nav nav-tabs nav-tabs-bordered">
                            <li class="nav-item">
                                <button class="nav-link" @click="overviewTabClick"
                                    :class="{ active: overview }">기본정보</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" @click="passwdTabClick" :class="{ active: changpw }">비밀번호
                                    변경</button>
                            </li>
                        </ul>

                        <div class="tab-content pt-2">
                            <!-- 기본정보 -->
                            <div class="tab-pane fade show active profile-overview" id="overview" v-if="overview">
                                <form >
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label ">사번</div>
                                        <div class="col-lg-9 col-md-8">{{ myInfo.employeeId }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label">이름</div>
                                        <div class="col-lg-9 col-md-8">{{ myInfo.userName }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label">소속</div>
                                        <div class="col-lg-9 col-md-8">{{ myInfo.department.deptName }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label">직위</div>
                                        <div class="col-lg-9 col-md-8">{{ myInfo.position.positionName }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label">이메일</div>
                                        <div class="col-md-8 col-lg-9">
                                            <input type="text" v-model="myInfo.email" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label">전화번호</div>
                                        <div class="col-md-8 col-lg-9">
                                            <input type="text" v-model="myInfo.phone" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label">주소</div>
                                        <div class="col-md-8 col-lg-9">
                                            <input type="text" v-model="myInfo.address" class="form-control">
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary w-100"
                                            @click.self.prevent="submit">저장</button>
                                    </div>
                                </form>
                            </div>
                            <!-- 비밀번호 변경 -->
                            <div class="tab-pane fade show active profile-overview" id="change-password"
                                v-else-if="changpw">
                                <form>
                                    <div class="row mb-3">
                                        <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">현재
                                            비밀번호</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input name="password" type="password" class="form-control"
                                                id="currentPassword">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">새 비밀번호</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input name="newpassword" type="password" class="form-control" id="newPassword">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">비밀번호 확인</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input name="renewpassword" type="password" class="form-control"
                                                id="renewPassword">
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary w-100">저장</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { usePersonalStore, useAuthStore, useAlertStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';

const personalStore = usePersonalStore()
const authStore = useAuthStore()
const alertStore = useAlertStore()
const { status } = storeToRefs(personalStore)
const { user } = storeToRefs(authStore)
const { myInfo } = storeToRefs(personalStore)
const overview = ref(true)
const changpw = ref(false)

onMounted(() => {
    select()
})

// methods
const select = async () => {
    const datas = {
        employeeId: user.value.employeeId
    }
    await personalStore.getMyInfo(datas);
}

const submit = async () => {
    const datas = {
        employeeId: myInfo.value.employeeId,
        email: myInfo.value.email,
        phone: myInfo.value.phone,
        address: myInfo.value.address
    }
    await personalStore.saveMyInfo(datas);

    if (status.value === 200) {
        alertStore.success('저장 되었습니다.');
    } else {
        alertStore.error('오류가 발생했습니다.');
    }
}

const overviewTabClick = () => {
    overview.value = true;
    changpw.value = false;
}
const passwdTabClick = () => {
    overview.value = false;
    changpw.value = true;
}

</script>