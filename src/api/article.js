import request from '@/utils/request'

// 文章分类
export const artGetClassifyService = () => request.get('/my/cate/list')
