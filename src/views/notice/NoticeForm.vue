<template>
    <div id="formArea" class="row justify-content-center">
        <h5 class="card-title text-center pb-3 fs-4 mb-4">공지사항 등록</h5>
        <form id="formBody">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">제목</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="title" />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">상단고정</label>
                <div class="col-sm-10">
                    <input type="checkbox" class="form-check-input" id="fixedYn" true-value="Y" false-value="N"
                        v-model="checked" />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">작성자</label>
                <div class="col-sm-10">
                    <span>{{ user.userName }}</span>
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">내용</label>
                <div class="col-sm-10">
                    <textarea class="form-control" rows="5" v-model="content"></textarea>
                </div>
            </div>
            <div id="btnArea">
                <button type="submit" class="btn btn-primary" @click.self.prevent="doSubmit">저장</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useAuthStore, useNoticeStore, useAlertStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const authStore = useAuthStore()
const noticeStore = useNoticeStore()
const alertStore = useAlertStore()
const { user } = storeToRefs(authStore)
const { status } = storeToRefs(noticeStore)
const title = ref('')
const content = ref('')
const checked = ref(false)

// methods
const doSubmit = () => {
    if (checked.value) {
        checked.value = 'Y'
    } else if (!checked.value) {
        checked.value = 'N'
    }

    const datas = {
        title: title.value,
        content: content.value,
        employeeId: user.value.employeeId,
        fixedYn: checked.value
    }
    
    noticeStore.saveNotice(datas);
    if (status.value === 200) {
        alertStore.success('저장되었습니다.');
    }
}

</script>
