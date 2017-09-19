<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <!-- <div id="test" v-drag>
      <img src="/static/assets/images/inquire_bg.png" align="left" style="">
    </div> -->
    <!-- <div class="image"  draggable drop="handleImageDrop">
              <img src="/static/assets/images/inquire_bg.png" align="left">
          </div> -->
    <!-- <draggable v-model="tags" :move="getdata" @update="datadragEnd" class="draggable">
          <img src="/static/assets/images/inquire_bg.png" align="left" style="position: fixed;top: 50%;right: 0;width: 30px;height: 30px;">
        </draggable> -->
    <!-- <div id="box">
          HTML位置
          <br>x:{{val.x}} <br>y:{{val.y}}
          <div v-drag="greet" id="drag" :style="style">
          //注意这里要通过指令绑定函数将当前元素的位置数据传出来
          </div>
        </div> -->
  </div>
</template>

<script>
// import vueDragDrop from 'vue-drag-and-drop'
import draggable from 'vuedraggable'
import qs from 'qs'
export default {
  data() {
    return {
      tags: ''
    }
  },
  components: {
    draggable
  },
  mounted: function() {
  },
  methods: {
    // getdata(evt) {
    //   console.log(evt)
    // },
    // datadragEnd(evt) {
    //   console.log('拖动前的索引 :' + evt.oldIndex)
    //   console.log('拖动后的索引 :' + evt.newIndex)
    //   console.log(this.tags)
    // }
    // greet(val){
    //   vm.val = val
    // }
  },
  created() {
    let that = this
    let token = this.$route.query.token //url token
    this.$weChat()
    if (token == '' || token == null || token == undefined) {
      let tokens = JSON.parse(localStorage.getItem("token"))
      token = tokens.token
      console.log(token)
      if (token == '' || token == null || token == undefined) {
        that.wx.closeWindow()
        return
      }
      // 过期判断
    } else {
      console.log(token)
      localStorage.setItem("token", JSON.stringify({
        'token': token,
        'time': that.configs.curTime
      }))
    }
    that.configs.tokenId = token
    // configs.localToken = localStorage.getItem("token") //本地 token
    // if ()
    // let that = this;
    // let data = qs.stringify({
    //   'url': location.href
    // })
    // this.$ajax({
    //   url: '/api/weixin/js-sdk-config',
    //   method: 'post',
    //   headers: {
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   data: data,
    //   responseType: 'json',
    //   withCredentials: true
    // }).then(function(res) {
    //   let msg = res.data.data
    //   that.wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: msg.app_id, // 必填，公众号的唯一标识 
    //     timestamp: msg.timestamp,
    //     nonceStr: msg.nonce_str,
    //     signature: msg.signature,
    //     jsApiList: [
    //       'getLocation',
    //       'openLocation',
    //       'onMenuShareAppMessage',
    //       'onMenuShareTimeline',
    //       'scanQRCode',
    //     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //   })
    //   that.wx.ready(function() {
    //   });
    //   that.wx.error(function(res) {
    //   });
    // }).catch(function(err) {
    //   // that.loadingState = "加载失败"
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', 'Microsoft YaHei', Arial, sans-serif;
}

#test {
  position: relative;
  top: 50px;
  right: 0;
  width: 0.75rem;
  height: 0.75rem;
  background: #fff;
  box-shadow: 1px 2px 3px #ccc;
  border-radius: 2px;
}

#test img {
  position: fixed;
  top: 50%;
  right: 0;
  width: 0.75rem;
  height: 0.75rem;
}
</style>
