<template>
    <!-- 사용자 정보 -->
    <div>
        <h2>Main</h2>
        <div>
            <div v-if="user">
                {{ user.userName }} Logined
            </div>
        </div>
    </div>
    <!-- 공지사항 -->
    <div>

    </div>
</template>

<script>
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

export default {
    setup() {
        return {
            user: {}
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