<script setup>
import { artGetClassifyService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:modelValue'])
const Classifylist = ref([]) // 文章列表数据
// 获取文章列表数据
const getClassifylist = async () => {
  const res = await artGetClassifyService()
  Classifylist.value = res.data.data
}
getClassifylist()
</script>
<template>
  <el-select
    style="width: 240px"
    placeholder="请选择"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in Classifylist"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
