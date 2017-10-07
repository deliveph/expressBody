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

import Vue from 'vue'
import { Group, Cell, XHeader, XInput, XButton, XSwitch, Datetime, ViewBox, Search, ButtonTab, ButtonTabItem, Divider, AlertPlugin, ConfirmPlugin, Toast } from 'vux'
import Loading from './pages/components/Loading'
import FullscreenImg from './pages/components/FullscreenImg'

// 全局注册vux的组件
Vue.component('Group', Group)
Vue.component('Cell', Cell)
Vue.component('Datetime', Datetime)
Vue.component('ButtonTab', ButtonTab)
Vue.component('ButtonTabItem', ButtonTabItem)
Vue.component('Divider', Divider)
Vue.component('Search', Search)
Vue.component('XInput', XInput)
Vue.component('XButton', XButton)
Vue.component('XHeader', XHeader)
Vue.component('XSwitch', XSwitch)

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

import config from './configs'
import cookie from './utils/cookie'
import pageUtil from './utils/page'

const sessionHistory = window.sessionStorage
export default {
  data() {
    return {
      tags: '',
      transitionName: 'forward',
      net_ease_accid:'',
      net_ease_token:''
    }
  },
  components: {
    draggable,
    ViewBox,
    Loading,
    FullscreenImg
  },
  watch: {
    // 更新页面所在位置，用于判断是前进页还是后退页
    '$route'(to, from) {
      if (to && from) {
        let toPath = to.path
        let fromPath = from.path
        let count = parseInt(sessionHistory.getItem('count'))
        // 如果是导航页或者没有初始记录
        if (Number.isNaN(count)) {
          count = 1
          this.transitionName = 'forward'
        } else {
          count += 1
          let fromCount = parseInt(sessionHistory.getItem(fromPath))
          let toCount = parseInt(sessionHistory.getItem(toPath))
          if (toCount < fromCount && fromCount < count && (!pageUtil.showNav(fromPath))) {
            this.transitionName = 'backward'
            count = toCount
          } else {
            this.transitionName = 'forward'
          }
          if (pageUtil.showNav(toPath)) {
            count = 1
          }
        }
        sessionHistory.setItem(toPath, count)
        sessionHistory.setItem('count', count)
      }
    }
  },
  // 所有页面更新都会触发此函数
  updated() {
    let that = this
    // 提交sdk连接请求
    if(that.net_ease_token != ''){
      console.log(123,"#$$$")
      console.log(this.$store)
      
    }
    this.$store.dispatch('connect')
    this.$store.dispatch('updateRefreshState') 
  },
  mounted: function() {
  },
  computed: {
    // 是否显示导航条
    showNav() {
      return pageUtil.showNav(this.$route.path)
    }
  },
  methods: {
    getImConfig(){
      let that = this
      this.http(that.configs.apiTop + "/new-ease/get-im-config", "get", '', function(res) { 
          let msg = res.data
          let data = msg.data
          if (msg.code == 0) { 
            console.log(config)
              that.config.test.appkey = data.net_ease_app_key
              cookie.setCookie('uid', data.net_ease_accid)
              cookie.setCookie('sdktoken', data.net_ease_token)
              
              console.log(that.net_ease_accid)
              console.log(that.net_ease_token)
          } else if (msg.code == 40004) { 
              location.href = that.configs.accreditUrl 
          } else{ 
              that.$vux.toast.text(msg.message, 'middle', 100); 
          } 
      }) 
    }
  },
  created() {
    let that = this
    let token = this.$route.query.token //url token
    // this.$weChat()
    if (token == '' || token == null || token == undefined) {
      let tokens = JSON.parse(localStorage.getItem("token"))
      token = tokens.token
      if (token == '' || token == null || token == undefined) {
        that.wx.closeWindow()
        return
      }
      // 过期判断
    } else {
      localStorage.setItem("token", JSON.stringify({
        'token': token,
        'time': that.configs.curTime
      }))
    }
    that.configs.tokenId = token
    console.log('App.vue.created')
    this.http(that.configs.apiTop + "/new-ease/get-im-config", "get", '', function(res) { 
        let msg = res.data
        let data = msg.data
        console.log('App.vue.created msg.code: ' + msg.code)
        if (msg.code == 0) { 
            console.log(config)
            config.appkey = data.net_ease_app_key
            cookie.setCookie('uid', data.net_ease_accid)
            cookie.setCookie('sdktoken', data.net_ease_token)
            that.net_ease_accid = data.net_ease_accid
            that.net_ease_token = data.net_ease_token
            console.log(config.test.appkey)
            console.log(that.net_ease_accid)
            console.log(that.net_ease_token)
        } else if (msg.code == 40004) { 
            location.href = that.configs.accreditUrl 
        } else{ 
            that.$vux.toast.text(msg.message, 'middle', 100); 
        } 
    }) 
    // that.getImConfig()
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
