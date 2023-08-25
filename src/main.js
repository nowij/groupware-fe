import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Axios from 'axios'
import App from './App.vue'
import { router } from '@/routers'
import Datepicker from 'vue3-datepicker'
import { Form, Field } from 'vee-validate'

const pinia = createPinia()
const app = createApp(App)

// Axios 기본 URL 설정
Axios.defaults.baseURL = "http://localhost:8080"
// 전역 설정
app.config.globalProperties.axios = Axios

app.component('Datepicker', Datepicker)
app.component('Form', Form)
app.component('Field', Field)
app.use(pinia)
app.use(router)
app.mount('#app');