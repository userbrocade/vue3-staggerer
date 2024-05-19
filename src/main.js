import { createApp } from 'vue'
import pinia from '@/stores/pinia' // 导入独立化pinia
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
