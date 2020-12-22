import Vue from 'vue'
import App from './App'
import Config from '@/util/config.js'
// import uView from "uview-ui/theme.scss";
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$yifangConfig = Config // 挂载全局配置

App.mpType = 'app'

const app = new Vue({
	...App
}).$mount()
