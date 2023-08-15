<template>
    <div id="searchArea">
        <form>
            <div class="d-flex pt-2 pb-5 justify-content-center">
                <div class="me-1">
                    <input type="text" placeholder="제목" class="form-control">
                </div>
                <div class="me-1">
                    <input type="text" placeholder="작성자" class="form-control">
                </div>
                <div class="me-1">
                    <button type="submit" class="btn btn-outline-secondary me-1" @click.self.prevent="search">검색</button>
                    <button class="btn btn-outline-secondary" @click="reset">초기화</button>
                </div>
            </div>
        </form>
    </div>
    <div>
        <h5 class="card-title">공지사항</h5>
        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th>번호</th>
                    <th style="width: 50rem">제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(notice, i) in notices" :key="i" id="noticeBody">
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']"> {{ notice.noticeNo }}</td>
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']">{{ notice.title }}</td>
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']">{{ notice.employeeName }}</td>
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']">{{ notice.firstDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="btnArea" v-if="user">
        <router-link to="/notice/form" class="btn btn-outline-secondary" v-if="user.deptCode === '001'">등록</router-link>
    </div>
</template>

<script setup>
import { useNoticeStore, useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

const noticeStore = useNoticeStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { notices } = storeToRefs(noticeStore);

onMounted(() => {
    getList();
})

const getList = () => {
    noticeStore.getNotices()
}

watch(() => getList)

</script >


<style>
#noticeBody td.fixedY {
    background-color: azure;
    font-weight: bold;
}
</style>