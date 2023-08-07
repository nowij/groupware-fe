import { defineStore } from 'pinia';

import { router } from '@/routers';
import { useAlertStore } from '@/stores';
import axios from 'axios'

const baseUrl = 'http://localhost:8080';

export const useAuthStore = defineStore({
    id: 'auth',
    // ref()
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: localStorage.getItem('user'),
        returnUrl: null
    }),
    // function()
    actions: {
        async login(id, pwd) {
            try {
                // const config = {
                //     method: 'POST',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ username, password })
                // }
                //const user = await fetch(`${baseUrl}/auth/login`, config);
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
                console.log("메소드 실행 ", id, pwd);
                axios.post(`${baseUrl}/auth/login`,{
                    employeeId: id,
                    userPasswd: pwd
                },{headers}
                ).then(res => {
                    this.user = res.data;
                    localStorage.setItem('user', JSON.stringify(res.data));
                    console.log(res);
                    router.push('/');
                }).catch(err => {
                    console.log(err);
                });

                // console.log('>>>> user = ')
                // console.log(user)

                // // update pinia state
                // this.user = user;

                // // store user details and jwt in local storage to keep user logged in between page refreshes
                // localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                //router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});