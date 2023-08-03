<template>
  <div class="card">
    <form @submit="onSubmit" :validation-schema="schema">
      <div class="card-header text-center">로그인</div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">ID</label>
          <input type="text" id="employee_id" class="form-control" placeholder="ID">
        </div>
        <div class="mb-3">
          <label class="form-label">PASSWORD</label>
          <input type="text" id="user_passwd" class="form-control" placeholder="PASSWORD">
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-success m-1">로그인</button>
          <router-link to="/register" class="btn btn-primary m-1">신규등록</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
</script>

<style>
  .card {
    width: 25rem;
  }
</style>
