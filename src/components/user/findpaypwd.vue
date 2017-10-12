<template>
    <div class="wrapper">
        <div class="find-wrapper" v-if="phoneCode">
            <h6>{{ data.user_phone }}</h6> 
            <p>为了您的账户安全，请先进行手机号码验证</p>
            <div class="code-box">
                <div class="input-code">
                    <input type="text" v-model="code" class="col-7" placeholder="请输入短信验证码">     
                    <button class="col-3" type="button" @click="getCode" :disabled="!sendMsgDisabled"> 
                        <span v-show="sendMsgDisabled">获取验证码</span> 
                        <span v-show="!sendMsgDisabled" class="count">{{count}} s</span> 
                    </button> 
                </div>
                <div class="next-btn content">
                    <button class="commit-btn" @click="codeNext">下一步</button> 
                </div>
            </div>
        </div>
        <!-- 新的支付密码（找回支付密码） v-else-if="newPayPaw"-->
        <div class="oldPassword newPassword" v-bind:class="{hide:!newPayPaw}">
            <h3>请输入新的支付密码</h3>
            <div class="pw_input ipt-box-nick">
                <input type="tel" maxlength="6" class="ipt-real-nick" v-model="new_password"/>
                <div class="ipts-box-nick">
                    <div class="ipt-fake-box">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                    </div>
                </div>
            </div>
            <div class="btn">
                <!-- 输入完6位密码才会高亮 active v-else="succeedPayPaw"-->
                <button type="button" class="btn_next active" @click="newNext">下一步</button>
            </div>
        </div>
        <div class="oldPassword succeedPassword" v-bind:class="{hide:!succeedPayPaw}">
            <h3>请确认支付密码</h3>
            <div class="pw_input ipt-box-nick">
                <input type="tel" maxlength="6" class="ipt-real-nick" v-model="confirm_password"/>
                <div class="ipts-box-nick">
                    <div class="ipt-fake-box">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                        <input type="password" maxlength="1">
                    </div>
                </div>
            </div>
            <div class="btn">
                <!-- 输入完6位密码才会高亮 active-->
                <button type="button" class="btn_next active" @click="succeed">完成</button>
            </div>
        </div>
    </div>
</template>
<script>
     import  { Toast } from 'vux' 
     import qs from 'qs'
    const TIME_COUNT = 60 
    export default{ 
        components:{ 
            Toast 
        }, 
        data() { 
            return { 
                data: {}, 
                count:0, 
                timer: null, 
                sendMsgDisabled: true, 
                code: '',
                phoneCode:true,
                newPayPaw:false,
                succeedPayPaw:false,
                new_password:'',
                confirm_password:''
            } 
        }, 
        created() { 
            let that = this 
            this.http(that.configs.apiTop+"/user/profile", "get", '', function(res) { 
                let msg = res.data 
                let data = msg.data 
                if (msg.code == 0) { 
                    that.data = msg.data 
                } else if (msg.code == 40004) { 
                    // location.href = that.configs.accreditUrl 
                } 
            }) 
        }, 
        methods: { 
            getCode() { 
                let that = this 
                this.http(that.configs.apiTop + "/captcha/find-pay-password-sms-captcha", "post",  '', function(res) { 
                    let msg = res.data 
                    if (msg.code == 0) { 
                        that.$vux.toast.text(msg.message, 'middle', 100); 
                        if (!that.timer) { 
                            that.count = TIME_COUNT 
                            that.sendMsgDisabled = false 
                            that.timer = setInterval(() => { 
                                if (that.count > 0 && that.count <= TIME_COUNT) { 
                                    that.count--; 
                                } else { 
                                    that.sendMsgDisabled = true 
                                    clearInterval(that.timer) 
                                    that.timer = null 
                                } 
                            }, 1000) 
                        } 
                    } else { 
                        that.$vux.toast.text(msg.message, 'middle', 100); 
                    } 
                }) 
            }, 
            codeNext() { 
                let that = this 
                var reg = /^[0-9]\d{5}$/ 
                if(this.code == ''){ 
                    that.$vux.toast.text('请填写验证码', 'middle', 100); 
                    return 
                } 
                if(!(reg.test(this.code))){ 
                    that.$vux.toast.text('请输入6位验证码', 'middle', 100); 
                    return 
                } 
                that.phoneCode = false
                that.newPayPaw = true
                that.succeedPayPaw = false
            },
            newNext(){
                let that = this
                if(that.new_password == ''){
                    that.$vux.toast.text('请输入新的支付密码','middle',100)
                    return
                }
                that.phoneCode = false
                that.newPayPaw = false
                that.succeedPayPaw = true
            },
            succeed(){
                let that = this
                if(that.confirm_password == ''){
                    that.$vux.toast.text('请确认支付密码','middle',100)
                    return
                }else if(that.new_password != that.confirm_password){
                    that.$vux.toast.text('请确认两次支付密码一致','middle',100)
                    return
                }
                let data = qs.stringify({
                    'captcha':that.code,
                    'new_pay_password':that.new_password,
                    'confirm_new_pay_password':that.confirm_password
                })
                this.http(that.configs.apiTop+"/user-pay-password/find-pay-password", "post", data, function(res) { 
                    let msg = res.data 
                    if (msg.code == 0) { 
                        that.$vux.toast.text(msg.message,'middle',100);
                        setTimeout(function(){ 
                            that.$router.push({path: '/payset'}) 
                        }, 200);
                    } else if (msg.code == 40004) { 
                        // location.href = that.configs.accreditUrl 
                    }else{
                        that.$vux.toast.text(msg.message,'middle',100);
                        setTimeout(function(){ 
                            that.$router.push({path: '/payset'}) 
                        }, 200);
                    }
                }) 
            }
        },
        mounted: function() {
            $(".ipt-real-nick").on("input", function() {
                //console.log($(this).val());
                var $input = $(".ipt-fake-box input");
                if (!$(this).val()) {//无值光标顶置
                    $('.ipt-active-nick').css('left', $input.eq(0).offset().left - parseInt($('.ipt-box-nick').parent().css('padding-left')) + 'px');
                }
                if (/^[0-9]*$/g.test($(this).val())) {//有值只能是数字
                    //console.log($(this).val());
                    var pwd = $(this).val().trim();
                    for (var i = 0, len = pwd.length; i < len; i++) {
                        $input.eq(i).val(pwd[i]);
                        if ($input.eq(i).next().length) {//模拟光标，先将图片容器定位，控制left值而已
                            $('.ipt-active-nick').css('left', $input.eq(i + 1).offset().left - parseInt($('.ipt-box-nick').parent().css('padding-left')) + 'px');
                        }
                    }
                    $input.each(function() {//将有值的当前input后的所有input清空
                        var index = $(this).index();
                        if (index >= len) {
                            $(this).val("");
                        }
                    });
                    if (len == 6) {
                        //执行其他操作
                        console.log('输入完整，执行操作');
                    }
                } else {//清除val中的非数字，返回纯number的value
                    var arr = $(this).val().match(/\d/g);
                    $(this).val($(this).val().slice(0, $(this).val().lastIndexOf(arr[arr.length - 1]) + 1));
                    //console.log($(this).val());
                }
            })
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';
.oldPassword{
    h3{
        font-size:px2rem(30);
        color:#333;
        margin:px2rem(50) px2rem(30) px2rem(30);
    }
    .btn{
        width: 90%;
        margin:0 auto;
        margin-top:px2rem(80);
    }
    .btn_next{
        width: 100%;
        height: px2rem(88);
        line-height: px2rem(88);
        text-align: center;
        font-size:px2rem(30);
        color:#fff;
        border-radius: px2rem(10);
        background-color:#afc3ad;
        &.active{
            background-color:#366931;
        } 
    }
}
.ipt-box-nick {
    width: px2rem(690);
    height: px2rem(100);
    line-height: px2rem(100);
    position: relative;
    margin:0 auto;
    .ipt-real-nick {
        position: absolute;
        top: 0 !important;
        left: 0 !important;
        width: 100%;
        height: px2rem(100);
        line-height: px2rem(100);
        opacity: 0;
        z-index: 3;
        color:transparent;
        text-shadow: 0px 0px 0px #333;
        width: 200%;
        margin-left: -100%;
    }
    .ipts-box-nick {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: px2rem(100);
        line-height: px2rem(100);
        overflow: hidden;
        border: 1px solid #d6d9e0;
        border-radius:px2rem(6);
        
        .ipt-fake-box {
            height: px2rem(100);
            line-height: px2rem(100);
            display: flex;
            justify-content: space-between;
            &:focus{color:#F00}
        }
        .ipt-fake-box {
            input {
                width: px2rem(114);
                height: px2rem(98);
                border:0;
                border-right: 1px solid #d6d9e0;
                color: #000;
                font-weight: bold;
                font-size: 18px;
                text-align: center;
                padding: 0;
                border-radius: 2px;
            }
        }
        .ipt-active-nick {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
        .ipt-active-nick {
            img {
                vertical-align: middle;
            }
        }
    }
}
</style>

