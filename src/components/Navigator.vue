<template>
  <!-- home, 전자결재, 근태관리, 주소록, 예약, 게시판, 관리자기능 -->
  <nav class="sidebar" v-if="user">
    <ul class="sidebar-nav">
      <li class="nav-item">
        <router-link to="/gw" class="nav-link">
          <i class="bi bi-house"></i>
          Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/gw/mypage" class="nav-link">
          <i class="bi bi-person"></i>
          마이페이지</router-link>
      </li>
      <li class="nav-item" @click="navAttendance">
        <a class="nav-link">
          <i class="bi bi-briefcase"></i>
          <span>근태관리</span>
        </a>
        <ul id="nav-attendance" class="nav-content">
          <li>
            <router-link to="/att/workd">근무시간</router-link>
          </li>
          <li>
            <router-link to="/att/vaction">휴가</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <router-link to="/employee" class="nav-link">
          <i class="bi bi-search"></i>
          <span v-if="isAdmin">직원관리</span>
          <span v-else>정보조회</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/notice" class="nav-link">
          <i class="bi bi-card-list"></i>
          공지사항</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/c" class="nav-link">
          <i class="bi bi-file-earmark-text"></i>
          전자결재</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="isAdmin" to="/auth/register" class="nav-link">
          <i class="bi bi-person-plus"></i>
          신규등록</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="logout()">
          <i class="bi bi-box-arrow-right"></i>
          로그아웃</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import $ from 'jquery';

const authStore = useAuthStore();
const { user, isAdmin } = storeToRefs(authStore);
const attendance = ref(false)

// methods
const logout = () => {
  return authStore.logout();
}

const navAttendance = () => {
  attendance.value = !attendance.value
  if (attendance.value) {
    $("#nav-attendance").css("display", "block");
  }
  else {
    $("#nav-attendance").css("display", "none");
  }
}
</script>

<style>
nav {
  padding: 30px;
}

#nav-attendance {
  display: none;
}
</style>