import axios from '../utils/http'
const base_url = 'images/'

// 下面是完整的一个请求参数列表，以此是url后面的参数、
// 选项 可以是axios本身的选项  也可以是自定义处理的选项，如我要加一个loading的效果，就由这个参数传递、
// 行内的参数，有些地址不是在url后面添加，是在url中间添加的如/images/{name}/json
// 根据需要传参

/**
 * 获取镜像
 * @param {Object} params 可选的url参数
 * @param {Object} options 选项
 * @param {Object} inline url路径内的参数
 */
// export function fetchImages(params, options, inline) {
//     return axios.request(params, {
//       ...options,
//       url: `${base_url}json`,
//     })
// }

// inline 参数使用
// export function getImagesDetail(options, inline) {
//     return axios.request({}, {
//       ...options,
//       url: `${base_url}/${inline.imagesId}/json`,
//     })
// }

// 更改请求方法为post
// export function getImagesDetail(options, inline) {
//     return axios.request({}, {
//       ...options,
//       method: 'post'
//       url: `${base_url}/${inline.imagesId}/json`,
//     })
// }

// 上传文件
// 和下载文件类似  也可以有相应的上传进度


// 下载文件  需要做代理设置 可以在 src\utils\http.js  onDownloadProgress中获取下载进度 下载需要额外设置超时时间
// 如果不确定下载时长  可将超时设为0，表示无超时时间
// 覆盖下载及进度事件
// export function downloadFile(params) {
//     return axios.request(params, {
//       url: '/download/pr/MediaCreationTool2004.exe',
//       timeout: 0
//       下载处理进度事件
//       onDownloadProgress: function (progressEvent) {
//          // 对原生进度事件的处理
//          console.log("下载进度", progressEvent)
//       },
//     })
// }


/**
 * 获取镜像
 * @param {Object} params 可选的url参数
 * @param {Object} options 选项
 * @param {Object} inline url路径内的参数
 */
export function fetchImages(params, options) {
  return axios.request(params, {
    ...options,
    url: `${base_url}json`,
    timeout: 1000
  })
}

/**
 * 获取镜像详情
 * @param {string} imageId 镜像id
 */
export function getImagesDetail(options, inline) {
  return axios.request({}, {
    ...options,
    url: `${base_url}/${inline.imageId}/json`,
  })
}


export function delImage(options, inline) {
  return axios.request({}, {
    ...options,
    method: 'delete',
    url: `${base_url}/${inline.imageId}`
  })
}


// 外部使用
// import * as generateRequest from '../../api/generate'
// genrateBook(){
// 	generateRequest.generateBook().then(res => {
	  
// 	}).catch(err => {

// 	})
// }