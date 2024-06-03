<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { usePasswordService } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'

// 调用路由实例
const route = useRoute()
const router = useRouter()
console.log(route, router)

// 收集表单数据
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 绑定表单实例
const formRef = ref('')

// 表单验证规则
const rules = ref({
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === pwdForm.value.old_pwd) {
          callback(new Error('新密码不能和原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdForm.value.new_pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 提交表单
const submitForm = async () => {
  // 调用表单实例的 validate 方法
  await formRef.value.validate()
  // 调用修改密码接口
  await usePasswordService(pwdForm.value)
  // 重置表单
  resetForm()
  // 提示用户修改成功
  ElMessage.success('修改成功')
  // 退出登录
  router.push('/login')
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
  pwdForm.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}
</script>
<template>
  <PageContainer title="重置密码">
    <el-form :model="pwdForm" :rules="rules" ref="formRef">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >修改密码</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<style scoped lang="scss"></style>
