import request from '@/utils/request'

// 文章分类-列表
export const artGetClassifyService = () => request.get('/my/cate/list')

// 增加-文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 更新-文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// 删除-文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', { params: id })

// 获取-文章列表
export const artManagementService = (params) =>
  request.get('/my/article/list', { params })

// 发布-文章
export const artIssueService = (data) => request.post('/my/article/add', data)

// 获取-文章详细
export const artDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })

// 更新-文章详情
export const artUpdateService = (Id) => request.put('/my/article/info', Id)

// 删除-文章
export const artDeleteArticleService = (id) =>
  request.delete('/my/article/info', { params: { id } })
