<template>
  <div class="g-window">
    <div class="g-inherit m-article">
      <!-- <x-header class="m-tab" :left-options="leftBtnOptions" @on-click-back = "onClickBack">
        <h1 class="m-tab-top" @click="enterNameCard">{{sessionName}}</h1>
        <a slot="left"></a>
        <group class="m-tab-right" slot="right">
          <a :href="'#/chathistory/'+sessionId">历史消息</a>
        </group>
      </x-header> -->
      <div class="m-chat-main">
        <chat-list
          type="session"
          :msglist="msglist"
          :userInfos="userInfos"
          :robotInfos="robotInfos"
          :myInfo="myInfo"
          :isRobot="isRobot"
          @msgs-loaded="msgsLoaded"
        ></chat-list>
        <chat-editor
          type="session"
          :scene="scene"
          :to="to"
          :isRobot="isRobot"
        ></chat-editor>
      </div>
    </div>
  </div>
</template>

<script>
import ChatEditor from './components/ChatEditor'
import ChatList from './components/ChatList'
import util from '../utils'
import pageUtil from '../utils/page'


export default {
  components: {
    ChatEditor,
    ChatList
  },
  // 进入该页面，文档被挂载
  mounted () {
    this.$store.dispatch('showLoading')
    // 此时设置当前会话
    this.$store.dispatch('setCurrSession', this.sessionId)
    pageUtil.scrollChatListDown()
    setTimeout(() => {
      this.$store.dispatch('hideLoading')
    }, 1000)
  },
  updated () {
    pageUtil.scrollChatListDown()
  },
  // 离开该页面，此时重置当前会话
  destroyed () {
    this.$store.dispatch('resetCurrSession')
  },
  data () {
    return {
      leftBtnOptions: {
        backText: ' ',
        preventGoBack: true,
      }
    }
  },
  computed: {
    sessionId () {
      let sessionId = this.$route.params.sessionId
      return sessionId
    },
    sessionName () {
      let sessionId = this.sessionId
      let user = null
      if (/^p2p-/.test(sessionId)) {
        user = sessionId.replace(/^p2p-/, '')
        if (user === this.$store.state.userUID) {
          return '我的手机'
        } else if (this.isRobot) {
          return this.robotInfos[user].nick
        } else {
          let userInfo = this.userInfos[user] || {}
          return util.getFriendAlias(userInfo)
        }
      } else if (/^team-/.test(sessionId)) {
        return '群'
      }
    },
    scene () {
      console.log(util.parseSession(this.sessionId), "sessionId")
      return util.parseSession(this.sessionId).scene
    },
    to () {
      return util.parseSession(this.sessionId).to
    },
    // 判断是否是机器人
    isRobot () {
      let sessionId = this.sessionId
      let user = null
      if (/^p2p-/.test(sessionId)) {
        user = sessionId.replace(/^p2p-/, '')
        if (this.robotInfos[user]) {
          return true
        }
      }
      return false
    },
    myInfo () {
      return this.$store.state.myInfo
    },
    userInfos () {
      return this.$store.state.userInfos
    },
    robotInfos () {
      return this.$store.state.robotInfos
    },
    msglist () {
      let msgs = this.$store.state.currSessionMsgs
      console.log(msgs)
      return msgs
    }
  },
  methods: {
    onClickBack () {
      // location.href = '#/contacts'
      window.history.go(-1)
    },
    msgsLoaded () {
      pageUtil.scrollChatListDown()
    },
    enterNameCard () {
      if (/^p2p-/.test(this.sessionId)) {
        let account = this.sessionId.replace(/^p2p-/, '')
        if (account === this.$store.state.userUID) {
          location.href = `#/general`
          return
        }
        location.href = `#/namecard/${account}`
      }
    }
  }
}
</script>

<style src="../../static/css/theme.css"></style>
<style>
  @media screen and (max-width: 420px) and (min-width: 300px){
    .g-window .m-chat-emoji .emoji-content .cnt {
      width: 358px;
    }
  }
</style>
<style lang="scss">
  @import '../../static/assets/css/px2rem.scss';
  #app .g-window .m-chat-main{
    padding-bottom:px2rem(100);
    background-color: #f0f0f0;
  }
  #app .g-window .m-chat-main .m-chat-list{
    padding:px2rem(32) px2rem(0)
  }
  #app .g-window .m-chat-editor{
    height: px2rem(100);
    background-color: #fff;
  }
  #app .g-window .m-chat-editor-main .m-chat-change{
    width:px2rem(60);
    height:px2rem(60);
    margin:0 px2rem(20)
  }
  #app .g-window .m-chat-editor-main .m-chat-change img{
     width:px2rem(60);
     height:px2rem(60);
  }
  #app .g-window .m-chat-editor-main .u-editor-input{
    width:auto;
    height:px2rem(68);
    padding:px2rem(0);
    flex:1;
  }
  #app .g-window .m-chat-editor-main .u-editor-video{
    width:auto;
    height:px2rem(68);
    line-height:px2rem(68);
    border-radius:px2rem(10);
    padding:px2rem(0);
    flex:1;
    font-size:px2rem(24);
  }
  #app .g-window .m-chat-editor-main .u-editor-input textarea{
    font-size:px2rem(24);
    color:#999;
    padding:px2rem(20);
    border-radius:px2rem(10);
    -webkit-appearance: none;
  }
  #app .g-window .m-chat-editor-main .u-editor-icons{
    width:auto;
    height:px2rem(100);
    flex:1;
    padding-left:px2rem(24)
  }
  #app .g-window .m-chat-editor-main .u-editor-icons .u-editor-icon{
    width:px2rem(60);
    height:px2rem(60);
    margin-left:px2rem(0);
    margin-right:px2rem(24);
    top:px2rem(0);
    vertical-align: top;
    margin-top:px2rem(20)
  }
  #app .g-window .m-chat-editor-main .u-editor-send{
    position: relative;
    display: inline-block;
    top: px2rem(0);
    margin-left:px2rem(0);
    width: px2rem(84);
    height: px2rem(46);
    line-height:px2rem(46);
    padding: px2rem(6) px2rem(6);
    border-radius: px2rem(10);
    font-size: px2rem(24);
    color: #fff;
    background-color: #0091e4;
    text-align: center;
    margin-top:px2rem(20)
  }


  #app .g-window .m-chat-editor .m-chat-emoji{
    top: -1.92rem;
    height: 1.92rem;
  }
  
  #app .g-window .m-chat-emoji .emoji-content .cnt{
    margin: 0.1rem auto;
  }

  #app .g-window .u-msg.item-time{
    min-height:px2rem(50);
    font-size:px2rem(30);
    color: #fff;
    background-color: #cacaca;
    max-width:px2rem(300);
    height:px2rem(42);
    line-height:px2rem(42);
    padding:0 px2rem(20);
    border-radius:px2rem(6);
    margin: 0 auto;
    margin-bottom:px2rem(20);
  }

  #app{
    .g-window{
      .g-inherit{
        
      }
      .m-chat-main{
        padding-left:px2rem(0);
      }
      .u-msg{
        min-height:px2rem(88);
        margin-bottom:px2rem(12);
        padding:0;
        // margin-top:px2rem(40);
        &.session-chat{
          &.item-me{
            .msg-text{
              color: #fff;
              background-color: #8cd985;
            }
          }
          &.item-you{
            .msg-text{
              color: #333;
              background-color: #ffffff;
            }
          }
        }
        &.session-chat.item-you{

        }
        .msg-head{
          width:px2rem(88);
          height:px2rem(88);
          margin:0;
          margin-left:px2rem(16);
          margin-right:px2rem(16);
          top:0;
        }
        .msg-text{
          min-height:px2rem(20);
          border-radius:px2rem(8);
          padding:px2rem(22);
          font-size:px2rem(30);
          line-height:px2rem(50);
          margin-bottom:px2rem(40);
          // margin-top:px2rem(16);
          &:before{
            content:initial;
          }
          &:after{
            content:initial;
          }
          .emoji-small{
            width:px2rem(44);
            height:px2rem(44);
            vertical-align: sub;
          }
        }
      } 
    }
  }
  // .g-window .u-msg.session-chat.item-you .msg-text::before 
</style>
 