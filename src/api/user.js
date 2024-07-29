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

// 绑定用户头像昵称
export const UserUpdateInfo = (params, config = {}) => request.post('/api/member/UserUpdateInfo', params, config)

// 系统消息
export const myNotice = (params, config = {}) => request.post('/api/Member/myNotice', params, config)

// 用户-系统消息-设置已读	
export const readNotice = (params, config = {}) => request.post('/api/Member/readNotice', params, config)

// 设置默认地址	
export const SetAddressDefault = (params, config = {}) => request.post('/api/Member/SetAddressDefault', params, config)

// 删除我的地址
export const deleteAddress = (params, config = {}) => request.post('/api/Member/deleteAddress', params, config)

// 用户-添加地址
export const addAddress = (params, config = {}) => request.post('/api/Member/addAddress', params, config)

// 用户-我的地址
export const myAddress = (params, config = {}) => request.post('/api/Member/myAddress', params, config)

// 用户-修改地址
export const updateAddress = (params, config = {}) => request.post('/api/Member/updateAddress', params, config)

// 用户-司机个人资料
export const DriverDetail = (params, config = {}) => request.post('/api/DriverDetail', params, config)

// 用户-用户-个人资料
export const getUserIfo = (params, config = {}) => request.post('/api/User', params, config)

// 用户-用户-个人资料详情
export const getUserUserDetail = (params, config = {}) => request.post('/api/UserDetail', params, config)

// 用户-用户-实名认证
export const AuthenticationUpdate = (params, config = {}) => request.post('/api/AuthenticationUpdate', params, config)

// 更换手机
export const resetphone = (params, config = {}) => request.post('/api/Member/resetphone', params, config)