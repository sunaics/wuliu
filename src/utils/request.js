const md5 = require('md5');
// request.js
const api = "https://api.zhuliscm.com"

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
function request(vm) {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = api; /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		console.log(config)
		config.header.authorization = vm.$store.state.authorization
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (vm.$store.state.token) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.token = vm.$store.state.token
		}
		config.header["Content-Type"] = "application/x-www-form-urlencoded"
		// config.header["Content-Type"] = "application/json; charset=UTF-8"
		let timestamp = new Date().getTime()

		try {
			var vurl = "appid=" + vm.$store.state.appid + "&data=" + JSON.stringify(config.data) + "&method=" + config.method + "&rand=" + timestamp + "&version=1.0&appkey=" + vm.$store.state.appkey;
			let sign = md5(vurl).substring(10, 26);
			console.log('sign', sign)

			let data = {
				'appid': vm.$store.state.appid,
				'sign': sign,
				'rand': timestamp,
				"data": JSON.stringify(config.data),
				"method": config.method,
				"version": "1.0"
			}
			config.data = data
		} catch (error) {
			console.log(error)
		}
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		console.log('data', data)

		if (data.code == 1000) {
			return data.data ? data.data : {}
		} else {
			uni.$u.toast(response.data.msg || '请求失败，请重试！')
			return Promise.reject(data)
		}


	}, (response) => {
		console.log('response', response.data)
		uni.$u.toast(response.data.msg || '请求失败，请重试！')
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}




export default request