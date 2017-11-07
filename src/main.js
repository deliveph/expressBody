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

// import {
//   Toast,
//   Loading
// } from 'vux'

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

VueAMap.initAMapApiLoader({
  key: 'a66fb55fb72dde7e1fecaa303a1e5489',
  plugin: ['AMap.Geolocation']
})

// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   config.headers.Authorization = configs.loginToken
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

Vue.prototype.http = function (url, method, data, callback, responseType) {
  let that = this
  if (responseType === undefined) {
    responseType = 'json'
  }
  that.$ajax({
    url: url,
    method: method,
    headers: {
      'Authorization': configs.loginToken
    },
    data: data,
    responseType: responseType
  }).then(res => {
    let data = res.data
    if (data.code === 40004) {
      that.$vux.toast.text('登录已过期，正重新登录...', 'middle', 100)
      setTimeout(function () {
        location.href = that.configs.accreditUrl + '?redirect_uri=' + encodeURIComponent(location.href)
      }, 200)
    } else if (data.code === 40017) {
      that.$vux.toast.text(data.message, 'middle', 100)
      setTimeout(function () {
        that.wx.closeWindow()
      }, 200)
    } else {
      callback(res)
    }
  }).catch(function (err) {
    console.log('http.error', url, err)
    // that.loadingState = '加载失败'
  })
}

Vue.prototype.$weChat = function () {
  let that = this
  var routerName = this.$route.name
  var routerType = this.$route.query.type
  let data = qs.stringify({
    'url': location.href.split('#')[0]
  })
  this.$ajax({
    url: configs.apiTop + '/weixin/js-sdk-config',
    method: 'post',
    data: data,
    responseType: 'json'
  }).then(function (res) {
    let msg = res.data.data
    that.wx.ready(function () {
      console.log('ready...............................................')
      // 尝试录音一下,避免初次以及未知时间间隔之后, 提示用户"是否开启录音"
      that.wx.startRecord({
        success: function () {
          configs.isAllowRecord = true
          that.wx.stopRecord()
        },
        cancel: function () {
          that.$vux.toast.text('用户拒绝授权录音', 'middle', 100)
        }
      })
      that.wx.onVoicePlayEnd({
        success: function (res) {}
      })
      that.http(that.configs.apiTop + '/weixin/share-config', 'get', '', function (res) {
        let msg = res.data
        if (msg.code === 0) {
          let data = msg.data
          // 分享到朋友圈
          that.wx.onMenuShareTimeline({
            title: data.title, // 分享标题
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.image_url, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              that.http(that.configs.apiTop + '/user/share-success-callback', 'post', '', function (res) {
                let msg = res.data
                if (msg.code === 0) {
                  if (routerName === 'evalresult' && routerType !== 1) {
                    that.$router.push({
                      path: '/order'
                    })
                  }
                } else {
                  that.$vux.toast.text(data.message, 'middle', 100)
                }
              })
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          // 分享到朋友
          that.wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.description, // 分享描述
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.image_url, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
              that.http(that.configs.apiTop + '/user/share-success-callback', 'post', '', function (res) {
                let msg = res.data
                if (msg.code === 0) {
                  if (routerName === 'evalresult' && routerType !== 1) {
                    that.$router.push({
                      path: '/order'
                    })
                  }
                } else {
                  that.$vux.toast.text(data.message, 'middle', 100)
                }
              })
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          // 分享到qq
          that.wx.onMenuShareQQ({
            title: data.title, // 分享标题
            desc: data.description, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.image_url, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              that.http(that.configs.apiTop + '/user/share-success-callback', 'post', '', function (res) {
                let msg = res.data
                if (msg.code === 0) {
                  if (routerName === 'evalresult' && routerType !== 1) {
                    that.$router.push({
                      path: '/order'
                    })
                  }
                } else {
                  that.$vux.toast.text(data.message, 'middle', 100)
                }
              })
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
    that.wx.error(function (res) {
      alert('that.wx.error')
    })
    setTimeout(() => {
      that.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: msg.app_id, // 必填，公众号的唯一标识
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
    }, 800) // 避免频繁调用ready回调失效
  }).catch(function (err) {
    console.log(err)
    // that.loadingState = "加载失败"
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  created () {
    // let that = this
    axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
      // that.$vux.loading.show({
      //   text: 'Loading'
      // })
      store.dispatch('showLoading')
      return config
    }, function (error) {
    // 对请求错误做些什么
      return Promise.reject(error)
    })
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      setTimeout(() => {
        store.dispatch('hideLoading')
      }, 100)
      // that.$vux.loading.hide()
      return response
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
})
