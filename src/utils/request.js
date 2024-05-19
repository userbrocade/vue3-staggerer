import axios from 'axios'
import { useUserStore } from '@/stores/pinia'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

const baseURL = 'http://big-event-vue-api-t.itheima.net' // 定义基础地址

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000 // 超时时间
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userstore = useUserStore()
    if (userstore.Token) {
      config.headers.Authorization = userstore.Token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '服务器异常') // 失败提示
    return Promise.reject(res.data) // 抛出错误
  },
  (err) => {
    // TODO 5. 处理401错误
    ElMessage.error(err.response.data.message || '服务器异常') // 失败提示
    console.log(err)
    // ?.为可选链 对象错误或不存在将抛出undefined
    if (err.response?.status === 401) {
      const router = useRoute()
      router.push('/login') // 401 拦截到登录
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
