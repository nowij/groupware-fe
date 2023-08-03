import { createApp } from 'vue'
import { createPinia } from 'pinia'

//import Axios from 'axios'
import App from './App.vue'
import router from './router'
import mixins from '@/mixins'

const pinia = createPinia()
const app = createApp(App)


app.use(pinia)
app.use(router)
app.mixin(mixins);

/* Axios 전역설정 */
app.config.globalProperties.$api = mixins;

app.mount('#app')