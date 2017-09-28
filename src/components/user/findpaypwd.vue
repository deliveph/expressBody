<template>
    <div class="wrapper">
        <div class="find-wrapper">
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
    </div>
</template>
<script>
    import  { Toast } from 'vux'
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
                code: ''
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
                console.log('进入下一步');

            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
