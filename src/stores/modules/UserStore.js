// 引入
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserService } from '@/api/user'

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

    const user = ref({}) // 用户个人信息

    // 存储个人信息
    const getuser = async () => {
      const { data } = await useUserService(Token.value)
      user.value = data.data
    }

    // 删除个人信息
    const removeuser = () => {
      user.value = {}
    }

    return {
      Token,
      setToken,
      removeToken,
      user,
      getuser,
      removeuser
    }
  },
  {
    persist: true // 持久化
  }
)
