import Http from '../api/http'
const base_url = 'book-class'

/**
 * 获取菜单
 * @param {Object} params
 * @param {Object} options
 */
export function getClass(params, options) {
    return Http.request(params, {
      ...options,
	  method: 'GET',
      url: `${base_url}/get-class`,
    })
}