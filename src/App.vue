<script setup>
// 导入路由
import { useRoute, useRouter } from 'vue-router'
// 导入 User
import { useUserStore } from '@/stores/pinia'
// 获取路由对象
const router = useRouter()
// 获取路由参数
const route = useRoute()

const storeuser = useUserStore()

const skiplogin = () => {
  console.log(router, route)
  router.push('/login')
}
</script>

<template>
  <el-button type="info" @click="$router.push('/Home')">点击跳转首页</el-button>
  <el-button type="primary" @click="skiplogin">点击跳转登入页</el-button>
  <div>{{ storeuser.Token }}</div>
  <el-button @click="storeuser.setToken('faebrjibefijbos')">登入</el-button>
  <el-button @click="storeuser.removeToken()">退出</el-button>
</template>

<style scoped></style>
