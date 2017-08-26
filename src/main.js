// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui'
import wx from 'weixin-js-sdk'
import '../static/assets/css/mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.SDKRegister = wx
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
