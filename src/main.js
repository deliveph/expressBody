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
// import draggabilly from 'draggabilly'
// 同步单页路由与数据中心
// import stores from './stores'
// import vueDragDrop from 'vue-drag-and-drop'
import draggable from 'vuedraggable'
// import Vuex from 'vuex'
import configs from './configs'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// import vueDrag from 'drag'

Vue.config.productionTip = true
Vue.prototype.$ajax = axios
Vue.prototype.wx = wx
Vue.prototype.$ = $
Vue.prototype.configs = configs

// Vue.use(Vuex)
Vue.use(VueAMap)
Vue.use(require('vue-wechat-title'))
Vue.use(mint)
Vue.use(draggable)
// Vue.use(draggabilly)
// Vue.use(vueDrag)
// Vue.use(vueDragDrop)
// 添加手势触摸事件，使用方法如 v-touch:swipeleft
import VueTouch from './plugins/touchEvent'
Vue.use(VueTouch)

import VueRecyclerviewNew from 'vue-recyclerview'
Vue.use(VueRecyclerviewNew)

// 同步单页路由与数据中心
// import store from './store'
import {
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin
} from 'vux'

import { Toast, Loading} from 'vux'

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

VueAMap.initAMapApiLoader({
  key: 'a66fb55fb72dde7e1fecaa303a1e5489',
  plugin: ['AMap.Geolocation']
})

Vue.prototype.token = function () {
  configs.token = this.$route.query.token //url token
  configs.localToken = localStorage.getItem("token") //本地 token
  if (configs.localToken == '' || configs.localToken == null || configs.localToken == undefined) { //
    if (configs.token == '' || configs.token == null || configs.token == undefined) { //url
      // location.href = configs.accreditUrl
    } else {
      localStorage.setItem("token", JSON.stringify({
        'token': configs.token,
        'time': configs.curTime
      }))
    }
  } else {
    let dataObj = JSON.parse(configs.localToken)
    if (parseInt(configs.curTime) - parseInt(dataObj.time) >= 7200000) {
      localStorage.clear("token")
      if (configs.token == '') { //url
        // location.href = configs.accreditUrl
      } else {
        localStorage.setItem("token", JSON.stringify({
          'token': configs.token,
          'time': configs.curTime
        }))
      }
      // location.href = configs.accreditUrl
    } else {
      configs.token = dataObj.token
    }
  }
  return configs.tokenconfigs.token
}

Vue.prototype.http = function (url, method, data, callback, responseType) {
  let that = this
  if (responseType === undefined) {
    responseType = 'json'
  }
  console.log(responseType)
  this.$ajax({
    url: url,
    method: method,
    headers: {
      'Authorization': configs.tokenId
    },
    data: data,
    responseType: responseType,
    beforeSend: function () {
      that.$vux.loading.show({
        text: 'Loading'
      })
    }
    // withCredentials: true
  }).then(res => {
    let data = res.data
    let that = this
    if (data.code == 40004) {
      that.$vux.toast.text('token失效', 'middle', 100)
      setTimeout(function(){ 
        that.wx.closeWindow()
      }, 200)
      return
    }
    that.$vux.loading.hide()
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
      debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
        'playVoice',
        'onMenuShareQQ'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    that.wx.ready(function () {
      that.wx.onVoicePlayEnd({
        success: function (res) {
          // stopWave()
          alert(res + '123')
        }
      })

      that.http(that.configs.apiTop + '/weixin/share-config', 'get', '', function (res) {
        let msg = res.data
        if (msg.code == 0) {
          let data = msg.data;
          /*分享到朋友圈*/
          that.wx.onMenuShareTimeline({
            title: data.title, // 分享标题
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.image_url, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          /*分享到朋友*/
          that.wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.description, // 分享描述
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.image_url, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

          /*分享到qq*/
          that.wx.onMenuShareQQ({
            title: data.title, // 分享标题
            desc: data.description, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.image_url, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        } else {
          console.log(msg)
        }
      })
    })
    that.wx.error(function (res) { })
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
