<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <span class="d-none d-lg-block">GroupWare</span>
      </a>
    </div>
    <nav>
      <div v-if="user">
        <router-link to="/" class="p-2">Home</router-link>
        <router-link to="/employee/mypage" class="p-2">마이페이지</router-link>
        <router-link to="/employee/info" class="p-2">정보조회</router-link>
        <router-link to="/b" class="p-2">게시판</router-link>
        <router-link to="/c" class="p-2">전자결재</router-link>
        <router-link v-if="user.deptCode === '001'" to="/auth/register" class="p-2">신규등록</router-link>
        <a class="p-2" @click="logout()">로그아웃</a>
      </div>
    </nav>
  </header>
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
    this.isAdmin()
  },
  methods: {
    async isAdmin() {
      const authStore = useAuthStore();
      const { user } = storeToRefs(authStore);
      this.user = user;
    },
    logout() {
      const authStore = useAuthStore();
      return authStore.logout();
    }
  }
}
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #4154f1;
}
</style>