<template>
  <div class="g-window">
    <!-- 切页动画设置 -->
    <transition :name="transitionName">
        <div class="g-inherit m-main p-session">
          <group class="u-list" v-if="sessionlist != ''">
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
              <!-- <span
                class="u-tag-del"
                :class="{active: delSessionId===session.id}"
                @click="deleteSession"
                ></span> -->
            </cell>
          </group>
          
          <div class="no-session" v-else>
            <div class="no-img"></div>
            <p>暂无消息</p>
            <router-link :to="{path:'/service',query:{'is_verification':1}}" tag="button">返回首页</router-link>
        </div>
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
        let unreadL = sysMsgUnread + customSysMsgUnread
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
        let sessionlist = this.$store.state.sessionlist.filter(item => {
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
    },
    watch:{
      unreadFun(){
          console.log(this.$store.state.unreadLen)
          console.log(that.unread,this.$store.state.customSysMsgUnread)
          let that = this
          that.unread = this.$store.state.customSysMsgUnread
          console.log(that.unread,this.$store.state.customSysMsgUnread)
      }
    }
  }
</script>

<style src="../../static/css/theme.css"></style>
<style  lang="scss" >
  @import '../../static/assets/css/px2rem.scss';
  .p-session {
    .vux-cell-primary {
      max-width: 70%;
    }
  }

  .u-list .weui-cells:before{
    content:"";
    border-top:0;
  }
  #app .g-window .u-list-item{ 
    min-height:auto;
    font-size:px2rem(34);
    padding:px2rem(18)  px2rem(20);
    // border-bottom:1px solid #d9d9d9
  }
  .g-window .weui-cell{
  }
  .weui-cell__hd{}
  #app  .g-window .u-list-item .icon{
    width:px2rem(100);
    height:px2rem(100);
    margin-right:px2rem(40);
  }
  .vux-label{
    font-size:px2rem(34);
    color:#333
  }
  .p-session .vux-cell-primary{}
  #app .g-window .weui-cell .vux-label-desc{
    font-size:px2rem(28);
    color:#666;
  }
  #app .g-window .weui-cell__ft{
    font-size:px2rem(24);
    color:#999
  }
  #app .g-window .u-unread{
    display: inline-block;
    position: absolute;
    left:px2rem(100);
    top:px2rem(10);
    padding: px2rem(10);
    min-width: px2rem(30);
    min-height: px2rem(30);
    line-height: px2rem(30);
    font-size: px2rem(16);
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 0.8rem;
  }

  .no-session {
      margin-top: px2rem(102);
      text-align:center;
      .no-img {
          background: url('/static/assets/images/no_indent.png') no-repeat;
          background-size: cover;
          width: px2rem(250);
          height: px2rem(250);
          margin: 0 auto;
      }
      p {
          text-align: center;
          font-size: px2rem(28);
          color: #999;
          margin-top: px2rem(40);
      }
      button{
        width:70%;
        height:px2rem(70);
        line-height:px2rem(70);
        background-color:#366931;
        border-radius: px2rem(10);
        margin:0 auto;
        margin-top:px2rem(90);
        font-size: px2rem(30);
        color: #fff;
      }
  }
</style>
