import axios from '../api/http'
const base_url = '/book-chapter-content'

/**
 * 获取章节详情 也就是章节的内容
 * @param {Object} params
 * @param {Object} options
 */
export function getChapterContent(params, options) {
    return axios.request(params, {
      ...options,
	  method: 'GET',
      url: `${base_url}/get-chapter-content`,
    })
}
