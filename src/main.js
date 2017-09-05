// The Vue build version to load with the `import` command 
// (runtime-only or standalone) has been set in webpack.base.conf with an alias. 
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import wx from 'weixin-js-sdk'
import VueAMap from 'vue-amap'
import $ from 'jquery'
import {
  ToastPlugin
} from 'vux'
import configs from '../src/configs/index'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.wx = wx
Vue.prototype.$ = $
Vue.prototype.configs = configs

Vue.use(ToastPlugin)
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: 'c37c24a2c3156bb0c62d8f0b72c0c556',
  plugin: ['AMap.Geolocation']
})

Vue.prototype.token = function () {
  configs.token = this.$route.query.token
  configs.localToken = localStorage.getItem("token")
  console.log(configs)
  if (configs.localToken == '') {
    if (configs.token == '') {
      location.href = configs.accreditUrl
    } else {
      localStorage.setItem("token", JSON.stringify({
        'token': configs.token,
        'time': configs.curTime
      }))
    }
  } else {
    let dataObj = JSON.parse(configs.localToken)
    if (parseInt(configs.curTime) - parseInt(dataObj.time) >= 7200000) {
      location.href = configs.accreditUrl
    } else {
      configs.token = dataObj.token
    }
  }
  return configs.token
}

Vue.prototype.http = function (url, method, data, callback) {
  let token = this.token()
  this.$ajax({
    url: url,
    method: method,
    headers: {
      'Authorization': token
    },
    data: data,
    responseType: 'json',
    withCredentials: true
  }).then(callback).catch(function (err) {
    // that.loadingState = "加载失败"
  })
}

Vue.prototype.$weChat = function (url, method, data, callback) {
  let token = this.token()
  this.$ajax({
    url: url,
    method: method,
    headers: {
      'Authorization': token
    },
    data: data,
    responseType: 'json',
    withCredentials: true
  }).then(callback).catch(function (err) {
    // that.loadingState = "加载失败"
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
