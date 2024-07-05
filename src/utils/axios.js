import axios from 'axios';
 
// 创建axios实例
const request = axios.create({
  baseURL: 'https://api.zhuliscm.com', // API的base_url
  timeout: 5000 // 请求超时时间
});
 
// 请求拦截器
request.interceptors.request.use(
  config => {
    // 可以在这里添加请求头等信息
    return config;
  },
  error => {
    // 请求错误处理
    console.log(error);
    return Promise.reject(error);
  }
);
 
// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做处理，例如只返回data部分
    return response.data;
  },
  error => {
    // 响应错误处理
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);
 
export default request;