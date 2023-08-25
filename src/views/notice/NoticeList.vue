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
        <table class="table text-center">
            <thead>
                <tr>
                    <th>번호</th>
                    <th style="width: 50rem">제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(notice, i) in notices" :key="i" id="noticeBody" @click="goPage(notice.noticeNo)">
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']">{{ notice.fixedYn == 'Y' ? '고정' : notice.noticeNo }}</td>
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']">{{ notice.title }}</td>
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']">{{ notice.employeeName }}</td>
                    <td :class="[notice.fixedYn == 'Y' ? 'fixedY' : '']">{{ notice.firstDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="notices.length > 0">
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
    <div class="btnArea" v-if="user">
        <router-link to="/notice/form" class="btn btn-outline-secondary" v-if="isAdmin">등록</router-link>
    </div>
</template>

<script setup>
import { router } from '@/routers';
import { useNoticeStore, useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, watch, reactive, computed } from 'vue';

const noticeStore = useNoticeStore();
const authStore = useAuthStore();
const { user, isAdmin } = storeToRefs(authStore);
const { notices, pageInfo } = storeToRefs(noticeStore);
const pageParam = reactive({
    pageNo: 0,
    pageSize: 5
})
const pageCount = computed(() =>
	Math.ceil(pageInfo.value.totalElements / pageParam.pageSize),
)

onMounted(() => {
    getList();
})

const getList = () => {
    if (pageParam.pageNo >= 1){
        const newParams = {
            ...pageParam,
            pageNo: pageParam.pageNo - 1
        }
        noticeStore.selectNotices(newParams)
    } else {
        noticeStore.selectNotices(pageParam)
    }
}

const goPage = (id) => {
    router.push({name: 'content', params: {no: id}})
}

watch(() => getList())

</script >


<style>
#noticeBody td.fixedY {
    background-color: #D4E8DA;
    font-weight: bold;
}

tbody #noticeBody:hover {
    background-color: #D4E8DA;
    color: #41B883;
    font-weight: bold;
}
</style>