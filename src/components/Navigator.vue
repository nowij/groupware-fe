<template>
  <!-- home, 전자결재, 근태관리, 주소록, 예약, 게시판, 관리자기능 -->
  <nav class="sidebar" v-if="user">
    <ul class="sidebar-nav">
      <li class="nav-item">
        <router-link to="/gw" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/gw/mypage" class="nav-link">마이페이지</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/employee/info" class="nav-link">정보조회</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/b" class="nav-link">게시판</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/c" class="nav-link">전자결재</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="user.deptCode === '001'" to="/auth/register" class="nav-link">신규등록</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="logout()">로그아웃</a>
      </li>
    </ul>
  </nav>
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
    },
  }
}
</script>

<style>
nav {
  padding: 30px;
}

/* nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* .router-link-active {
  color: #012970;
  background: #4154f1;
}

.router-link-exact-active {
  color: #012970;
  background: #4154f1;
} */
</style>