<template>
    <!--手机号弹出层  -->
    <div class="layer_warp layer_phone">
        <div class="layer_table">
            <div class="layer_table_cell">
                <div class="layer_box">
                    <div class="layer_title">
                        <p>请输入您的手机号</p>
                    </div>
                    <div class="layer_container">
                        <div class="phone_register register_box">
                            <div class="phone_number">
                                <label></label>
                                <input type="number" name="phone" value="" placeholder="请输入手机号码" v-model="phone"/>
                                <button type="button" @click="sendCode" :disabled="!sendMsgDisabled">
                                    <span v-show="sendMsgDisabled">获取验证码</span>
                                    <span v-show="!sendMsgDisabled" class="count">{{count}} s</span>
                                </button>
                            </div>
                            <div class="phone_code">
                                <label></label>
                                <input type="number" name="code" value="" placeholder="请输入验证码" v-model="code"/>
                            </div>
                        </div>
                    </div>
                    <div class="layer_footer">
                        <div class="layer_footer_cancel">
                            <router-link tag="li" to="/"></router-link>
                            <button @click="cancel">取消</button>
                        </div>
                        <div class="layer_footer_confirm">
                            <button @click="confirm">确定</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    </div>

    
</template>

<script>
import { Toast } from 'vux'
import qs from 'qs'
import $ from 'jquery'
import config from '../../../configs'

const TIME_COUNT = 60
export default{
  data () {
    return {
      phone: '',
      code: '',
      sendMsgDisabled: true,
      count: 0,
      timer: null
    }
  },
  components: {
    Toast
  },
  created () {
  },
  methods: {
    confirm () {
      let that = this
      let reg = /^1[0-9]{10}$/
      if (that.phone === '') {
        this.$vux.toast.text('请输入手机号码', 'middle', 100)
        return false
      } else if (that.code === '') {
        this.$vux.toast.text('请输入验证码', 'middle', 100)
        return false
      } else if (!reg.test(that.phone)) {
        this.$vux.toast.text('请输入正确的手机号码', 'middle', 100)
        return false
      }
      let data = qs.stringify({
        'phone': that.phone,
        'captcha': that.code
      })
      this.http(that.configs.apiTop + '/weixin/binding-role', 'post', data, function (res) {
        let msg = res.data
        // let data = msg.data
        if (msg.code === 0) {
          location.href = config.apiTop + '/weixin/auth-gateway'
            //   if (data.role_type == 'user') {
            //     that.$router.push({path: '/user', query: {is_perfect: '0'}})
            //   } else if (data.role_type == 'service') {
            //     that.$router.push({path: '/service'})
            //   }
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    },
    cancel () {
      let that = this
      that.$parent.layerhide = false
      that.wx.closeWindow()
    },
    sendCode () {
      let that = this
      if (that.phone === '') {
        this.$vux.toast.text('请输入手机号码', 'middle', 100)
        return false
      }
      let data = qs.stringify({
        'phone': that.phone
      })
      this.http(that.configs.apiTop + '/captcha/sms-captcha', 'post', data, function (res) {
        let msg = res.data
        if (msg.code == 0) {
          if (!that.timer) {
            that.count = TIME_COUNT
            that.sendMsgDisabled = false
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= TIME_COUNT) {
                that.count--
              } else {
                that.sendMsgDisabled = true
                clearInterval(that.timer)
                that.timer = null
              }
            }, 1000)
          }
        } else {
          that.$vux.toast.text(msg.message, 'middle', 100)
        }
      })
    }
  },
  mounted: function () {
    $('.phone_register input').bind('focus', function () {
      $('.layer_phone').css('position', 'absolute')
    }).bind('blur', function () {
      $('.layer_phone').css({'position': 'fixed'})
    })
  }
}
</script>

<style lang="scss" scoped>
    @import '../../../../static/assets/css/px2rem.scss';
    .layer_warp{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
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
            width:px2rem(600);
            // height: px2rem(460);
            background-color: #fff;
            display: inline-block;
            border-radius:px2rem(10);
        }
        .layer_title{
            font-size:px2rem(30);
            color:#fff;
            height:px2rem(88);
            line-height:px2rem(88);
            background-color:#366931;
            border-top-left-radius: px2rem(10);
            border-top-right-radius: px2rem(10);
        }
        .layer_container{
            
        }
        .layer_footer{
            height:px2rem(90);
            border-top:1px solid #e0e0e0;
            display:flex;
            line-height:px2rem(90);
        }
        .layer_footer_cancel,.layer_footer_confirm,.layer_footer_cancel button,.layer_footer_confirm button{
            flex:1;
            border-right:1px solid #e0e0e0;
            text-align: center;
            font-size:px2rem(34);
            color:#007aff;
        }
        .layer_footer button{
            width: 100%;
            height: px2rem(90);
        }
        .layer_footer_confirm,.layer_footer_cancel button,.layer_footer_confirm button{
            border-right:0
        }
    }

    .register_box{
        padding:px2rem(40) px2rem(66) px2rem(76);
        input{
            font-size:px2rem(24);
            color:#333;
            width:95%;
            height:px2rem(50);
            line-height:px2rem(50);
            padding:px2rem(10);
            border:1px solid #dddddd;
            border-radius:px2rem(10);
            -webkit-appearance: none;
        }
        button{
            width:px2rem(142);
            height:px2rem(70);
            font-size:px2rem(24);
            color:#fff;
            // line-height:px2rem(70);
            border-radius:px2rem(10);
            margin-left:px2rem(20);
            border:0;
            background-color: #366931;
            &.action{
                background-color: #366931;
            }

        }
        .phone_number{
            display:flex;
            margin-bottom:px2rem(30);
            input{
                flex:0;
                width:px2rem(270);
            }
            button{
            }
        }
    }
</style>