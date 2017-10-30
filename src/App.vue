<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <getBack></getBack>
  </div>
</template>

<script>
// import vueDragDrop from 'vue-drag-and-drop'
import draggable from 'vuedraggable'
import getBack from '../src/components/getBack'
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
import pageUtil from './utils/page'

const sessionHistory = window.sessionStorage
export default {
  data () {
    return {
      tags: '',
      transitionName: 'forward',
      loginInfo: null
    }
  },
  components: {
    draggable,
    ViewBox,
    Loading,
    FullscreenImg,
    getBack
  },
  watch: {
    // 更新页面所在位置，用于判断是前进页还是后退页
    '$route' (to, from) {
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
  updated () {
    let that = this
    if (that.loginInfo === null) {
      that.http(that.configs.apiTop + '/new-ease/get-im-config', 'get', '', function (res) {
        let msg = res.data
        let data = msg.data
        if (msg.code === 0) {
          config.appkey = data.net_ease_app_key
          that.loginInfo = {
            'uid': data.net_ease_accid,
            'sdktoken': data.net_ease_token
          }
          that.$store.dispatch('connect', that.loginInfo)
          that.$store.dispatch('updateRefreshState')
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    } else {
      that.$store.dispatch('connect', that.loginInfo)
      that.$store.dispatch('updateRefreshState')
    }
  },
  mounted: function () {
  },
  computed: {
    // 是否显示导航条
    showNav () {
      return pageUtil.showNav(this.$route.path)
    }
  },
  methods: {
  },
  created () {
    this.$weChat()
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
