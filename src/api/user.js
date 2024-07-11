const request = uni.$u.http

// 手机号登录
export const memberLogin = (params, config = {}) => request.post('/api/member/loginbyphone', params, config)

// 获取短信验证码
export const getCode = (params, config = {}) => request.post('/api/Code', params, config)

// 获取短信验证码
export const login = (params, config = {}) => request.post('/api/login', params, config)