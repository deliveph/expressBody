<template>
  <div class="m-chat-editor" @click="hideRobotList">
    <chat-emoji
      v-bind:type="type"
      v-bind:scene="scene"
      v-bind:to="to"
      v-show="isEmojiShown"
      v-on:add-emoji="addEmoji"
      v-on:hide-emoji="hideEmoji"
    ></chat-emoji>
    <group v-show="isRobotListShown" class="m-chat-emoji m-chat-robot">
      <cell v-for="robot in robotslist" :title="robot.nick" :key="robot.account" @click.native="chooseRobot(robot)">
        <img class="icon" slot="icon" width="20" :src="robot.avatar">
      </cell>
    </group>
    <div class="m-chat-editor-main" :class="{robot:isRobot}">
      <span class="m-chat-change" :class="classObject" @click="changeChat(classObject)">
          <img src="/static/assets/images/chat_voice_default.png" :class="classObject.txt"/>
          <img src="/static/assets/images/voice/keyboard.png" :class="classObject.video"/>
      </span>
      
      <span class="u-editor-input"  :class="classObject.txt">
        <textarea v-model="msgToSent" ></textarea>
      </span>
      <span class="u-editor-video" :class="classObject.video">
         按住&nbsp;&nbsp;说话
      </span>
      <span class="u-editor-icons">
        <span v-if="!isRobot" class="u-editor-icon" @click.stop="showEmoji">
          <i class="u-icon-img"><img :src="icon1"></i>
        </span>
        <span v-if="type==='session' && !isRobot" class="u-editor-icon" @change="sendFileMsg">
          <i class="u-icon-img"><img :src="icon2"></i>
          <input type="file" ref="fileToSent">
        </span>
        <!-- <span v-if="!isRobot" class="u-editor-icon" @click.stop="sendPlayMsg">
          <i class="u-icon-img"><img :src="icon3"></i>
        </span> -->
        <span class="u-editor-send" @click="sendTextMsg">发 送</span>
      </span>
    </div>

    <!-- 手指上划，取消发送 -->
    <div class="layer_warp layer_record"  v-if="click_record">
        <div class="layer_table">
            <div class="layer_table_cell">
                <div class="layer_box">
                    <div class="img">
                        <img src="/static/assets/images/voice/microphone.png" class="microphone"/>
                        <img src="/static/assets/images/voice/speak4.png" class="volume"/>
                    </div>
                    <p>手指上划，取消发送</p>
                </div>
            </div>
        </div>
    </div>
    <!-- 松开手指，取消发送 -->
    <div class="layer_warp layer_record" v-if="loosen_record">
        <div class="layer_table">
            <div class="layer_table_cell">
                <div class="layer_box">
                    <div class="img">
                        <img src="/static/assets/images/voice/abolish.png" class="arrows"/>
                    </div>
                    <p>松开手指，取消发送</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ChatEmoji from './ChatEmoji'
import util from '../../utils'
import config from '../../configs'
import $ from 'jquery'
import { Toast } from  'vux'
export default {
  components: {
    ChatEmoji,
    Toast
  },
  updated () {
    window.document.body.addEventListener('click', () => {
      this.isEmojiShown = false
    })
  },
  props: {
    type: String,
    scene: String,
    to: String,
    isRobot: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  watch: {
    continueRobotAccid (curVal, oldVal) {
      if (curVal && this.robotInfos[curVal]) {
        this.msgToSent = `@${this.robotInfos[curVal].nick} `
      }
      // 重置
      this.$store.dispatch('continueRobotMsg', '')
    },
    msgToSent (curVal, oldVal) {
      if (this.type === 'chatroom' || this.isRobot) {
        return
      }
      let indexAt = this.msgToSent.indexOf('@')
      if (indexAt >= 0 && (indexAt === this.msgToSent.length - 1)) {
        if (this.robotslist && this.robotslist.length > 0) {
          this.isRobotListShown = true
        }
      } else if (this.isRobotListShown === true) {
        this.isRobotListShown = false
      }
    }
  },
  data () {
    return {
      classObject:{
        'video': 'hide',
        'txt': ''
      },
      isEmojiShown: false,
      isRobotListShown: false,
      msgToSent: '',
      icon1: `${config.resourceUrl}/im/chat-editor-1.png`,
      icon2: `${config.resourceUrl}/im/chat-editor-2.png`,
      click_record:false,
      loosen_record:false
      // icon3: `${config.resourceUrl}/im/chat-editor-3.png`,
    }
  },
  computed: {
    continueRobotAccid () {
      return this.$store.state.continueRobotAccid
    },
    robotslist () {
      return this.$store.state.robotslist
    },
    robotInfos () {
      return this.$store.state.robotInfos
    },
    robotInfosByNick () {
      return this.$store.state.robotInfosByNick
    }
  },
  methods: {
    changeChat(obj){
      console.log(obj)
      if(obj.video == 'hide'){
        this.classObject.video = ''
        this.classObject.txt = 'hide'
      }else{
        this.classObject.video = 'hide'
        this.classObject.txt = ''
      }
    },
    sendTextMsg () {
      if (/^\s*$/.test(this.msgToSent)) {
        this.$vux.alert.show({
          title: '请不要刷屏'
        })
        return
      } else if (this.msgToSent.length > 800) {
        this.$vux.alert.show({
          title: '请不要超过800个字'
        })
        return
      }
      this.msgToSent = this.msgToSent.trim()
      if (this.type === 'session') {
        // 如果是机器人
        if (this.isRobot) {
          this.$store.dispatch('sendRobotMsg', {
            type: 'text',
            scene: this.scene,
            to: this.to,
            robotAccid: this.to,
            // 机器人后台消息
            content: this.msgToSent,
            // 显示的文本消息
            body: this.msgToSent
          })
        } else {
          let robotAccid = ''
          let robotText = ''

          let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
          if (atUsers) {
            for (let i = 0; i < atUsers.length; i++) {
              let item = atUsers[i].replace('@', '')
              if (this.robotInfosByNick[item]) {
                robotAccid = this.robotInfosByNick[item].account
                robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                break
              }
            }
          }
          if (robotAccid) {
            if (robotText) {
              this.$store.dispatch('sendRobotMsg', {
                type: 'text',
                scene: this.scene,
                to: this.to,
                robotAccid,
                // 机器人后台消息
                content: robotText,
                // 显示的文本消息
                body: this.msgToSent
              })
            } else {
              this.$store.dispatch('sendRobotMsg', {
                type: 'welcome',
                scene: this.scene,
                to: this.to,
                robotAccid,
                // 显示的文本消息
                body: this.msgToSent
              })
            }
          } else {
            this.$store.dispatch('sendMsg', {
              type: 'text',
              scene: this.scene,
              to: this.to,
              text: this.msgToSent
            })
          }
        }
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'text',
          text: this.msgToSent
        })
      }
      this.msgToSent = ''
    },
    sendPlayMsg () {
      // 发送猜拳消息
      if (this.type === 'session') {
        this.$store.dispatch('sendMsg', {
          type: 'custom',
          scene: this.scene,
          to: this.to,
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random()*3)
            }
          }
        })
      } else if (this.type === 'chatroom') {
        this.$store.dispatch('sendChatroomMsg', {
          type: 'custom',
          pushContent: '[猜拳]',
          content: {
            type: 1,
            data: {
              value: Math.ceil(Math.random()*3)
            }
          }
        })
      }
    },
    sendFileMsg () {
      let ipt = this.$refs.fileToSent
      this.classObject.video = ''
      this.classObject.txt = 'hide'
      if (ipt.value) {
        if (this.type === 'session') {
          this.$store.dispatch('sendFileMsg', {
            scene: this.scene,
            to: this.to,
            fileInput: ipt
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomFileMsg', {
            fileInput: ipt
          })
        }
      }
    },
    showEmoji () {
      this.isEmojiShown = true
      this.classObject.video = 'hide'
      this.classObject.txt = ''
    },
    hideEmoji () {
      this.isEmojiShown = false
    },
    addEmoji (emojiName) {
      this.msgToSent += emojiName
      this.hideEmoji()
    },
    chooseRobot (robot) {
      if (robot && robot.account) {
        let len = this.msgToSent.length
        if (len === 0 || this.msgToSent[len-1] !== '@') {
          this.msgToSent += '@' + robot.nick + ' '
        } {
          this.msgToSent += robot.nick + ' '
        }
      }
    },
    hideRobotList () {
      this.isRobotListShown = false
    },
    touchstartVideo(){
      
    }
  },
  created(){
      this.$weChat()
  },
  mounted:function(){
    let that = this
    let START,END
    let voice = {
        localId:''
    }
    let recordTimer
    //假设全局变量已经在外部定义
    //按下开始录音
    $('.u-editor-video').on('touchstart', function(event){
        console.log(123)
        event.preventDefault();
        START = new Date().getTime();
        that.click_record = true
        recordTimer = setTimeout(function(){
            that.wx.startRecord({
                success: function(){
                    localStorage.rainAllowRecord = 'true';
                },
                cancel: function () {
                    that.$vux.toast.text('用户拒绝授权录音', 'middle', 100);
                }
            });
        },300);
    });
    $('.u-editor-video').on('touchmove', function(event){
        that.click_record = false
        that.loosen_record = true
    })
    //松手结束录音
    $('.u-editor-video').on('touchend', function(event){
        event.preventDefault();
        END = new Date().getTime();
        that.loosen_record = false
        if((END - START) < 300){
            END = 0;
            START = 0;
            //小于300ms，不录音
            that.$vux.toast.text('少于300ms', 'middle', 100);
            clearTimeout(recordTimer);
        }else{
            that.wx.stopRecord({
                success: function (res) {
                    voice.localId = res.localId;
                    that.wx.playVoice({
                        localId: res.localId // 需要播放的音频的本地ID，由stopRecord接口获得
                    });
                    uploadVoice();
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        }
    });

    //上传录音
    function uploadVoice(){
        //调用微信的上传录音接口把本地录音先上传到微信的服务器
        //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
        that.wx.uploadVoice({
            localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                alert(res)
                //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
                // $.ajax({
                //     url: '后端处理上传录音的接口',
                //     type: 'post',
                //     data: JSON.stringify(res),
                //     dataType: "json",
                //     success: function (data) {
                //         alert('文件已经保存到七牛的服务器');//这回，我使用七牛存储
                //     },
                //     error: function (xhr, errorType, error) {
                //         console.log(error);
                //     }
                // });
            }
        });
    }
    //注册微信播放录音结束事件【一定要放在wx.ready函数内】
  }
}
</script>

<style scoped lang="less">
  .robot.m-chat-editor-main {
    .u-editor-input {
      padding-right: 4.5rem;
    }
    .u-editor-icons {
      width: 4rem;
    }
  }
  .m-chat-robot {
    overflow-y: scroll;
    .weui-cells {
      .weui-cell__hd {
        margin-right: 0.5rem;
      }
    }
  }

  .m-chat-change{
    width:1.6rem;
    height:1.6rem;
    &.txt{
    }
    img{
      width: 1.6rem;
      height: 1.6rem;
    }
  }
  
  .g-window .m-chat-editor-main{
    display: flex;
    align-items:center;/*垂直居中*/
    justify-content: center;/*水平居中*/
    .m-chat-change{
      margin:0 0.5rem;
    }
    .u-editor-input{
      width:9.2rem;
      height:3rem;
      padding:0.5rem;
      &.hide{
        display: none
      }
    }
    .u-editor-icons{
      position: relative;
    }
    .u-editor-video{
      width:9.2rem;
      height:2rem;
      padding:0.5rem;
      position: relative;
      display: inline-block;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 1rem;
      text-align: left;
      border: 1px solid #ccc;
      border-radius: 0.4rem;
      background-color:#fff; 
      line-height: 1rem;
      text-align: center;
      &.hide{
        display:none
      }
    }
    .u-editor-icons{
      width:8rem
    }
  }  
</style>
<style lang="scss">
  @import '../../../static/assets/css/px2rem.scss';
  .layer_warp{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      .layer_table{
          width: 100%;
          height: 100%;
          display: table;
          text-align: center;
      }
      .layer_table_cell{
          display: table-cell;
          vertical-align: middle;
      }
      .layer_box{
          width:px2rem(262);
          height: px2rem(192);
          background-color:rgba(0,0,0,0.3);
          display: inline-block;
          border-radius:px2rem(10);
          padding:px2rem(34);
          .img{
              display: flex;
              justify-content: center;/*水平居中*/
              .microphone{
                  width: px2rem(90);
                  height:px2rem(130);
                  margin-right: px2rem(10);
              }
              .volume{
                  width: px2rem(110);
                  height:px2rem(110);
                  margin-top:px2rem(20)
              }
              .arrows{
                  width: px2rem(108);
                  height:px2rem(130);
              }
          }
          p{
              font-size:px2rem(24);
              color:#fff;
              margin-top:px2rem(40)
          }
      }
  }
</style>