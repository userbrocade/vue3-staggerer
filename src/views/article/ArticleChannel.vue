<script setup>
import { ref } from 'vue'
import { artGetClassifyService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'

const Classifydata = ref([]) // 存储分类数据
const loading = ref(true) // loading 控制加载

const getclassifyservice = async () => {
  const res = await artGetClassifyService()
  Classifydata.value = res.data.data
  loading.value = false
}
getclassifyservice()

const edit_series = (row, index) => {
  console.log(row, index)
}
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="Classifydata" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <!-- row 为数组的每一项 $index 下标 -->
        <template #default="scope">
          <el-button
            plain
            circle
            :icon="Edit"
            type="primary"
            @click="edit_series(scope.row, scope.$index)"
          ></el-button>
          <el-button
            plain
            circle
            :icon="Delete"
            type="danger"
            @click="edit_series(scope.row, scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- 设置空状态 -->
      <template #empty>
        <el-empty description="description" />
      </template>
    </el-table>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
