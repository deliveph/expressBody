<template>
  <div class="g-window">
    <!-- 切页动画设置 -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <fullscreen-img></fullscreen-img>
    <loading></loading>
  </div>
</template>

<script>
import Vue from 'vue'
import { Group, Cell, XHeader, XInput, XButton, XSwitch, Datetime, ViewBox, Search, ButtonTab, ButtonTabItem, Divider, AlertPlugin, ConfirmPlugin } from 'vux'
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

import cookie from './utils/cookie'
import pageUtil from './utils/page'

const sessionHistory = window.sessionStorage

export default {
  data() {
    return {
      transitionName: 'forward'
    }
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
    // 提交sdk连接请求
    this.$store.dispatch('connect')
    this.$store.dispatch('updateRefreshState')
  },
  components: {
    ViewBox,
    Loading,
    FullscreenImg
  },
  computed: {
    // 是否显示导航条
    showNav() {
      return pageUtil.showNav(this.$route.path)
    }
  }
}
</script>

<style scoped>
/* .g-window .m-main,
.g-window .m-album,
.g-window .m-article,
.g-window .m-room {
  position: absolute;
  padding-top: 3.6rem;
  display: block;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  overflow-x: hidden;
} */
</style>

