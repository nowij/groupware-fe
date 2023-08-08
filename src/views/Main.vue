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

<script setup>
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<style>
</style>