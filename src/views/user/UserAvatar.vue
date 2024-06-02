<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/pinia'
import { useAvatarService } from '@/api/user'

const userStore = useUserStore() // 获取用户信息
const imageUrl = ref(userStore.user.user_pic)

// 获取上传组件的实例
const stance = ref('')

// 图片变化更新预览
const handleChange = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
    console.log(reader.result)
  }
}

// 上传图片至服务器
const Uploading = async () => {
  await useAvatarService(imageUrl.value)
  // 更新用户视图
  userStore.getuser()
  // 提示上传成功
  ElMessage.success('上传成功')
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-upload
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      ref="stance"
      :on-change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <el-button
      type="primary"
      :icon="Plus"
      size="large"
      @click="stance.$el.querySelector('input').click()"
      >选择图片</el-button
    >
    <el-button type="success" :icon="Upload" size="large" @click="Uploading"
      >上传头像</el-button
    >
  </PageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
