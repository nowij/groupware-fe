import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Axios from 'axios'
import App from './App.vue'
import router from './router'

//import mixins from '@/mixins'

const pinia = createPinia()
const app = createApp(App)

// Axios 기본 URL 설정
Axios.defaults.baseURL = "http://localhost:8080"

/* Axios 전역설정 */
app.config.globalProperties.axios = Axios;

app.use(pinia)
app.use(router)
app.mount('#app');