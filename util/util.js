import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy.js'

/**
 * 复制
 * @param {Object} value 要复制的内容
 */
export function copy(value) {
	let successMessage = '复制成功'
	// #ifdef H5
    const result = h5Copy(value)
	// #endif
	
	// #ifndef H5
	uni.setClipboardData({
	    data: value,
	    success: function () {
	        uni.showToast({
	        	title:successMessage,
	        	icon:'none'
	        })
	    },
		fail(err){
			uni.showToast({
				title:'复制失败',
			})
		},
		complete(res){
			console.log(res)
		}
	})
	return
	// #endif
	
	if (result === false) {
		uni.showToast({
			title:'不支持',
		})
	} else {
		uni.showToast({
			title:successMessage,
			icon:'none'
		})
	}
}

