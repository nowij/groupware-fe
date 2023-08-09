<template>
    <!-- 사용자 정보 -->
    <div>
        <h2>메인페이지</h2>
        <div>
            {{ user }} Login!
        </div>
    </div>
    <!-- 공지사항 -->
    <div>

    </div>
</template>

<script>
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
    setup() {
        return {
            user: ref({})
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        getUser() {
            const authStore = useAuthStore();
            const { user } = storeToRefs(authStore);
            this.user = user;
        }
    }
}
</script>

<style></style>