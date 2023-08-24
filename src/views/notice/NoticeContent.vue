<template>
    <div>
        <h3>{{ content.title }}</h3>
    </div>
    <div class="pb-2">
        {{ content.employeeName }} | {{ content.firstDate }}
    </div>
    <div class="noticeDivision"></div>
    <div class="noticeContentBody">
        {{ content.content }}
    </div>
    <div class="btnArea">
        <router-link v-if="isAdmin" :to="{name: 'form', query: {no: props.no}}"><button class="btn btn-outline-warning">수정</button></router-link>
        <button v-if="isAdmin" class="btn btn-outline-danger" @click="doDelete">삭제</button>
        <button class="btn btn-primary" @click="goList">목록</button>
    </div>
</template>

<script setup>
import { router } from '@/routers';
import { defineProps, onMounted, ref } from 'vue'
import { useNoticeStore, useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia';

const noticeStore = useNoticeStore()
const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore);
const content =  ref({})
const props = defineProps({
    no: Number
})

onMounted(async () => {
    content.value = await noticeStore.selectContent(props.no)
})

// methods
const goList = () => {
    router.go(-1)
}

const doDelete = async() => {
    await noticeStore.deleteContent(props.no);
    // TODO : 삭제완료 모달창 띄우고 페이지 뒤로 가게 수정해야됨
    router.go(-1)
}
</script>