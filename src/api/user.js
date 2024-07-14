const request = uni.$u.http

// 手机号登录
export const memberLogin = (params, config = {}) => request.post('/api/member/loginbyphone', params, config)

// 获取短信验证码
export const getCode = (params, config = {}) => request.post('/api/Code', params, config)

// 手机号登录绑定微信 授权openid
export const BindWeixin = (params, config = {}) => request.post('/api/member/BindWeixin', params, config)

// 微信快捷登录
export const wxLogin = (params, config = {}) => request.post('/api/login', params, config)

// 绑定手机号
export const bindPhone = (params, config = {}) => request.post('/api/member/UpdatePhoneByOpenid', params, config)

// 绑定用户身份
export const UserSelectRole = (params, config = {}) => request.post('/api/member/UserSelectRole', params, config)