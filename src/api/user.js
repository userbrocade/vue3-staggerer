import request from '@/utils/request'

// 注册
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登入
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 用户个人信息
export const useUserService = () => request.get('/my/userinfo')

// 用户个人信息更新
export const useUpdateService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })
