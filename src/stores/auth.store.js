import { defineStore } from 'pinia';

import { router } from '@/routers';
import { useAlertStore } from '@/stores';
import axios from 'axios';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null,
        isAdmin: localStorage.getItem('admin')
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

                    const adminCode = ['001', '002', '003']
                    this.isAdmin = adminCode.includes(res.data.deptCode)
                    localStorage.setItem('admin', this.isAdmin)
                    router.push('/gw');
                }).catch(err => {
                    const alertStore = useAlertStore();
                    if (err.code === 'ERR_BAD_REQUEST') {
                        alertStore.error("비밀번호를 확인해주세요.");    
                    } else {
                        alertStore.error(err);
                    }
                });
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('admin')
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