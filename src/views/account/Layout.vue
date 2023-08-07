<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2 mt-5">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores';
import { router } from '@/routers';

// 로그인 했을 때 home으로 리다이렉트
const authStore = useAuthStore();
if (authStore.user) {
    router.push('/');
}
</script>