<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/pinia'
import { useUpdateService } from '@/api/user'

// 解构出用户信息和更新用户信息的方法
const {
  user: { username, nickname, email, id },
  getuser
} = useUserStore()

// 收集表单数据
const form = ref({
  username,
  nickname,
  email,
  id
})
// 绑定实例
const formRef = ref()

// 表单验证规则
const rules = ref({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: 'blur'
    }
  ]
})

// 提交表单方法
const submitForm = async () => {
  // 调用表单实例的 validate 方法
  await formRef.value.validate()
  // 调用更新用户信息接口
  await useUpdateService(form.value)
  // 提示用户更新成功
  ElMessage.success('更新成功')
  // 重新获取用户信息
  getuser()
}
</script>

<template>
  <PageContainer title="个人详细">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交修改</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<style scoped></style>
