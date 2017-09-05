<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      token: '',
      localToken: '',
      accreditUrl: 'http://test.menory.com/weixin/auth-gateway'
    }
  },
  mounted: function() {
  },
  created() {
    let that = this;
    let data = qs.stringify({
      'url': location.href
    })
    this.$ajax({
      url: '/api/weixin/js-sdk-config',
      method: 'post',
      headers: {
        'Access-Control-Allow-Credentials': true
      },
      data: data,
      responseType: 'json',
      withCredentials: true
    }).then(function(res) {
      let msg = res.data.data
      that.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      that.wx.ready(function() {
      });
      that.wx.error(function(res) {
      });
    }).catch(function(err) {
      // that.loadingState = "加载失败"
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', 'Microsoft YaHei', Arial, sans-serif;
}
</style>
