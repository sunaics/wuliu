import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uView from 'uview-ui'
import store from "./store";
import { router, RouterMount } from "./router/index";

Vue.use(uView)
Vue.use(router)
// 如此配置即可

Vue.config.productionTip = false
uni.$u.config.unit = 'px'
App.mpType = 'app'

uni.$u.setConfig({
	color: {	// color这里的目的是修改基础颜色但测试中暂未知效果，这里先列出来
	    'u-primary': '#ff8500',
      
	},
	props:{
		tabs: {
		    lineColor: '#19be6b'	// 示例修改tabs 的激活颜色
		}
	}
})


const app = new Vue({
  ...App,
  store
});

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, "#app");
// #endif
// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// app.$mount();