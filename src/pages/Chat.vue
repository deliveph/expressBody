<template>
  <div class="g-window">
    <div class="g-inherit m-article p-chat-history">
      <div class="m-chat-main">
        <chat-list
          type="session"
          :msglist="msglist"
          :userInfos="userInfos"
          :robotInfos="robotInfos"
          :myInfo="myInfo"
          :isRobot="isRobot"
          @msgs-loaded="msgsLoaded"
          :canLoadMore="canLoadMore"
          v-touch:swipedown="loadMore"
        ></chat-list>
        <chat-editor
          type="session"
          :scene="scene"
          :to="to"
          :isRobot="isRobot"
        ></chat-editor>
      </div>
    </div>

    <!-- 用户信息 -->
    <div class="layer_warp layer_userMessage" v-if="demo" @click="layerWarp">
        <div class="layer_box" @click.stop="">
            <div class="layer_container">
                <div class="user_message_main">
                   <div class="img">
                      <img :src="chooseChatUser.avatar" />
                   </div>
                   <div class="right_msg">
                     <p class="name">{{ chooseChatUser.nick }}</p>
                     <p><span>电话：</span>{{ chooseChatUser.phone }}</p>
                     <p class="address"><span>地址：</span>{{ chooseChatUser.address }}</p>
                   </div>
                </div>
            </div>
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
    if (this.isBottom === true) {
      pageUtil.scrollChatListDown()
      this.currPagePos = pageUtil.getChatListHeight()
    } else {
      let tempPagePos = pageUtil.getChatListHeight()
      pageUtil.scrollChatListDown(tempPagePos - this.currPagePos)
      this.currPagePos = tempPagePos
    }
    this.isBottom = true
  },
  // 离开该页面，此时重置当前会话
  destroyed () {
    this.$store.dispatch('resetCurrSession')
  },
  data () {
    return {
      leftBtnOptions: {
        backText: ' ',
        preventGoBack: true
      },
      isBottom: true,
      currPagePos: 0
    }
  },
  created () {
    this.chooseChatUser = this.$store.state.chooseChatUser
    this.$store.dispatch('resetNoMoreHistoryMsgs')
    this.getHistoryMsgs()
  },
  computed: {
    canLoadMore () {
      return !this.$store.state.noMoreHistoryMsgs
    },
    demo () {
      this.chooseChatUser = this.$store.state.chooseChatUser
      return this.chooseChatUser !== null
    },
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
      return msgs
    }
  },
  methods: {
    msgsLoaded () {
      // pageUtil.scrollChatListDown()
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
    },
    layerWarp () {
      this.$store.dispatch('chooseChatUser', null)
    },
    loadMore () {
      this.isBottom = false
      if (pageUtil.getChatListScroll() <= 20) {
        this.getHistoryMsgs()
      }
    },
    getHistoryMsgs () {
      if (this.canLoadMore) {
        this.$store.dispatch('getHistoryMsgs', {
          scene: this.scene,
          to: this.to
        })
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
    padding-top:px2rem(10);
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
    div{
      line-height: 0.24rem;
    }
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


  .layer_warp{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
        &.layer_userMessage{
          .layer_box{
            // width:100%;
            // height: px2rem(304);
            background-color: #fff;
            display: inline-block;
            border-radius: 0;
            border-top-left-radius: px2rem(10);
            border-top-right-radius: px2rem(10);
            position: absolute;
            bottom: 0;
            padding:px2rem(56) px2rem(38);
            .user_message_main{
              display: flex;
              .img{
                width: px2rem(150);
                height:px2rem(150);
                border-radius: 50%;
                line-height:px2rem(150);
                vertical-align: middle;
                margin-right:px2rem(30);
                img{
                  width: px2rem(136);
                  height:px2rem(136);
                  border-radius: 50%;
                  vertical-align: top;
                  margin-top:px2rem(6);
                }
              }
              .right_msg{
                margin-top:px2rem(10);
                p{
                  font-size:px2rem(30);
                  color:#999;
                  margin-bottom: px2rem(15);
                  &.name{
                    color:#666;
                  }
                  &.address{
                    line-height: px2rem(45);
                  }
                }
              }
            }
          }
        }
    }
  // .g-window .u-msg.session-chat.item-you .msg-text::before 
</style>
 