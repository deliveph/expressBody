<template>
  <div class="g-window">
    <!-- 切页动画设置 -->
    <transition :name="transitionName">
        <div class="g-inherit m-main p-session">
        <group class="u-list">
          <cell
            v-for="(session, index) in sessionlist"
            class="u-list-item"
            :title="session.name"
            :inline-desc="session.lastMsgShow"
            :key="session.id"
            :sessionId="session.id"
            v-touch:swipeleft="showDelBtn"
            v-touch:swiperight="hideDelBtn"
            @click.native="enterChat(session)" >
            <img class="icon" slot="icon" width="24" :src="session.avatar">
            <span>
              {{session.updateTimeShow}}
            </span>
            <span v-show="session.unread > 0" class="u-unread">{{session.unread}}</span>
            <span
              class="u-tag-del"
              :class="{active: delSessionId===session.id}"
              @click="deleteSession"
              ></span>
          </cell>
        </group>
      </div>
    </transition>
    <fullscreen-img></fullscreen-img>
    <loading></loading>
  </div>
</template>

<script>
  import Loading from '../pages/components/Loading'
  import FullscreenImg from '../pages/components/FullscreenImg'
  import util from '../utils'
  import config from '../configs'
  import Vue from 'vue'
  import { Group } from 'vux'
  Vue.component('Group', Group)

  export default {
    data () {
      return {
        delSessionId: null,
        stopBubble: false,
        noticeIcon: config.noticeIcon,
        myPhoneIcon: config.myPhoneIcon,
        transitionName: 'forward'
      }
    },
    components: {
      Loading,
      FullscreenImg
    },
    computed: {
      sysMsgUnread () {
        let temp = this.$store.state.sysMsgUnread
        let sysMsgUnread = temp.addFriend || 0
        let customSysMsgUnread = this.$store.state.customSysMsgUnread
        return sysMsgUnread + customSysMsgUnread
      },
      userInfos () {
        return this.$store.state.userInfos
      },
      myInfo () {
        return this.$store.state.myInfo
      },
      myPhoneId () {
        return `${this.$store.state.userUID}`
      },
      sessionlist () {
        console.log(this.$store.state.sessionlist)
        let sessionlist = this.$store.state.sessionlist.filter(item => {
          console.log(item)
          item.name = ''
          item.avatar = ''
          if (item.scene === 'p2p') {
            let userInfo = null
            if (item.to !== this.myPhoneId) {
              userInfo = this.userInfos[item.to]
            } else {
              return false
            }
            if (userInfo) {
              item.name = util.getFriendAlias(userInfo)
              item.avatar = userInfo.avatar
            }
          }
          let lastMsg = item.lastMsg || {}
          if (lastMsg.type === 'text') {
            item.lastMsgShow = lastMsg.text || ''
          } else if (lastMsg.type === 'custom') {
            item.lastMsgShow = util.parseCustomMsg(lastMsg)
          } else if (util.mapMsgType(lastMsg)) {
            item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`
          } else {
            item.lastMsgShow = ''
          }
          if (item.updateTime) {
            item.updateTimeShow = util.formatDate(item.updateTime, true)
          }
          return item
        })
        return sessionlist
      }
    },
    methods: {
      enterSysMsgs () {
        if (this.hideDelBtn())
          return
        location.href = '#/sysmsgs'
      },
      enterChat (session) {
        if (this.hideDelBtn())
          return
        if (session && session.id)
          location.href = `#/chat/${session.id}`
      },
      enterMyChat () {
        // 我的手机页面
        location.href = `#/chat/p2p-${this.myPhoneId}`
      },

      
      deleteSession () {
        if (this.delSessionId !== null) {
          this.$store.dispatch('deleteSession', this.delSessionId)
        }
      },
      showDelBtn (vNode) {
        if (vNode && vNode.data && vNode.data.attrs) {
          this.delSessionId = vNode.data.attrs.sessionId
          this.stopBubble = true
          setTimeout(() => {
            this.stopBubble = false
          }, 20)
        }
      },
      hideDelBtn () {
        if (this.delSessionId !== null && !this.stopBubble) {
          // 用于判断是否前置状态是显示删除按钮
          this.delSessionId = null
          return true
        }
        return false
      }
    },
    created(){
      console.log(123)
      console.log(this)
    }
  }
</script>

<style src="../../static/css/theme.css"></style>
<style  lang="scss">
  .p-session {
    .vux-cell-primary {
      max-width: 70%;
    }
  }
</style>
