/**
 * 文档：https://www.quanzhan.co/luch-request/handbook/#tip
 */

import Request from '@/js_sdk/luch-request/luch-request/index.js'
import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'
const Config = require('../config.js')

class Http {
	
	request(params = {}, options){
		const config = {
			// #ifndef H5
			baseURL: Config['baseUrl'],
			// #endif
			
			// #ifdef H5
			baseURL: 'yifang-read-api',
			// #endif
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			// method: 'GET',
			dataType: 'json',
			params: params, // 会拼接到url
			data: {}, // POST 请求发送
			// 注：如果局部custom与全局custom有同名属性，
			// 则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
			// 使用参考 components/yifang/yifang-recommend/yifang-recommend.vue::getBookList
			custom: {
				loading: true, // 默认开启loading效果
			}, // 全局自定义参数默认值
			// #ifdef MP-ALIPAY || MP-WEIXIN
			timeout: 10000, // 仅微信小程序（2.10.0）、支付宝小程序支持
			// #endif
			// 传递的选项(用来覆盖原有的参数，如超时时间、是否每次loading
			// 下载|上传进度等一切参数)  可以是axios本身的选项  也可以是自定义处理的选项
			...options, 
			// 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
			// 如果return false； 则被响应拦截器error拦截，进入错误处理块
			validateStatus: (statusCode) => { // statusCode 请求的状态码 必存在。此处示例为全局默认配置
				// console.log(statusCode)
				// 如果http 请求码不为200 则直接错误流程
				return statusCode == 200
			// 	// return statusCode >= 200 && statusCode < 300
			}
		}
		const instance = new Request(config)
		
		// 请求拦截器  发送请求之前
		instance.interceptors.request.use((config) => { // 可使用async await 做异步操作
			config.header = {
				...config.header,
			}
			// 演示custom 用处
			// if (config.custom.auth) {
			//   config.header.token = 'token'
			// }
			if (config.custom.loading) {
				uni.showLoading({
				    title: '加载中',
					mask: true
				})
			}
			/**
			/* 演示
			if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
				return Promise.reject(config)
			}
			**/
			return config
		}, config => { // 可使用async await 做异步操作
		  return Promise.reject(config)
		})
		
		
		// 响应拦截器
		instance.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
			// console.log(response)
			// 判断返回的http 状态码
			if(200 != response.statusCode){
				uni.showToast({
					title: "请求出错！",
					icon: 'none',
					duration: 2000
				})
				return Promise.reject(response)
			}
			// 判断json返回的数据是否正确
			if('object' != typeof response.data){
				uni.showToast({
					title: "请联系管理员",
					icon: 'none',
					duration: 2000
				})
				uni.showModal({
				    title: '系统错误！',
				    content: '请联系管理员QQ：' + Config.adminQQ,
					cancelText: '关闭',
					confirmText: '复制并返回首页',
				    success: function (res) {
				        if (res.confirm) {
				            const result = h5Copy(Config.adminQQ)
							if (result === false) {
								uni.showToast({
									title:'不支持',
								})
							} else {
								uni.showToast({
									title:'复制成功',
									icon:'none'
								})
								setTimeout(function(){
									uni.switchTab({
									    url: '/pages/index/index'
									})
								}, 1000)
							}
				        } else if (res.cancel) {
				            uni.hideToast();
				        }
				    }
				})
				return
			}
			uni.hideLoading()
			return Promise.resolve(response.data)
		}, (error) => { /*  对响应错误处理  */
			uni.showToast({
				title: error.errMsg + '：' + error.statusCode,
				icon: 'none',
				duration: 2000
			})
			return Promise.reject(error)
		})
		
		return instance.request(config)
	}
}

export default new Http()