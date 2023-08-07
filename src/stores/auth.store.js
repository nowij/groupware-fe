import { defineStore } from 'pinia';

import { router } from '@/routers';
import { useAlertStore } from '@/stores';
import axios from 'axios';
//import { axiosWrapper } from '@/mixins';

const baseUrl = 'http://localhost:8080';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: localStorage.getItem('user'),
        returnUrl: null
    }),
    actions: {
        async login(id, pwd) {
            try {
                // const user = await axiosWrapper.post(`${baseUrl}/auth/login`, { id, pwd });   
                // console.log('>>>> user = ')
                // console.log(user)

                // // update pinia state
                // this.user = user;

                // // store user details and jwt in local storage to keep user logged in between page refreshes
                // localStorage.setItem('user', JSON.stringify(user));

                // // redirect to previous url or default to home page
                // router.push(this.returnUrl || '/');

                // const headers = {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json',   
                // }

                axios.post(`${baseUrl}/auth/login`,{
                    employeeId: id,
                    userPasswd: pwd}
                // },{headers}
                ).then(res => {
                    this.user = res.data;
                    localStorage.setItem('user', JSON.stringify(res.data));
                    router.push('/');
                    // 헤더에 토큰을 담아서 보냄
                    //this.sendToken(res.data.token)
                }).catch(err => {
                    console.log(err);
                });
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        },
       sendToken(token) {
        axios.post(baseUrl, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(err => {
            console.log("헤더설정 에러 ", err);
        })
       }
    }
});