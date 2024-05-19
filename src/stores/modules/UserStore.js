// 引入
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const Token = ref('') // 登入权证

    const setToken = (newvalue) => {
      Token.value = newvalue // 存储
    }

    const removeToken = () => {
      Token.value = '' // 删除
    }

    return {
      Token,
      setToken,
      removeToken
    }
  },
  {
    persist: true // 持久化
  }
)
