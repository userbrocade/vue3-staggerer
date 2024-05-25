import request from '@/utils/request'

// 文章分类
export const artGetClassifyService = () => request.get('/my/cate/list')

// 增加-文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 更新-文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
