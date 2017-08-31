// The Vue build version to load with the `import` command 
// (runtime-only or standalone) has been set in webpack.base.conf with an alias. 
import Vue from 'vue' 
import App from './App' 
import router from './router' 
import axios from 'axios' 
import wx from 'weixin-js-sdk' 
import VueAMap from 'vue-amap' 
 
Vue.config.productionTip = false 
Vue.prototype.$ajax = axios 
Vue.prototype.SDKRegister = wx 
 
import { ToastPlugin } from 'vux' 
Vue.use(ToastPlugin) 
Vue.use(VueAMap) 
 
VueAMap.initAMapApiLoader({ 
  key: 'c37c24a2c3156bb0c62d8f0b72c0c556', 
  plugin: ['AMap.Geolocation'] 
}) 
 
/* eslint-disable no-new */ 
new Vue({ 
  el: '#app', 
  router, 
  template: '<App/>', 
  components: { App } 
}) 