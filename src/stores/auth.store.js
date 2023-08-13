import { defineStore } from 'pinia';

import { router } from '@/routers';
import { useAlertStore } from '@/stores';
import axios from 'axios';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(id, pwd) {
            try {
                axios.post('/auth/login', {
                    employeeId: id,
                    userPasswd: pwd
                }).then(res => {
                    this.user = res.data;
                    localStorage.setItem('user', JSON.stringify(res.data));
                    router.push('/gw');
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
        async register(param) {
            try {
                axios.post('/auth/register', param)
                    .catch(err => {
                        console.log(err);
                    });
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        }
    }
});