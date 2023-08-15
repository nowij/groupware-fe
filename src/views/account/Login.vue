<template>
  <div class="row justify-content-center">
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title text-center pb-0 fs-4">로그인</h5>
        <form class="row g-3" @submit.self.prevent="doSubmit(employeeId, passwd)">
          <div class="col-12">
            <label class="form-label">ID</label>
            <input type="text" name="employeeId" class="form-control" placeholder="ID" v-model="employeeId" />
          </div>
          <div class="col-12">
            <label class="form-label">PASSWORD</label>
            <input type="password" name="passwd" class="form-control" placeholder="PASSWORD" v-model="passwd" />
          </div>
          <div class="text-center p-2">
            <button type="submit" class="btn btn-primary w-100">로그인</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const doSubmit = (id, pwd) => {
  authStore.login(id, pwd)
}
</script>