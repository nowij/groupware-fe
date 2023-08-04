<template>
  <div class="row justify-content-center">
    <div class="card mb-3">
      <form @submit="onSubmit" :validation-schema="schema">
        <div class="card-body">
          <h5 class="card-title text-center pb-0 fs-4">로그인</h5>
          <form class="row g-3">
            <div class="col-12">
              <label class="form-label">ID</label>
              <input type="text" id="employee_id" class="form-control" placeholder="ID">
            </div>
            <div class="col-12">
              <label class="form-label">PASSWORD</label>
              <input type="text" id="user_passwd" class="form-control" placeholder="PASSWORD">
            </div>

          </form>
          <div class="text-center">
            <button type="submit" class="btn btn-primary m-1 mt-3">로그인</button>
            <router-link v-if="true" to="/register" class="btn btn-success m-1 mt-3">신규등록</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
</script>