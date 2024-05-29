<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artIssueService,
  artDetailService,
  artUpdateService
} from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'

// 基于chatGPT生成将网络图片地址转换为File对象方法
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

const ControlDrawer = ref(false) // 控制抽屉

// 默认数据
const defaultdata = {
  title: '', // 文章标题
  cate_id: '', // 文章分类id
  content: ' ', // 文章内容,富文本编辑器组件问题需要空格占位
  cover_img: '', // file格式 文章封面
  state: '' // 文章状态-已发布、草稿
}
// 提交数据
const modification = ref({
  ...defaultdata
})

// 外部调用方法
const open = async (row) => {
  ControlDrawer.value = true

  if (row.id) {
    // 调用接口获取文章详细信息
    const res = await artDetailService(row.id)
    // 将数据赋值于modification.value
    modification.value = res.data.data
    // 拼接基本url地址实现图片回显
    imageUrl.value = baseURL + modification.value.cover_img
    // 调用方法转换地址为File对象并赋值
    const file = await imageUrlToFile(
      imageUrl.value,
      modification.value.cover_img
    )
    modification.value.cover_img = file
  } else {
    // 重置表单
    modification.value = {
      ...defaultdata
    }
    imageUrl.value = ''
  }
}

// 暴露方法
defineExpose({
  open
})

const imageUrl = ref('') // 显示图片

// 上传图事件变化
const onChangePicture = (UploadFile) => {
  const my_img = URL.createObjectURL(UploadFile.raw) // 转换对象为URL
  imageUrl.value = my_img
  modification.value.cover_img = UploadFile.raw
}

// 发布文章
const emit = defineEmits(['success'])
const onissue = async (state) => {
  modification.value.state = state // 发布状态

  // 转换普通对象 为 formdata对象
  const df = new FormData() // 实例化一个formdata对象
  for (let key in modification.value) {
    df.append(key, modification.value[key]) // 将普通对象的每一项 添加 到df的每一项
  }

  if (modification.value.id) {
    await artUpdateService(df)
    ControlDrawer.value = false
    ElMessage.success('编辑成功')
    emit('success')
  } else {
    await artIssueService(df) // 提交参数至接口
    ControlDrawer.value = false
    ElMessage.success('发布成功')
    emit('success', '添加')
  }
}
</script>

<template>
  <el-drawer
    v-model="ControlDrawer"
    :title="modification.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form ref="RefreshForm" :model="modification" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="modification.title"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="modification.cate_id"
          style="width: 100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 图片文件上传 -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChangePicture"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <!-- 富文本编辑器 -->
          <quill-editor
            theme="snow"
            v-model:content="modification.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onissue('已发布')">发布</el-button>
        <el-button type="info" @click="onissue('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
// 文章-封面图片
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

// 富文本编辑器
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
