import axios from '../api/http'
const base_url = '/book-chapter'

/**
 * 获取章节列表
 * @param {Object} params
 * @param {Object} options
 */
export function getChapterList(params, options) {
    return axios.request(params, {
      ...options,
	  method: 'GET',
      url: `${base_url}/get-chapter-list`,
    })
}
