<template>
    <div id="formArea" class="row justify-content-center">
        <form id="formBody" v-if="user">
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">제목</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="details.title" placeholder="제목을 입력하세요."/>
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">상단 공지</label>
                <div class="col-sm-10">
                    <input type="checkbox" class="form-check-input" true-value="Y" false-value="N"
                        v-model="details.fixedYn" />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">작성자</label>
                <div class="col-sm-10">
                    <span>{{ user.userName }}</span>
                </div>
            </div>
            <div class="noticeDivision"></div>
            <div class="row mb-3">
                <textarea class="form-control" rows="15" v-model="details.content" placeholder="내용을 입력하세요."></textarea>
            </div>
            <div class="btnArea">
                <button type="submit" class="btn btn-primary" @click.self.prevent="doSubmit">저장</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useAuthStore, useNoticeStore, useAlertStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, defineProps, onMounted } from 'vue'

const authStore = useAuthStore()
const noticeStore = useNoticeStore()
const alertStore = useAlertStore()
const { user } = storeToRefs(authStore)
const { status } = storeToRefs(noticeStore)
const details = ref({})
const props = defineProps({
    no: Number
})

onMounted( async() => {
    if (props.no != undefined){
        details.value = await noticeStore.selectContent(props.no)
    }
})

// methods
const doSubmit = () => {
    if (props.no == undefined) {
        const datas = {
            title: details.value.title,
            content: details.value.content,
            employeeId: user.value.employeeId,
            fixedYn: details.value.fixedYn
        }
        noticeStore.saveNotice(datas);
    } else {
        const datas = { ...details.value }
        console.log(details.value);
        noticeStore.updateContent(datas)
    }

    // TODO : 저장완료 모달창 띄우고 페이지 list로 가게 수정
    if (status.value === 200) {
        alertStore.success('저장되었습니다.');
    }
}

</script>
