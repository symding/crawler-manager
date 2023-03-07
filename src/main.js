import Vue from 'vue'
import App from './App.vue'

//  全局引入elementUI
import ElementUI from 'element-ui'
// 按需引入
//import { Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// npm i vue-router@${version}
import router from '../routers'
import http from 'axios'
import echarts from '../config/echarts'
import '@/assets/font/font.css'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(JsonViewer)
Vue.prototype.$http = http
Vue.prototype.$charts = echarts


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
