// The Vue build version to load with the `import` command 
// (runtime-only or standalone) has been set in webpack.base.conf with an alias. 
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import wx from 'weixin-js-sdk'
import VueAMap from 'vue-amap'
import $ from 'jquery'
import qs from 'qs'
import store from '@/components/store/index'
// import vueDragDrop from 'vue-drag-and-drop'
import draggable from 'vuedraggable'
// import Vuex from 'vuex'
import configs from '../src/configs/index'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// import vueDrag from 'drag'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.wx = wx
Vue.prototype.$ = $
Vue.prototype.configs = configs

// Vue.use(Vuex)
Vue.use(VueAMap)
Vue.use(require('vue-wechat-title'))
Vue.use(mint)
Vue.use(draggable)
// Vue.use(vueDrag)
// Vue.use(vueDragDrop)

import {
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin
} from 'vux'

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

VueAMap.initAMapApiLoader({
  key: 'c37c24a2c3156bb0c62d8f0b72c0c556',
  plugin: ['AMap.Geolocation']
})

Vue.prototype.token = function () {
  configs.token = this.$route.query.token //url token
  configs.localToken = localStorage.getItem("token") //本地 token
  console.log(configs, configs.localToken)
  if (configs.localToken == '' || configs.localToken == null || configs.localToken == undefined) { //
    console.log(1)
    if (configs.token == '' || configs.token == null || configs.token == undefined) { //url
      console.log('token为空')
      // location.href = configs.accreditUrl
    } else {
      localStorage.setItem("token", JSON.stringify({
        'token': configs.token,
        'time': configs.curTime
      }))
    }
  } else {
    let dataObj = JSON.parse(configs.localToken)
    console.log(dataObj)
    console.log(dataObj.time)
    console.log(configs.curTime)
    if (parseInt(configs.curTime) - parseInt(dataObj.time) >= 7200000) {
      console.log('token过期')
      localStorage.clear("token")
      if (configs.token == '') { //url
        console.log('token为空')
        // location.href = configs.accreditUrl
      } else {
        localStorage.setItem("token", JSON.stringify({
          'token': configs.token,
          'time': configs.curTime
        }))
      }
      // location.href = configs.accreditUrl
    } else {
      console.log('token成功')
      configs.token = dataObj.token
    }
  }
  return configs.token
}

Vue.prototype.http = function (url, method, data, callback) {
  this.$ajax({
    url: url,
    method: method,
    headers: {
      'Authorization': configs.tokenId
    },
    data: data,
    responseType: 'json'
    // withCredentials: true
  }).then(res => {
    let data = res.data
    if (data.code === 40004) {
      // location.href = configs.accreditUrl
      return
    }
    callback(res)
  }).catch(function (err) {
    // that.loadingState = "加载失败"
  })
}

Vue.prototype.$weChat = function () {
  let that = this
  let data = qs.stringify({
    'url': location.href
  })
  this.$ajax({
    url: configs.apiTop + '/weixin/js-sdk-config',
    method: 'post',
    data: data,
    responseType: 'json'
  }).then(function (res) {
    let msg = res.data.data
    that.wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: msg.app_id, //必填，公众号的唯一标识 
      timestamp: msg.timestamp,
      nonceStr: msg.nonce_str,
      signature: msg.signature,
      jsApiList: [
        'getLocation',
        'openLocation',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'scanQRCode',
        'closeWindow',
        'chooseWXPay',
        'startRecord',
        'uploadVoice',
        'stopRecord',
        'onVoicePlayEnd',
        'playVoice'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    that.wx.ready(function () {
      that.wx.onVoicePlayEnd({
        success: function (res) {
          // stopWave()
          alert(res + '123')
        }
      })
    })
    that.wx.error(function (res) {})
  }).catch(function (err) {
    // that.loadingState = "加载失败"
  })
}

//自定义指令JS
// Vue.directive('drag',
//   {
//     bind: function (el, binding) {
//       //当前元素
//       let oDiv = el
//       //上下文
//       let self = this
//       console.log(self)
//       oDiv.onmousedown = function (e) {
//         //鼠标按下，计算当前元素距离可视区的距离
//         let disX = e.clientX - oDiv.offsetLeft
//         let disY = e.clientY - oDiv.offsetTop
//         console.log(disX, disY)
//         document.onmousemove = function (e) {
//           //通过事件委托，计算移动的距离
//           let l = e.clientX - disX
//           let t = e.clientY - disY
//           console.log(l, t)
//           //移动当前元素
//           oDiv.style.left = l + 'px'
//           oDiv.style.top = t + 'px'
//           //将此时的位置传出去
//           binding.value({
//             x: e.pageX,
//             y: e.pageY
//           })
//         }
//         document.onmouseup = function (e) {
//           document.onmousemove = null
//           document.onmouseup = null
//         }
//       }
//     }
//   }
// )

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})