import request from '@/utils/axios';

// 手机号登录
export function memberLogin(data) {
  return request({
    url: '/api/member/loginbyphone',
    method: 'post',
    data
  });
}

// 获取短信验证码
export function getCode(data) {
  return request({
    url: '/Code',
    method: 'post',
    data
  });
}