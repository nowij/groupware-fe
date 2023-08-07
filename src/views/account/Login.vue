<template>
  <div class="row justify-content-center">
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title text-center pb-0 fs-4">로그인</h5>
        <form class="row g-3" :validation-schema="schema" @submit.self.prevent="onSubmit(employeeId, passwd)">
          <div class="col-12">
            <label class="form-label">ID</label>
            <input type="text" name="employeeId" class="form-control" placeholder="ID" v-model="employeeId" />
          </div>
          <div class="col-12">
            <label class="form-label">PASSWORD</label>
            <input type="password" name="passwd" class="form-control" placeholder="PASSWORD" v-model="passwd" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary m-1 mt-3">로그인</button>
            <router-link v-if="true" to="/auth/register" class="btn btn-success m-1 mt-3">신규등록</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {  useAuthStore } from '@/stores';
//import { router } from '@/routers';
//import axios from 'axios';
//const baseUrl = 'http://localhost:8080';
//import { Form, Field } from 'vee-validate';
//import * as Yup from 'yup';

export default {
  setup() {
    return {
      employeeId: null,
      passwd: null
    }
  },
  methods: {
    async onSubmit(id, pwd) {
      console.log(id, pwd);
      const authStore = useAuthStore();
      authStore.login(id, pwd);
      // await axios.post(`${baseUrl}/auth/login`
      //   , {
      //     employeeId: id,
      //     userPasswd: pwd
      //   })
      //   .then(res => {
          
      //     // 토큰을 로컬 스토리지에 저장
      //     // localStorage.setItem('token', res.data.token);
      //     // localStorage.setItem('employee', res.data.employeeId);

      //     // // 메인페이지로 이동
      //     // router.push('/');
      //   })
      //   .catch(err => {
      //     const alertStore = useAlertStore();
      //     console.log(err);
      //     alertStore.error(err);
      //   });
    }
  }
}

// const schema = Yup.object().shape({
//   employeeId: Yup.string().required('ID를 입력하세요.'),
//   passwd: Yup.string().required('비밀번호를 입력하세요.')
// });
</script>