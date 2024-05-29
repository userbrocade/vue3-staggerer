<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/module/ChannelSelect.vue'
import { ref } from 'vue'
import { artManagementService, artDeleteArticleService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '@/views/article/module/ArticleEdit.vue'

const ArticleManagementList = ref([]) // 文章管理列表数据
const total = ref() // 响应匹配数据总数
const loading = ref(false)

// 文章分类选框
const cates = ref({
  pagenum: 1, // 当前页码数
  pagesize: 3, // 当前页需要的数据条数
  cate_id: '', // 文章分类id
  state: '' // 文章状态(可选值"已发布"或"草稿")
})

const getManagementlist = async () => {
  loading.value = true
  const res = await artManagementService(cates.value)

  ArticleManagementList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getManagementlist()

// 搜索
const onSearch = () => {
  cates.value.pagenum = 1 // 重置页码

  getManagementlist()
}

// 重置
const onReset = () => {
  cates.value.pagenum = 1 // 重置页码

  // 清空-分类、状态
  cates.value.cate_id = ''
  cates.value.state = ''

  getManagementlist()
}

// 分页-条数
const onSizeChange = (size) => {
  cates.value.pagenum = 1 // 重置页码
  cates.value.pagesize = size // 设置文章条数

  getManagementlist()
}

// 分页-页码数
const onCurrentChange = (num) => {
  cates.value.pagenum = num // 页码数量

  getManagementlist()
}

// Drawer组件实例
const Drawer = ref()

// 添加逻辑
const onIssue = () => {
  Drawer.value.open({})
}

// 编辑逻辑
const onEditManagement = (row) => {
  Drawer.value.open(row)
}

// 删除逻辑
const onDeleteManagement = async (row) => {
  // 调用接口传递id、刷新页面、提示信息
  await artDeleteArticleService(row.id)
  getManagementlist()
  ElMessage.success('删除成功')
}

// 发布成功逻辑
const IssueSuccess = (success) => {
  if (success === '添加') {
    const lastPage = Math.ceil((total.value + 1) / cates.value.pagesize)
    cates.value.pagenum = lastPage
  }
  getManagementlist()
}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onIssue">发布文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- Vue3 => v-model :modelValue @update:modelValue 的简写 -->
        <ChannelSelect v-model="cates.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select
          style="width: 240px"
          placeholder="请选择"
          v-model="cates.state"
        >
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="ArticleManagementList" v-loading="loading">
      <el-table-column prop="title" label="文章标题">
        <!-- row:每一项 -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.value) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditManagement(row)"
          >
          </el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteManagement(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="cates.pagenum"
      v-model:page-size="cates.pagesize"
      :page-sizes="[1, 3, 5, 7]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="+total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="justify-content: flex-end; margin-top: 20px"
    />

    <!-- 弹窗抽屉区域 -->
    <ArticleEdit ref="Drawer" @success="IssueSuccess"></ArticleEdit>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
