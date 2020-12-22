import axios from '../api/http'
const base_url = '/book-book'

/**
 * 获取书籍列表
 * @param {Object} params
 * @param {Object} options
 */
export function getBookList(params, options) {
    return axios.request(params, {
      ...options,
	  method: 'GET',
      url: `${base_url}/get-book-list`,
    })
}

/**
 * 获取书籍详情
 * @param {Object} params
 * @param {Object} options
 */
export function getBookDetail(params, options) {
    return axios.request(params, {
      ...options,
	  method: 'GET',
      url: `${base_url}/get-book-detail-by-id`,
    })
}