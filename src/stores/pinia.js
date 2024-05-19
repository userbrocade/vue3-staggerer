import { createPinia } from 'pinia' // pinia状态工具
import persist from 'pinia-plugin-persistedstate' // pinia持久化

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 中转导出模块
export * from './modules/UserStore'
