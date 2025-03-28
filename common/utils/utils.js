class utils {
	constructor() {
		this.baseUrl = "http://192.168.31.73:9988/"
	}

	/**
	封装请求option 参数是一个对象，默认值为 { showLoading: false }。这意味着如果调用 request 方法时没有提供 option 参数，
	那么 showLoading 的值将默认为 false。
	option.url：请求的 URL。如果 option.url 不存在，request 方法将返回 false 并不执行请求。

	option.data：请求的数据。如果提供了 option.data，它将作为请求的数据发送；如果没有提供，将发送一个空对象 {}。

	option.header：请求的头部信息。如果提供了 option.header，它将作为请求的头部发送；如果没有提供，将发送一个空对象 {}。

	option.method：请求的方法。如果提供了 option.method，它将作为请求的方法发送；如果没有提供，默认为 "GET"。

	option.success：请求成功时的回调函数。如果提供了 option.success 并且它是一个函数，当请求成功时，将调用这个函数并传递响应数据作为参数。

	option.fail：请求失败时的回调函数。如果提供了 option.fail 并且它是一个函数，当请求失败时，将调用这个函数并传递错误信息作为参数。

	通过使用 option 对象，request 方法可以灵活地处理各种请求场景，同时为调用者提供了简洁的接口。
	*/
	request(option = {
		showLoading: false
	}) {
		if (!option.url) {
			return false
		}
		this.showLoading();
		uni.request({
			url: this.baseUrl + option.url,
			data: option.data ? option.data : {},
			header: option.header ? option.header : {},
			method: option.method ? option.method : "GET",
			success: (response) => {
				uni.hideLoading()
				if (response.statusCode === 200) {
					// 请求成功的逻辑
					if (option.success && typeof option.success === "function") {
						option.success(response.data);
					}
				} else {
					// 请求失败的逻辑
					if (option.fail && typeof option.fail === "function") {
						option.fail(response);
					}
				}
			},
			fail: response => {
				uni.hideLoading()
				console.log(response);
			}
		})
	}
	// 创建加载的loading
	showLoading() {
		// uni.getStorageSync() 全局变量存储（同步存储）  此方法判断本地是否缓存有loading 变量
		const isShowLoading = uni.getStorageSync('isShowLoading')
		if (isShowLoading) {
			// 判断是否有loading个存在
			uni.hideLoading()
			// 有就 关闭其他loading 状态
			uni.setStorageSync('isShowLoading', false)
			// 并把缓存中的变量设为false
		}
		// 并开启当前请求的loading
		uni.showLoading({
			title: '加载中...',
			complete: () => {
				uni.setStorageSync('isShowLoading', true)
			},
			fail: () => {
				uni.setStorageSync('isShowLoading', false)
			}
		})
	}
}
export default new utils()
// 作为工具 很多页面都会使用 所以uni提供一个简便方式在 app.vue中