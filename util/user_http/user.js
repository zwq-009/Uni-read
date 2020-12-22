import axios from '../api/http'
const base_url = '/book-user'

/**
 * 注册
 * @param {Object} params
 * @param {Object} options
 */
export function register(params, options) {
    return axios.request(params, {
      ...options,
	  method: 'POST',
      url: `${base_url}/register`,
    })
}

/**
 * 登录
 * @param {Object} params
 * @param {Object} options
 */
export function login(params, options){
	return axios.request(params, {
	  ...options,
	  method: 'POST',
	  url: `${base_url}/login`,
	})
}